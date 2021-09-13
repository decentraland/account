import { select } from '@redux-saga/core/effects'
import { getNetworkProvider } from 'decentraland-dapps/dist/lib/eth'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {
  importWithdrawalFailure,
  importWithdrawalRequest,
  importWithdrawalSuccess,
} from './actions'
import { handleImportWithdrawalRequest, importWithdrawalErrors } from './sagas'
import { getMaticPOSClient } from './utils'

jest.mock('decentraland-dapps/dist/lib/eth', () => ({
  //@ts-ignore
  ...jest.requireActual('decentraland-dapps/dist/lib/eth'),
  getChainIdByNetwork: jest.fn().mockReturnValue(80001),
}))

jest.mock('./utils', () => ({
  //@ts-ignore
  ...jest.requireActual('./utils'),
  getMaticPOSClient: jest.fn().mockResolvedValue({
    isERC20ExitProcessed: jest.fn().mockResolvedValue(false),
  }),
}))

const mockGetMaticPOSClient = getMaticPOSClient as jest.Mock

describe('manaSaga', () => {
  describe('handleImportWithdrawalRequest', () => {
    it('should dispatch importWithdrawalSuccess with valid data', () => {
      const address = '0x2f89ec84e0413950d9adf8e56dd56c2b2f5066cb'
      const txHash =
        '0x92e1c25d48ba808a572592be445e00f150a16a5135ee3d5734b72543a1d5c184'
      const from = '0x327d372f9b1d7ada2565c777b51f6f73b7b9279a'
      const input =
        '0x07bd3522000000000000000000000000882da5967c435ea5cc6b09150d55e8304b838f45000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001040c53c51c0000000000000000000000002f89ec84e0413950d9adf8e56dd56c2b2f5066cb00000000000000000000000000000000000000000000000000000000000000a07f1dafcaacf935625752ec1b57005b27145127d3d5c1501aac2fa58565a58f4a6c906e46c45fda0c08fe3bcb2d689b37768a2e8846dd8a82f9d4848f03cc7ccd000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000242e1a7d4d0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

      return expectSaga(
        handleImportWithdrawalRequest,
        importWithdrawalRequest(txHash)
      )
        .provide([
          [select(getAddress), address],
          [
            matchers.call.fn(getNetworkProvider),
            Promise.resolve({
              send: jest.fn().mockResolvedValue({ input, from }),
            }),
          ],
        ])
        .put(importWithdrawalSuccess())
        .silentRun()
    })

    it('should dispatch importWithdrawalFailure when tx is not found', () => {
      const address = '0x2f89ec84e0413950d9adf8e56dd56c2b2f5066cb'
      const txHash =
        '0x92e1c25d48ba808a572592be445e00f150a16a5135ee3d5734b72543a1d5c184'

      return expectSaga(
        handleImportWithdrawalRequest,
        importWithdrawalRequest(txHash)
      )
        .provide([
          [select(getAddress), address],
          [
            matchers.call.fn(getNetworkProvider),
            Promise.resolve({
              send: jest.fn().mockResolvedValue(undefined),
            }),
          ],
        ])
        .put(importWithdrawalFailure(importWithdrawalErrors.notFound))
        .silentRun()
    })

    it('should dispatch importWithdrawalFailure when tx belongs to another wallet', () => {
      const address = 'other wallet'
      const txHash =
        '0x92e1c25d48ba808a572592be445e00f150a16a5135ee3d5734b72543a1d5c184'
      const from = '0x327d372f9b1d7ada2565c777b51f6f73b7b9279a'
      const input =
        '0x07bd3522000000000000000000000000882da5967c435ea5cc6b09150d55e8304b838f45000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001040c53c51c0000000000000000000000002f89ec84e0413950d9adf8e56dd56c2b2f5066cb00000000000000000000000000000000000000000000000000000000000000a07f1dafcaacf935625752ec1b57005b27145127d3d5c1501aac2fa58565a58f4a6c906e46c45fda0c08fe3bcb2d689b37768a2e8846dd8a82f9d4848f03cc7ccd000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000242e1a7d4d0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

      return expectSaga(
        handleImportWithdrawalRequest,
        importWithdrawalRequest(txHash)
      )
        .provide([
          [select(getAddress), address],
          [
            matchers.call.fn(getNetworkProvider),
            Promise.resolve({
              send: jest.fn().mockResolvedValue({ input, from }),
            }),
          ],
        ])
        .put(importWithdrawalFailure(importWithdrawalErrors.notOwnTransaction))
        .silentRun()
    })

    it('should dispatch importWithdrawalFailure when tx is not a withdrawal', () => {
      const address = '0x2f89ec84e0413950d9adf8e56dd56c2b2f5066cb'
      const txHash =
        '0x9bfefc66ed1568a62082aedea070e5812a189d5db593935c307697ed748515f7'
      const from = '0xe84cb8e785f0e6b37663f00ac0d76f14753b622f'
      const input =
        '0x07bd3522000000000000000000000000882da5967c435ea5cc6b09150d55e8304b838f45000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001240c53c51c0000000000000000000000002f89ec84e0413950d9adf8e56dd56c2b2f5066cb00000000000000000000000000000000000000000000000000000000000000a0209b17f3412e6f38c3eec2ca188d67f440ce21058b00b5fbf05ac9b5bd7cfe435e267d80979247ad077bb80a9fb00d2f206caf8c02192d5cc69791195cc13c3f000000000000000000000000000000000000000000000000000000000000001b0000000000000000000000000000000000000000000000000000000000000044a9059cbb0000000000000000000000002f89ec84e0413950d9adf8e56dd56c2b2f5066cb0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

      return expectSaga(
        handleImportWithdrawalRequest,
        importWithdrawalRequest(txHash)
      )
        .provide([
          [select(getAddress), address],
          [
            matchers.call.fn(getNetworkProvider),
            Promise.resolve({
              send: jest.fn().mockResolvedValue({ input, from }),
            }),
          ],
        ])
        .put(importWithdrawalFailure(importWithdrawalErrors.notWithdrawal))
        .silentRun()
    })

    it('should dispatch importWithdrawalFailure when tx is not a withdrawal', () => {

      mockGetMaticPOSClient.mockResolvedValue({
        isERC20ExitProcessed: jest.fn().mockResolvedValue(true),
      })

      const address = '0x2f89ec84e0413950d9adf8e56dd56c2b2f5066cb'
      const txHash =
        '0x92e1c25d48ba808a572592be445e00f150a16a5135ee3d5734b72543a1d5c184'
      const from = '0x327d372f9b1d7ada2565c777b51f6f73b7b9279a'
      const input =
        '0x07bd3522000000000000000000000000882da5967c435ea5cc6b09150d55e8304b838f45000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001040c53c51c0000000000000000000000002f89ec84e0413950d9adf8e56dd56c2b2f5066cb00000000000000000000000000000000000000000000000000000000000000a07f1dafcaacf935625752ec1b57005b27145127d3d5c1501aac2fa58565a58f4a6c906e46c45fda0c08fe3bcb2d689b37768a2e8846dd8a82f9d4848f03cc7ccd000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000242e1a7d4d0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

      return expectSaga(
        handleImportWithdrawalRequest,
        importWithdrawalRequest(txHash)
      )
        .provide([
          [select(getAddress), address],
          [
            matchers.call.fn(getNetworkProvider),
            Promise.resolve({
              send: jest.fn().mockResolvedValue({ input, from }),
            }),
          ],
        ])
        .put(importWithdrawalFailure(importWithdrawalErrors.alreadyProcessed))
        .silentRun()
    })
  })
})
