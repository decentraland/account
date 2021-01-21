class CoingeckoAPI {
  async fetchManaPrice() {
    const resp = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=decentraland&vs_currencies=usd'
    )
    const json = await resp.json()
    return json.decentraland.usd
  }
}

export const coingecko = new CoingeckoAPI()
