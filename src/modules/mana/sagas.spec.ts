import { ChainId, Network } from '@dcl/schemas'
import { call, select } from '@redux-saga/core/effects'
import { getChainIdByNetwork, getNetworkProvider } from 'decentraland-dapps/dist/lib/eth'
import { fetchTransactionRequest } from 'decentraland-dapps/dist/modules/transaction/actions'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { expectSaga } from 'redux-saga-test-plan'
import {
  importWithdrawalFailure,
  importWithdrawalRequest,
  importWithdrawalSuccess,
  initiateWithdrawalSuccess,
  watchWithdrawalStatusSuccess
} from './actions'
import { handleImportWithdrawalRequest, importWithdrawalErrors } from './sagas'
import { WithdrawalStatus } from './types'
import { getMaticPOSClient } from './utils'

const data = {
  network: Network.MATIC,
  chainId: ChainId.MATIC_MUMBAI,
  timestamp: Date.now(),
  amount: 1,
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
  polygonWithdrawalInput: '0x2e1a7d4d0000000000000000000000000000000000000000000000000de0b6b3a7640000',
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
    '0000000000000000000000000000'
}

describe('handleImportWithdrawalRequest', () => {
  let dateSpy: jest.SpyInstance<number, []>

  beforeEach(() => {
    dateSpy = jest.spyOn(Date, 'now')
    dateSpy.mockImplementation(() => data.timestamp)
  })

  afterEach(() => {
    dateSpy.mockRestore()
  })

  const handleTest = ({
    txHash,
    expectedActions,
    address,
    sendResponse,
    isERC20ExitProcessed,
    shouldRejectGetNetworkProvider,
    shouldRejectProviderSend
  }: {
    txHash: string
    expectedActions: any[]
    address?: string
    sendResponse?: { input: string; from: string }
    isERC20ExitProcessed?: boolean
    shouldRejectGetNetworkProvider?: boolean
    shouldRejectProviderSend?: boolean
  }) => {
    const { chainId, network } = data

    const maticPOSClient = {
      erc20: () => ({
        isWithdrawExited: () => Promise.resolve(isERC20ExitProcessed)
      })
    }

    const networkProvider = shouldRejectGetNetworkProvider
      ? Promise.reject(new Error('getNetworkProvider rejected'))
      : Promise.resolve({
          send: shouldRejectProviderSend
            ? jest.fn().mockRejectedValue(new Error('provider.send rejected'))
            : jest.fn().mockResolvedValue(sendResponse)
        })

    let test = expectSaga(handleImportWithdrawalRequest, importWithdrawalRequest(txHash)).provide([
      [select(getAddress), address],
      [call(getChainIdByNetwork, network), chainId],
      [call(getMaticPOSClient), maticPOSClient],
      [call(getNetworkProvider, chainId), networkProvider]
    ])

    expectedActions.forEach(ea => (test = test.put(ea)))

    return test.run()
  }

  describe('given valid data', () => {
    const getExpectedActions = () => {
      const { address, txHash, timestamp, chainId, amount } = data

      return [
        importWithdrawalSuccess(),
        fetchTransactionRequest(address, txHash, initiateWithdrawalSuccess(amount, chainId, txHash)),
        watchWithdrawalStatusSuccess({
          amount,
          initializeHash: txHash,
          status: WithdrawalStatus.PENDING,
          finalizeHash: null,
          from: address,
          timestamp
        })
      ]
    }

    describe('when data is for a meta transaction', () => {
      it('should dispatch the actions to signal the withdrawal success, to fetch the transaction and to watch for the transaction status', () => {
        const { address, txHash, metaWithdrawalInput: input, supplementaryAddress: from } = data

        return handleTest({
          address,
          txHash,
          sendResponse: { input, from },
          expectedActions: getExpectedActions()
        })
      })
    })

    describe('when data is for a polygon transaction', () => {
      it('should dispatch the actions to signal the withdrawal success, to fetch the transaction and to watch for the transaction status', () => {
        const { address, txHash, polygonWithdrawalInput: input } = data

        return handleTest({
          address,
          txHash,
          sendResponse: { input, from: address },
          expectedActions: getExpectedActions()
        })
      })
    })
  })

  describe('given invalid data', () => {
    describe('when transaction is not found', () => {
      it('should dispatch the import withdrawal failure action with not found message', () => {
        const { address, txHash } = data

        return handleTest({
          address,
          txHash,
          expectedActions: [importWithdrawalFailure(importWithdrawalErrors.notFound)]
        })
      })
    })

    describe('when meta transaction belongs to another wallet', () => {
      it('should dispatch the import withdrawal failure action with not own transaction message', () => {
        const { supplementaryAddress: from, txHash, metaWithdrawalInput: input } = data

        const address = 'Another Address'

        return handleTest({
          address,
          txHash,
          sendResponse: { input, from },
          expectedActions: [importWithdrawalFailure(importWithdrawalErrors.notOwnTransaction)]
        })
      })
    })

    describe('when polygon transaction belongs to another wallet', () => {
      it('should dispatch the import withdrawal failure action with not own transaction message', () => {
        const { supplementaryAddress: from, txHash, polygonWithdrawalInput: input } = data

        const address = 'Another Address'

        return handleTest({
          address,
          txHash,
          sendResponse: { input, from },
          expectedActions: [importWithdrawalFailure(importWithdrawalErrors.notOwnTransaction)]
        })
      })
    })

    describe('when transaction is not a withdrawal', () => {
      it('should dispatch the import withdrawal failure action with not withdrawal message', () => {
        const { address, supplementaryAddress: from, txHash, sendInput: input } = data

        return handleTest({
          address,
          txHash,
          sendResponse: { input, from },
          expectedActions: [importWithdrawalFailure(importWithdrawalErrors.notWithdrawal)]
        })
      })
    })

    describe('when transaction was already processed', () => {
      it('should dispatch the import withdrawal failure action with already processed message', () => {
        const { address, supplementaryAddress: from, txHash, metaWithdrawalInput: input } = data

        return handleTest({
          address,
          txHash,
          sendResponse: { input, from },
          expectedActions: [importWithdrawalFailure(importWithdrawalErrors.alreadyProcessed)],
          isERC20ExitProcessed: true
        })
      })
    })
  })

  describe('when address is undefined', () => {
    it('should dispatch the import withdrawal failure action with no address found message', () => {
      const { txHash } = data

      return handleTest({
        txHash,
        expectedActions: [importWithdrawalFailure(importWithdrawalErrors.other('Could not get the address'))]
      })
    })
  })

  describe('when provider cannot be obtained', () => {
    it('should dispatch the import withdrawal failure action with no provider obtained message', () => {
      const { address, txHash } = data

      return handleTest({
        address,
        txHash,
        shouldRejectGetNetworkProvider: true,
        expectedActions: [importWithdrawalFailure(importWithdrawalErrors.other('getNetworkProvider rejected'))]
      })
    })
  })

  describe('when provider.send is rejected', () => {
    it('should dispatch the import withdrawal failure action with send failed message', () => {
      const { address, txHash } = data

      return handleTest({
        address,
        txHash,
        shouldRejectProviderSend: true,
        expectedActions: [importWithdrawalFailure(importWithdrawalErrors.other('provider.send rejected'))]
      })
    })
  })
})
