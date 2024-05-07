import { ChainId } from '@dcl/schemas/dist/dapps/chain-id'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { ProviderType } from '@dcl/schemas/dist/dapps/provider-type'
import { select } from '@redux-saga/core/effects'
import { getLocation, push } from 'connected-react-router'
import { connectWalletSuccess } from 'decentraland-dapps/dist/modules/wallet/actions'
import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'
import { expectSaga } from 'redux-saga-test-plan'

import { locationSaga } from './sagas'
import { locations } from '../locations'

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

  describe('when location pathname is equal to the sign in location', () => {
    it('should push root location', () => {
      return expectSaga(locationSaga)
        .provide([[select(getLocation), { pathname: locations.signIn() }]])
        .put(push(locations.root()))
        .dispatch(connectWalletSuccess(mockWallet))
        .silentRun()
    })
  })

  describe('when location pathname is not equal to the sign in location', () => {
    it('should not push root location', () => {
      return expectSaga(locationSaga)
        .provide([[select(getLocation), { pathname: '/not-sign-in' }]])
        .dispatch(connectWalletSuccess(mockWallet))
        .silentRun()
        .then(({ effects }) => {
          expect(effects.put).toBeUndefined()
        })
    })
  })
})
