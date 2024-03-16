import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { Deposit, Swap, Withdrawal } from "../generated/ETHBlender/ETHBlender"

export function createDepositEvent(
  commitment: BigInt,
  pkx: BigInt,
  pky: BigInt,
  amount: BigInt,
  leafIndex: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam(
      "commitment",
      ethereum.Value.fromUnsignedBigInt(commitment)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("pkx", ethereum.Value.fromUnsignedBigInt(pkx))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("pky", ethereum.Value.fromUnsignedBigInt(pky))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "leafIndex",
      ethereum.Value.fromUnsignedBigInt(leafIndex)
    )
  )

  return depositEvent
}

export function createSwapEvent(
  to: Address,
  nullifierHash: BigInt,
  lead: BigInt,
  amount: BigInt,
  relayer: Address,
  tokenOut: Address,
  amountOutMin: BigInt
): Swap {
  let swapEvent = changetype<Swap>(newMockEvent())

  swapEvent.parameters = new Array()

  swapEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "nullifierHash",
      ethereum.Value.fromUnsignedBigInt(nullifierHash)
    )
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("lead", ethereum.Value.fromUnsignedBigInt(lead))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("relayer", ethereum.Value.fromAddress(relayer))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("tokenOut", ethereum.Value.fromAddress(tokenOut))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "amountOutMin",
      ethereum.Value.fromUnsignedBigInt(amountOutMin)
    )
  )

  return swapEvent
}

export function createWithdrawalEvent(
  to: Address,
  nullifierHash: BigInt,
  lead: BigInt,
  amount: BigInt,
  relayer: Address
): Withdrawal {
  let withdrawalEvent = changetype<Withdrawal>(newMockEvent())

  withdrawalEvent.parameters = new Array()

  withdrawalEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam(
      "nullifierHash",
      ethereum.Value.fromUnsignedBigInt(nullifierHash)
    )
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam("lead", ethereum.Value.fromUnsignedBigInt(lead))
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam("relayer", ethereum.Value.fromAddress(relayer))
  )

  return withdrawalEvent
}
