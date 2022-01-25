const GAS_PRICE_API_URL = 'https://api.gasprice.io/v1'

interface GasPriceEstimatesResponse {
  error: null
  result: {
    instant: {
      feeCap: number
      maxPriorityFee: number
    }
    fast: {
      feeCap: number
      maxPriorityFee: number
    }
    eco: {
      feeCap: number
      maxPriorityFee: number
    }
    baseFee: number
    ethPrice: number
  }
}

class GasPriceAPI {
  async fetchGasPrice(): Promise<GasPriceEstimatesResponse> {
    const resp = await fetch(`${GAS_PRICE_API_URL}/estimates`)
    const json = await resp.json()
    return json
  }
}

export const gasPriceAPI = new GasPriceAPI()
