import { ChainId } from '@dcl/schemas/dist/dapps/chain-id'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { ProviderType } from '@dcl/schemas/dist/dapps/provider-type'
import { getContext } from '@redux-saga/core/effects'
import { connectWalletSuccess } from 'decentraland-dapps/dist/modules/wallet/actions'
import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'
import { expectSaga } from 'redux-saga-test-plan'
import { locations } from '../locations'
import { locationSaga } from './sagas'

let pushMock: jest.Mock

describe('when handling connect wallet success', () => {
  const mockWallet: Wallet = {
    address: 'mock-address',
    networks: {
      [Network.ETHEREUM]: {
        mana: 10,
        chainId: ChainId.ETHEREUM_GOERLI
      },
      [Network.MATIC]: {
        mana: 10,
        chainId: ChainId.MATIC_MUMBAI
      }
    },
    network: Network.ETHEREUM,
    chainId: ChainId.ETHEREUM_GOERLI,
    providerType: ProviderType.NETWORK
  }

  beforeEach(() => {
    pushMock = jest.fn()
  })

  describe('when location pathname is equal to the sign in location', () => {
    it('should push root location', () => {
      return expectSaga(locationSaga)
        .provide([[getContext('history'), { location: { pathname: locations.signIn() }, push: pushMock }]])
        .dispatch(connectWalletSuccess(mockWallet))
        .silentRun()
        .then(() => {
          expect(pushMock).toHaveBeenCalledWith(locations.root())
        })
    })
  })

  describe('when location pathname is not equal to the sign in location', () => {
    it('should not push root location', () => {
      return expectSaga(locationSaga)
        .provide([[getContext('history'), { location: { pathname: '/not-sign-in' }, push: pushMock }]])
        .dispatch(connectWalletSuccess(mockWallet))
        .silentRun()
        .then(({ effects }) => {
          expect(effects.put).toBeUndefined()
        })
    })
  })
})
