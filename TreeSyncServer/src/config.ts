import dotenv from 'dotenv';
import { Wallet } from 'ethers';

dotenv.config();

export const HOST = process.env.HOST!;

export const PORT = process.env.PORT!;

export const signerWallet = new Wallet(process.env.SIGNER_PRIVATE_KEY!);

export const isDevEnv = process.env.NODE_ENV === 'development';
