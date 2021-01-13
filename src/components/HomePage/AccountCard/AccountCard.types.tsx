import { NetworkType, Transaction } from '../HomePage.types'

export type Props = {
  type: NetworkType
  title: string
  amount: number
  transactions: Transaction[]
}
