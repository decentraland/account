import { NetworkType, Transaction } from '../HomePage.types'

export type Props = {
  type: NetworkType
  title: string
  onFetchAmount: () => number
  onFetchTransactions: () => Transaction[]
}
