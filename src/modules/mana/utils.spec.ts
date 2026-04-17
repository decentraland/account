import { Network } from '@dcl/schemas'
import { getChainIdByNetwork } from '../../lib/utils/eth'
import { getEstimatedExitTransactionCost } from './utils'

jest.mock('viem', () => ({
  createPublicClient: jest.fn().mockReturnValue({
    getGasPrice: jest.fn().mockResolvedValue(20000000000n) // 20 gwei
  }),
  http: jest.fn(),
  formatEther: jest.fn().mockReturnValue('0.00521340')
}))

jest.mock('viem/chains', () => ({
  mainnet: { id: 1 },
  sepolia: { id: 11155111 }
}))

jest.mock('../../lib/utils/eth', () => ({
  ...jest.requireActual('../../lib/utils/eth'),
  getChainIdByNetwork: jest.fn().mockReturnValue(1)
}))

describe('when getting the estimated exit transaction cost', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the formatted transaction cost in ETH', async () => {
    const result = await getEstimatedExitTransactionCost()
    expect(result).toBe('0.00521340')
  })

  it('should call getChainIdByNetwork with ETHEREUM', async () => {
    await getEstimatedExitTransactionCost()
    expect(getChainIdByNetwork).toHaveBeenCalledWith(Network.ETHEREUM)
  })
})
