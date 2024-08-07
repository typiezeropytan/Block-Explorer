import { Alchemy, Network, Utils } from 'alchemy-sdk'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings)

export const getBlockNumber = async () => {
  return await alchemy.core.getBlockNumber()
}

export const getBlock = async (block, withTransactions = false) => {
  if (withTransactions) return await alchemy.core.getBlockWithTransactions(block)
  else return await alchemy.core.getBlock(block)
}

export const getTransaction = async (hash) => {
  return await alchemy.core.getTransaction(hash)
}

export const getBalance = async (hash) => {
  return await alchemy.core.getBalance(hash)
}

export const convertToEth = (value) => {
  return Utils.formatUnits(value, 'ether')
}