import { WithdrawalStatus } from '../mana/types'
import v2 from './v2'

describe('migrations - v2', () => {
  it('should migrate from previous version', () => {
    const makeOldWithdrawal = () => ({
      amount: 1,
      hash: 'hash',
      from: 'from',
      status: WithdrawalStatus.PENDING,
      timestamp: 1,
    })

    const oldState: any = {
      mana: {
        data: {
          withdrawals: [makeOldWithdrawal()],
        },
      },
      transaction: {
        data: [
          { payload: undefined },
          { payload: { foo: 'bar' } },
          { payload: { withdrawal: makeOldWithdrawal() } },
        ],
      },
    }

    const state = v2(oldState)

    const withdrawal = state.mana.data.withdrawals[0]

    expect(withdrawal.finalizeHash).toBeNull()
    expect(withdrawal.initializeHash).toBe('hash')

    const transactionPayload0 = state.transaction.data[0].payload
    const transactionPayload1 = state.transaction.data[1].payload
    const transactionPayload2 = state.transaction.data[2].payload

    expect(transactionPayload0).toBeUndefined()
    expect(transactionPayload1.foo).toBe('bar')

    expect(transactionPayload2.withdrawal.finalizeHash).toBeNull()
    expect(transactionPayload2.withdrawal.initializeHash).toBe('hash')
  })
})
