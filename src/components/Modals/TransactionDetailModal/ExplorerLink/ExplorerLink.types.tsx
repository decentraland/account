import { ChainId, Network } from '@dcl/schemas'

export type Props = {
  network?: Network
  chainId?: ChainId
  txHash: string
}
