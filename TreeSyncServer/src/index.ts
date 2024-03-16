import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { request, gql } from 'graphql-request';
import { poseidon } from 'circomlibjs';
import { MerkleTree } from 'fixed-merkle-tree';

import axios from 'axios';

import { HOST, PORT, isDevEnv, signerWallet } from './config';

import { error } from 'console';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Mixerswap merkle tree!' });
});

async function SyncTree(tree: MerkleTree) {
  try {
    let skip = 0;
    let first = 500;

    while (true) {
      const leafQuery = gql`
        query MyQuery {
            deposits(first: ${first}, orderBy: leafIndex, skip: ${skip}) {
              leafIndex
              commitment
              blockNumber
          }
      }
    `;

      const resObject = await request('http://localhost:8000/subgraphs/name/blender', leafQuery);

      if ((resObject.deposits.length < first && resObject.deposits.length > 0) || resObject.deposits.length === 0) {
        console.log('done');
        if (resObject.deposits.length < first && resObject.deposits.length > 0) {
          const leafArray = resObject.deposits.map((deposit: any) => deposit.commitment);

          for (let i = 0; i < leafArray.length; i++) {
            tree.insert(leafArray[i]);
          }
        }

        break;
      } else {
        console.log('syncing continue...');
        const leafArray = resObject.deposits.map((deposit: any) => deposit.commitment);

        for (let i = 0; i < leafArray.length; i++) {
          tree.insert(leafArray[i]);
        }

        skip += first;
      }
    }

    return {
      error: false,
    };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

app.get('/tree-info', async (req, res, next) => {
  try {
    const { commitment } = req.query;

    if (!commitment) {
      return res.status(400).json({ error: true, message: 'commitment is required' });
    }

    const tree = new MerkleTree(10, [], {
      hashFunction: (left, right) => String(poseidon([left, right])),
      zeroElement: '3042774122929058629117742057409317273972932196304097622662323601237587181833',
    });

    // sync tree
    const syncRes = await SyncTree(tree);

    if (syncRes.error) {
      return res.status(500).json({ error: true, message: 'Error syncing tree' });
    }

    let treeInfo: any = {};

    // find index of leaf
    const index = tree.indexOf(String(commitment));
    if (index === -1) {
      treeInfo.index = -1;
      return res.status(500).json({ error: true, treeInfo, message: 'Leaf not found' });
    } else {
      treeInfo.index = index;

      const proof = tree.proof(String(commitment));

      treeInfo.root = proof.pathRoot;
      treeInfo.pathElements = proof.pathElements;
      treeInfo.pathIndices = proof.pathIndices;

      return res.status(200).json({
        error: false,
        treeInfo,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: true, message: 'Error' });
  }
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (typeof error === 'string') {
    return res.status(400).json({ error: true, message: error });
  }
  console.error(error);
  return res.status(500).json({ error: true, message: 'Error' });
});

app.listen(PORT, () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
