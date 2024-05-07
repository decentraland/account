import { NotificationChannelType, NotificationType, SubscriptionDetails } from '@dcl/schemas'
import { LoadingState } from 'decentraland-dapps/dist/modules/loading/reducer'

export type CamelCase<TS extends string> = TS extends `${infer P}_${infer Q}${infer R}`
  ? `${Lowercase<P>}${Uppercase<Q>}${CamelCase<R>}`
  : Lowercase<TS>

export type SnakeToCamelCase<T> = {
  [P in keyof T as CamelCase<string & P>]: T[P]
}

export type NotificationChannelTypeCamelCase = SnakeToCamelCase<NotificationChannelType>

type Writable<T> = { -readonly [P in keyof T]: T[P] }

export type NotificationTypeCamelCase = Writable<{
  [K in keyof typeof NotificationType as CamelCase<K>]: (typeof NotificationType)[K]
}>

export type MessageTypeCamelCase = {
  [notificationType in keyof NotificationTypeCamelCase]: NotificationChannelTypeCamelCase
}

export type SubscriptionDetailsCamelCase = Omit<SnakeToCamelCase<SubscriptionDetails>, 'messageType'> & {
  messageType: MessageTypeCamelCase
}

export type SubscriptionState = {
  subscriptionDetails: SubscriptionDetailsCamelCase
  email: string
  loading: LoadingState
  error: string | null
}

export enum SubscriptionGroupKeys {
  GENERAL = 'general',
  BUYING = 'buying',
  SELLING = 'selling',
  RENTALS = 'rentals',
  CREATORS = 'creators',
  GOVERNANCE = 'governance'
}

export type SubscriptionGroups = Writable<{
  [K in keyof typeof SubscriptionGroupKeys as CamelCase<K>]: NotificationType[]
}>
