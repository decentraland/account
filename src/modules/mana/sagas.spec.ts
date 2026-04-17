import { runSaga } from 'redux-saga'
import { importWithdrawalFailure, importWithdrawalRequest } from './actions'
import { handleImportWithdrawalRequest, importWithdrawalErrors } from './sagas'

describe('handleImportWithdrawalRequest', () => {
  const txHash = '0x9bfefc67ed1568a62082addea070e5812a199d5db593935c307697ed748515f8'

  describe('when address is undefined', () => {
    it('should dispatch the import withdrawal failure action with no address found message', async () => {
      const dispatched: any[] = []

      await runSaga(
        {
          dispatch: (a: any) => dispatched.push(a),
          getState: () => ({})
        },
        handleImportWithdrawalRequest,
        importWithdrawalRequest(txHash)
      ).toPromise()

      expect(dispatched).toEqual([importWithdrawalFailure(importWithdrawalErrors.other('Could not get the address'))])
    })
  })

  describe('when address is defined', () => {
    it('should dispatch failure since viem implementation is pending', async () => {
      const dispatched: any[] = []
      const address = '0x2f89ed84e0413960d9adf8d57dd56c2c2f5076cc'

      await runSaga(
        {
          dispatch: (a: any) => dispatched.push(a),
          getState: () => ({ wallet: { address } })
        },
        handleImportWithdrawalRequest,
        importWithdrawalRequest(txHash)
      ).toPromise()

      expect(dispatched).toEqual([
        importWithdrawalFailure(importWithdrawalErrors.other('Import withdrawal: Not yet implemented with viem'))
      ])
    })
  })
})
