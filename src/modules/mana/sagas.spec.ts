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

const data = {
  address: '0x2f89ed84e0413960d9adf8d57dd56c2c2f5076cc',
  supplementaryAddress: '0x2f89ed84e0413960d9adf8d57dd56c2c2f5076cd',
  txHash: '0x9bfefc67ed1568a62082addea070e5812a199d5db593935c307697ed748515f8',
  metaWithdrawalInput:
    '0x07bd3522000000000000000000000000882da5967c435ea5cc6b09150d55e8304b838f45' +
    '00000000000000000000000000000000000000000000000000000000000000400000000000' +
    '0000000000000000000000000000000000000000000000000001040c53c51c000000000000' +
    '0000000000002f89ed84e0413960d9adf8d57dd56c2c2f5076cc0000000000000000000000' +
    '0000000000000000000000000000000000000000a07f1dafcaacf935625752ec1b57005b27' +
    '145127d3d5c1501aac2fa58565a58f4a6c906e46c45fda0c08fe3bcb2d689b37768a2e8846' +
    'dd8a82f9d4848f03cc7ccd0000000000000000000000000000000000000000000000000000' +
    '00000000001c00000000000000000000000000000000000000000000000000000000000000' +
    '242e1a7d4d0000000000000000000000000000000000000000000000000de0b6b3a7640000' +
    '00000000000000000000000000000000000000000000000000000000000000000000000000' +
    '00000000000000000000000000000000000000',
  polygonWithdrawalInput:
    '0x2e1a7d4d0000000000000000000000000000000000000000000000000de0b6b3a7640000',
  sendInput:
    '0x07bd3522000000000000000000000000882da5967c435ea5cc6b09150d55e8304b838f45' +
    '00000000000000000000000000000000000000000000000000000000000000400000000000' +
    '0000000000000000000000000000000000000000000000000001240c53c51c000000000000' +
    '0000000000002f89ed84e0413960d9adf8d57dd56c2c2f5076cc0000000000000000000000' +
    '0000000000000000000000000000000000000000a0209b17f3412e6f38c3eec2ca188d67f4' +
    '40ce21058b00b5fbf05ac9b5bd7cfe435e267d80979247ad077bb80a9fb00d2f206caf8c02' +
    '192d5cc69791195cc13c3f0000000000000000000000000000000000000000000000000000' +
    '00000000001b00000000000000000000000000000000000000000000000000000000000000' +
    '44a9059cbb0000000000000000000000002f89ed84e0413960d9adf8d57dd56c2c2f5076cc' +
    '0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000' +
    '00000000000000000000000000000000000000000000000000000000000000000000000000' +
    '0000000000000000000000000000',
}

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

describe('handleImportWithdrawalRequest', () => {
  const handleImportWithdrawalRequestTest = ({
    txHash,
    address,
    expectedAction,
    sendResponse,
  }: {
    txHash: string
    address: string
    expectedAction: any
    sendResponse?: { input: string; from: string }
  }) =>
    expectSaga(handleImportWithdrawalRequest, importWithdrawalRequest(txHash))
      .provide([
        [select(getAddress), address],
        [
          matchers.call.fn(getNetworkProvider),
          Promise.resolve({
            send: jest.fn().mockResolvedValue(sendResponse),
          }),
        ],
      ])
      .put(expectedAction)
      .silentRun()

  it('should dispatch importWithdrawalSuccess with valid data (Meta Tx)', () => {
    const {
      address: address,
      supplementaryAddress: from,
      txHash,
      metaWithdrawalInput: input,
    } = data

    return handleImportWithdrawalRequestTest({
      address,
      txHash,
      sendResponse: { input, from },
      expectedAction: importWithdrawalSuccess(),
    })
  })

  it('should dispatch importWithdrawalSuccess with valid data (Polygon Tx)', () => {
    const { address: address, txHash, polygonWithdrawalInput: input } = data

    return handleImportWithdrawalRequestTest({
      address,
      txHash,
      sendResponse: { input, from: address },
      expectedAction: importWithdrawalSuccess(),
    })
  })

  it('should dispatch importWithdrawalFailure when tx is not found', () => {
    const { address: address, txHash } = data

    return handleImportWithdrawalRequestTest({
      address,
      txHash,
      expectedAction: importWithdrawalFailure(importWithdrawalErrors.notFound),
    })
  })

  it('should dispatch importWithdrawalFailure when tx belongs to another wallet (Meta Tx)', () => {
    const {
      supplementaryAddress: from,
      txHash,
      metaWithdrawalInput: input,
    } = data

    const address = 'Another Address'

    return handleImportWithdrawalRequestTest({
      address,
      txHash,
      sendResponse: { input, from },
      expectedAction: importWithdrawalFailure(
        importWithdrawalErrors.notOwnTransaction
      ),
    })
  })

  it('should dispatch importWithdrawalFailure when tx belongs to another wallet (Polygon Tx)', () => {
    const {
      supplementaryAddress: from,
      txHash,
      polygonWithdrawalInput: input,
    } = data

    const address = 'Another Address'

    return handleImportWithdrawalRequestTest({
      address,
      txHash,
      sendResponse: { input, from },
      expectedAction: importWithdrawalFailure(
        importWithdrawalErrors.notOwnTransaction
      ),
    })
  })

  it('should dispatch importWithdrawalFailure when tx is not a withdrawal', () => {
    const {
      address: address,
      supplementaryAddress: from,
      txHash,
      sendInput: input,
    } = data

    return handleImportWithdrawalRequestTest({
      address,
      txHash,
      sendResponse: { input, from },
      expectedAction: importWithdrawalFailure(
        importWithdrawalErrors.notWithdrawal
      ),
    })
  })

  it('should dispatch importWithdrawalFailure when tx was already processed', () => {
    mockGetMaticPOSClient.mockResolvedValue({
      isERC20ExitProcessed: jest.fn().mockResolvedValue(true),
    })

    const {
      address: address,
      supplementaryAddress: from,
      txHash,
      metaWithdrawalInput: input,
    } = data

    return handleImportWithdrawalRequestTest({
      address,
      txHash,
      sendResponse: { input, from },
      expectedAction: importWithdrawalFailure(
        importWithdrawalErrors.alreadyProcessed
      ),
    })
  })
})
