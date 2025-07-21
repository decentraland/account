import { TransactionState } from 'decentraland-dapps/dist/modules/transaction/reducer'
import { Transaction, TransactionStatus } from 'decentraland-dapps/dist/modules/transaction/types'
import { WalletState } from 'decentraland-dapps/dist/modules/wallet'
import { RootState } from '../reducer'
import { FINISH_WITHDRAWAL_SUCCESS } from './actions'
import { ManaState } from './reducer'
import { getWithdrawalByHash, isFinalizingWithdrawalTransaction } from './selectors'
import { Withdrawal, WithdrawalStatus } from './types'

// Helper function to create a complete transaction object
const createMockTransaction = (overrides: Partial<Transaction>): Transaction => ({
  hash: '0xtxhash1',
  actionType: FINISH_WITHDRAWAL_SUCCESS,
  status: TransactionStatus.PENDING,
  from: '0xwallet1',
  payload: { withdrawal: {} },
  timestamp: Date.now(),
  chainId: 1,
  events: [],
  nonce: 0,
  replacedBy: null,
  url: '',
  isCrossChain: false,
  ...overrides
})

let mockState: RootState

beforeEach(() => {
  mockState = {
    mana: {
      data: {
        withdrawals: [],
        deposits: [],
        purchases: [],
        price: 0,
        allowance: '0'
      },
      loading: [],
      error: null
    } as ManaState,
    transaction: {
      data: [],
      loading: [],
      error: null
    } as TransactionState,
    wallet: {
      data: {
        address: '0xwallet1'
      }
    } as WalletState
  } as RootState
})

describe('when getting withdrawal by hash', () => {
  let withdrawals: Withdrawal[]
  let targetHash: string

  beforeEach(() => {
    targetHash = '0x123abc'
    withdrawals = [
      {
        initializeHash: targetHash,
        finalizeHash: null,
        status: WithdrawalStatus.PENDING,
        from: '0xwallet1',
        amount: 1000,
        timestamp: Date.now()
      },
      {
        initializeHash: '0x456def',
        finalizeHash: null,
        status: WithdrawalStatus.CHECKPOINT,
        from: '0xwallet2',
        amount: 2000,
        timestamp: Date.now()
      }
    ]
  })

  describe('and the withdrawal exists in the state', () => {
    beforeEach(() => {
      mockState.mana.data.withdrawals = withdrawals
    })

    it('should return the withdrawal with matching hash', () => {
      expect(getWithdrawalByHash(mockState, targetHash)).toEqual(withdrawals[0])
    })
  })

  describe('and the withdrawal does not exist in the state', () => {
    beforeEach(() => {
      mockState.mana.data.withdrawals = withdrawals
    })

    it('should return undefined', () => {
      expect(getWithdrawalByHash(mockState, '0xnonexistent')).toBeUndefined()
    })
  })

  describe('and there are no withdrawals in the state', () => {
    beforeEach(() => {
      mockState.mana.data.withdrawals = []
    })

    it('should return undefined', () => {
      expect(getWithdrawalByHash(mockState, targetHash)).toBeUndefined()
    })
  })
})

describe('when checking if withdrawal transaction is finalizing', () => {
  let targetHash: string
  let mockWithdrawal: Withdrawal

  beforeEach(() => {
    targetHash = '0x123abc'
    mockWithdrawal = {
      initializeHash: targetHash,
      finalizeHash: null,
      status: WithdrawalStatus.CHECKPOINT,
      from: '0xwallet1',
      amount: 1000,
      timestamp: Date.now()
    }
  })

  describe('and there is a pending finish withdrawal transaction with matching hash', () => {
    beforeEach(() => {
      mockState.transaction.data = [
        createMockTransaction({
          payload: {
            withdrawal: mockWithdrawal
          }
        })
      ]
    })

    it('should return true', () => {
      expect(isFinalizingWithdrawalTransaction(mockState, targetHash)).toBe(true)
    })
  })

  describe('and there is a finish withdrawal transaction with matching hash but it is not pending', () => {
    beforeEach(() => {
      mockState.transaction.data = [
        createMockTransaction({
          status: TransactionStatus.CONFIRMED,
          payload: {
            withdrawal: mockWithdrawal
          }
        })
      ]
    })

    it('should return false', () => {
      expect(isFinalizingWithdrawalTransaction(mockState, targetHash)).toBe(false)
    })
  })

  describe('and there is a pending finish withdrawal transaction but the withdrawal hash does not match', () => {
    let differentWithdrawal: Withdrawal

    beforeEach(() => {
      differentWithdrawal = {
        initializeHash: '0xdifferentHash',
        finalizeHash: null,
        status: WithdrawalStatus.CHECKPOINT,
        from: '0xwallet2',
        amount: 2000,
        timestamp: Date.now()
      }

      mockState.transaction.data = [
        createMockTransaction({
          payload: {
            withdrawal: differentWithdrawal
          }
        })
      ]
    })

    it('should return false', () => {
      expect(isFinalizingWithdrawalTransaction(mockState, targetHash)).toBe(false)
    })
  })

  describe('and there are no transactions in the state', () => {
    beforeEach(() => {
      mockState.transaction.data = []
    })

    it('should return false', () => {
      expect(isFinalizingWithdrawalTransaction(mockState, targetHash)).toBe(false)
    })
  })
})
