import { NotificationChannelType, NotificationType, SubscriptionDetails } from '@dcl/schemas'
import { LoadingState } from 'decentraland-dapps/dist/modules/loading/reducer'
import { ObjectToCamel, ToCamel } from 'ts-case-convert/lib/caseConvert'

export type NotificationChannelTypeCamelCase = ObjectToCamel<NotificationChannelType>

export type MessageTypeCamelCase = {
  [notificationType in ToCamel<NotificationType>]: NotificationChannelTypeCamelCase
}

export type SubscriptionDetailsCamelCase = ObjectToCamel<SubscriptionDetails>

export type SubscriptionState = {
  subscriptionDetails: SubscriptionDetailsCamelCase
  email: string
  loading: LoadingState
  error: string | null
}

export enum SubscriptionGroupKeys {
  MARKETPLACE = 'Marketplace',
  EVENTS = 'Events',
  DAO = 'dao',
  WORLDS = 'Worlds'
}

export type SubscriptionGroups = {
  [subscriptionGroupKeys in SubscriptionGroupKeys]: NotificationType[]
}
