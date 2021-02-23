import BN from 'bn.js'
import { Address } from 'web3x-es/address'
import { EventLog, TransactionReceipt } from 'web3x-es/formatters'
import {
  Contract,
  ContractOptions,
  TxCall,
  TxSend,
  EventSubscriptionFactory,
} from 'web3x-es/contract'
import { Eth } from 'web3x-es/eth'
import abi from './RootChainManagerAbi'
export type MetaTransactionExecutedEvent = {
  userAddress: Address
  relayerAddress: Address
  functionSignature: string
}
export type PredicateRegisteredEvent = {
  tokenType: string
  predicateAddress: Address
}
export type RoleAdminChangedEvent = {
  role: string
  previousAdminRole: string
  newAdminRole: string
}
export type RoleGrantedEvent = {
  role: string
  account: Address
  sender: Address
}
export type RoleRevokedEvent = {
  role: string
  account: Address
  sender: Address
}
export type TokenMappedEvent = {
  rootToken: Address
  childToken: Address
  tokenType: string
}
export interface MetaTransactionExecutedEventLog
  extends EventLog<MetaTransactionExecutedEvent, 'MetaTransactionExecuted'> {}
export interface PredicateRegisteredEventLog
  extends EventLog<PredicateRegisteredEvent, 'PredicateRegistered'> {}
export interface RoleAdminChangedEventLog
  extends EventLog<RoleAdminChangedEvent, 'RoleAdminChanged'> {}
export interface RoleGrantedEventLog
  extends EventLog<RoleGrantedEvent, 'RoleGranted'> {}
export interface RoleRevokedEventLog
  extends EventLog<RoleRevokedEvent, 'RoleRevoked'> {}
export interface TokenMappedEventLog
  extends EventLog<TokenMappedEvent, 'TokenMapped'> {}
interface RootChainManagerEvents {
  MetaTransactionExecuted: EventSubscriptionFactory<MetaTransactionExecutedEventLog>
  PredicateRegistered: EventSubscriptionFactory<PredicateRegisteredEventLog>
  RoleAdminChanged: EventSubscriptionFactory<RoleAdminChangedEventLog>
  RoleGranted: EventSubscriptionFactory<RoleGrantedEventLog>
  RoleRevoked: EventSubscriptionFactory<RoleRevokedEventLog>
  TokenMapped: EventSubscriptionFactory<TokenMappedEventLog>
}
interface RootChainManagerEventLogs {
  MetaTransactionExecuted: MetaTransactionExecutedEventLog
  PredicateRegistered: PredicateRegisteredEventLog
  RoleAdminChanged: RoleAdminChangedEventLog
  RoleGranted: RoleGrantedEventLog
  RoleRevoked: RoleRevokedEventLog
  TokenMapped: TokenMappedEventLog
}
interface RootChainManagerTxEventLogs {
  MetaTransactionExecuted: MetaTransactionExecutedEventLog[]
  PredicateRegistered: PredicateRegisteredEventLog[]
  RoleAdminChanged: RoleAdminChangedEventLog[]
  RoleGranted: RoleGrantedEventLog[]
  RoleRevoked: RoleRevokedEventLog[]
  TokenMapped: TokenMappedEventLog[]
}
export interface RootChainManagerTransactionReceipt
  extends TransactionReceipt<RootChainManagerTxEventLogs> {}
interface RootChainManagerMethods {
  DEFAULT_ADMIN_ROLE(): TxCall<string>
  DEPOSIT(): TxCall<string>
  ERC712_VERSION(): TxCall<string>
  ETHER_ADDRESS(): TxCall<Address>
  MAPPER_ROLE(): TxCall<string>
  MAP_TOKEN(): TxCall<string>
  checkpointManagerAddress(): TxCall<Address>
  childChainManagerAddress(): TxCall<Address>
  childToRootToken(a0: Address): TxCall<Address>
  depositEtherFor(user: Address): TxSend<RootChainManagerTransactionReceipt>
  depositFor(
    user: Address,
    rootToken: Address,
    depositData: string
  ): TxSend<RootChainManagerTransactionReceipt>
  executeMetaTransaction(
    userAddress: Address,
    functionSignature: string,
    sigR: string,
    sigS: string,
    sigV: number | string | BN
  ): TxSend<RootChainManagerTransactionReceipt>
  exit(inputData: string): TxSend<RootChainManagerTransactionReceipt>
  getChainId(): TxCall<string>
  getDomainSeperator(): TxCall<string>
  getNonce(user: Address): TxCall<string>
  getRoleAdmin(role: string): TxCall<string>
  getRoleMember(role: string, index: number | string | BN): TxCall<Address>
  getRoleMemberCount(role: string): TxCall<string>
  grantRole(
    role: string,
    account: Address
  ): TxSend<RootChainManagerTransactionReceipt>
  hasRole(role: string, account: Address): TxCall<boolean>
  initialize(_owner: Address): TxSend<RootChainManagerTransactionReceipt>
  initializeEIP712(): TxSend<RootChainManagerTransactionReceipt>
  mapToken(
    rootToken: Address,
    childToken: Address,
    tokenType: string
  ): TxSend<RootChainManagerTransactionReceipt>
  processedExits(a0: string): TxCall<boolean>
  registerPredicate(
    tokenType: string,
    predicateAddress: Address
  ): TxSend<RootChainManagerTransactionReceipt>
  remapToken(
    rootToken: Address,
    childToken: Address,
    tokenType: string
  ): TxSend<RootChainManagerTransactionReceipt>
  renounceRole(
    role: string,
    account: Address
  ): TxSend<RootChainManagerTransactionReceipt>
  revokeRole(
    role: string,
    account: Address
  ): TxSend<RootChainManagerTransactionReceipt>
  rootToChildToken(a0: Address): TxCall<Address>
  setCheckpointManager(
    newCheckpointManager: Address
  ): TxSend<RootChainManagerTransactionReceipt>
  setChildChainManagerAddress(
    newChildChainManager: Address
  ): TxSend<RootChainManagerTransactionReceipt>
  setStateSender(
    newStateSender: Address
  ): TxSend<RootChainManagerTransactionReceipt>
  setupContractId(): TxSend<RootChainManagerTransactionReceipt>
  stateSenderAddress(): TxCall<Address>
  tokenToType(a0: Address): TxCall<string>
  typeToPredicate(a0: string): TxCall<Address>
}
export interface RootChainManagerDefinition {
  methods: RootChainManagerMethods
  events: RootChainManagerEvents
  eventLogs: RootChainManagerEventLogs
}
export class RootChainManager extends Contract<RootChainManagerDefinition> {
  constructor(eth: Eth, address?: Address, options?: ContractOptions) {
    super(eth, abi, address, options)
  }
}
export var RootChainManagerAbi = abi
