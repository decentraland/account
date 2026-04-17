/**
 * Authorization types replacing decentraland-dapps authorization module.
 */

export enum AuthorizationType {
  ALLOWANCE = 'allowance',
  APPROVAL = 'approval'
}

export enum AuthorizedAction {
  SWAP_MANA = 'swap_mana',
  BUY = 'buy',
  SELL = 'sell',
  BID = 'bid',
  TRANSFER = 'transfer',
  MINT = 'mint',
  CLAIM_NAME = 'claim_name'
}
