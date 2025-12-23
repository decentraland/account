import { act, renderHook, waitFor } from '@testing-library/react'
import { getEstimatedExitTransactionCost } from '../modules/mana/utils'
import { useWithdrawalCost } from './costs'

// Mock the utility function
jest.mock('../modules/mana/utils')

const mockGetEstimatedExitTransactionCost = getEstimatedExitTransactionCost as jest.MockedFunction<typeof getEstimatedExitTransactionCost>

describe('when using the withdrawal cost hook', () => {
  let consoleErrorSpy: jest.SpyInstance

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.resetAllMocks()
    consoleErrorSpy.mockRestore()
  })

  describe('and initiating the hook', () => {
    it('should return null cost and true loading state', () => {
      let resolveEstimatedExitTransactionCost: ((value: string) => void) | undefined
      const promiseOfEstimatedExitTransactionCost = new Promise<string>(resolve => {
        resolveEstimatedExitTransactionCost = resolve
      })
      mockGetEstimatedExitTransactionCost.mockReturnValue(promiseOfEstimatedExitTransactionCost)

      const { result } = renderHook(() => useWithdrawalCost())

      // The hook immediately starts loading when it mounts
      expect(result.current).toEqual([null, true])
      resolveEstimatedExitTransactionCost?.('0.2')
    })
  })

  describe('and the estimated exit transaction cost is resolved', () => {
    let resolveEstimatedExitTransactionCost: ((value: string) => void) | undefined
    beforeEach(() => {
      const promiseOfEstimatedExitTransactionCost = new Promise<string>(resolve => {
        resolveEstimatedExitTransactionCost = resolve
      })
      mockGetEstimatedExitTransactionCost.mockReturnValue(promiseOfEstimatedExitTransactionCost)
    })

    it('should return the cost and set loading to false', async () => {
      const { result } = renderHook(() => useWithdrawalCost())

      // Complete the promise
      await act(async () => {
        resolveEstimatedExitTransactionCost?.('0.00521340')
      })

      // Should complete with result
      await waitFor(() => {
        expect(result.current).toEqual(['0.00521340', false])
      })
    })
  })

  describe('and the estimated exit transaction cost is rejected', () => {
    beforeEach(() => {
      mockGetEstimatedExitTransactionCost.mockRejectedValue(new Error('Network error'))
    })

    it('should return null cost and set loading to false', async () => {
      const { result } = renderHook(() => useWithdrawalCost())
      await waitFor(() => {
        expect(result.current).toEqual([null, false])
      })
    })
  })
})
