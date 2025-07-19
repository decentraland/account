import { Network } from '@dcl/schemas'
import { getChainIdByNetwork, getNetworkWeb3Provider } from 'decentraland-dapps/dist/lib/eth'
import { utils } from 'ethers'
import { getEstimatedExitTransactionCost } from './utils'

// Mock the external dependencies
jest.mock('decentraland-dapps/dist/lib/eth')
jest.mock('ethers')

const mockGetChainIdByNetwork = getChainIdByNetwork as jest.MockedFunction<typeof getChainIdByNetwork>
const mockGetNetworkWeb3Provider = getNetworkWeb3Provider as jest.MockedFunction<typeof getNetworkWeb3Provider>
const mockFormatEther = utils.formatEther as jest.MockedFunction<typeof utils.formatEther>

describe('when getting the estimated exit transaction cost', () => {
  let mockProvider: { getGasPrice: jest.Mock }

  beforeEach(() => {
    mockProvider = {
      getGasPrice: jest.fn()
    }
    mockGetChainIdByNetwork.mockReturnValue(1)
    mockGetNetworkWeb3Provider.mockResolvedValue(mockProvider as any)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when calculating transaction cost', () => {
    let mockGasPrice: { mul: jest.Mock }
    let expectedCost: string

    beforeEach(() => {
      mockGasPrice = {
        mul: jest.fn().mockReturnValue('5213400000000000')
      }
      expectedCost = '0.00521340'
      mockProvider.getGasPrice.mockResolvedValue(mockGasPrice)
      mockFormatEther.mockReturnValue(expectedCost)
    })

    it('should return the formatted transaction cost in ETH', async () => {
      const result = await getEstimatedExitTransactionCost()

      expect(result).toBe(expectedCost)
    })

    it('should call required dependencies with correct parameters', async () => {
      await getEstimatedExitTransactionCost()

      expect(mockGetChainIdByNetwork).toHaveBeenCalledWith(Network.ETHEREUM)
      expect(mockGetNetworkWeb3Provider).toHaveBeenCalledWith(1)
      expect(mockProvider.getGasPrice).toHaveBeenCalled()
      expect(mockGasPrice.mul).toHaveBeenCalledWith(260670)
      expect(mockFormatEther).toHaveBeenCalledWith('5213400000000000')
    })
  })

  describe('and getting the chain id by network rejects', () => {
    let networkError: Error

    beforeEach(() => {
      networkError = new Error('Network error')
      mockGetChainIdByNetwork.mockImplementation(() => {
        throw networkError
      })
    })

    it('should propagate the network error', async () => {
      await expect(getEstimatedExitTransactionCost()).rejects.toThrow('Network error')
    })
  })

  describe('and getting the network web3 provider rejects', () => {
    let providerError: Error

    beforeEach(() => {
      providerError = new Error('Provider error')
      mockGetNetworkWeb3Provider.mockRejectedValue(providerError)
    })

    it('should propagate the provider error', async () => {
      await expect(getEstimatedExitTransactionCost()).rejects.toThrow('Provider error')
    })
  })

  describe('and getting the gas price rejects', () => {
    let gasPriceError: Error

    beforeEach(() => {
      gasPriceError = new Error('Gas price error')
      mockProvider.getGasPrice.mockRejectedValue(gasPriceError)
    })

    it('should propagate the gas price error', async () => {
      await expect(getEstimatedExitTransactionCost()).rejects.toThrow('Gas price error')
    })
  })
})
