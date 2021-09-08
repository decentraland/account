import { Transaction, Withdrawal } from '../../../../modules/mana/types'

export type Props = {
  withdrawals: Withdrawal[]
  data: Transaction['data']
}

export type MapStateProps = Pick<Props, 'withdrawals'>
