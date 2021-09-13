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
import mocks from './sagas.mocks.json'

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
      } = mocks

      return handleImportWithdrawalRequestTest({
        address,
        txHash,
        sendResponse: { input, from },
        expectedAction: importWithdrawalSuccess(),
      })
    })

    it('should dispatch importWithdrawalSuccess with valid data (Polygon Tx)', () => {
      const {
        address: address,
        txHash,
        polygonWithdrawalInput: input,
      } = mocks

      return handleImportWithdrawalRequestTest({
        address,
        txHash,
        sendResponse: { input, from: address },
        expectedAction: importWithdrawalSuccess(),
      })
    })

    it('should dispatch importWithdrawalFailure when tx is not found', () => {
      const { address: address, txHash } = mocks

      return handleImportWithdrawalRequestTest({
        address,
        txHash,
        expectedAction: importWithdrawalFailure(
          importWithdrawalErrors.notFound
        ),
      })
    })

    it('should dispatch importWithdrawalFailure when tx belongs to another wallet (Meta Tx)', () => {
      const {
        supplementaryAddress: from,
        txHash,
        metaWithdrawalInput: input,
      } = mocks

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
      } = mocks

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
      } = mocks

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
      } = mocks

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
})
