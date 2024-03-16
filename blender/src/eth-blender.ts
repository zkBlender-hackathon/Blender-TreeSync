import {
  Deposit as DepositEvent,
  Swap as SwapEvent,
  Withdrawal as WithdrawalEvent
} from "../generated/ETHBlender/ETHBlender"
import { Deposit, Swap, Withdrawal } from "../generated/schema"

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.commitment = event.params.commitment
  entity.pkx = event.params.pkx
  entity.pky = event.params.pky
  entity.amount = event.params.amount
  entity.leafIndex = event.params.leafIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSwap(event: SwapEvent): void {
  let entity = new Swap(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.nullifierHash = event.params.nullifierHash
  entity.lead = event.params.lead
  entity.amount = event.params.amount
  entity.relayer = event.params.relayer
  entity.tokenOut = event.params.tokenOut
  entity.amountOutMin = event.params.amountOutMin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.nullifierHash = event.params.nullifierHash
  entity.lead = event.params.lead
  entity.amount = event.params.amount
  entity.relayer = event.params.relayer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
