import { NotificationChannelType, NotificationType, Subscription, SubscriptionDetails } from '@dcl/schemas'
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
  unconfirmedEmail?: string
  loading: LoadingState
  error: string | null
  hasApprovedEmail: boolean
}

export enum SubscriptionGroupKeys {
  MARKETPLACE = 'marketplace',
  EVENTS = 'events',
  DAO = 'dao',
  WORLDS = 'worlds'
}

export type SubscriptionGroups = {
  [subscriptionGroupKeys in SubscriptionGroupKeys]: NotificationType[]
}

export type SubscriptionFromClient = Subscription & {
  unconfirmedEmail?: string
}
