import { NotificationType, SubscriptionDetails } from '@dcl/schemas'
import { SubscriptionDetailsCamelCase, SubscriptionGroupKeys, SubscriptionGroups } from './types'

export function toCamelCase(str: string): string {
  return str.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''))
}

function transformKeysToCamelCase<T extends Record<string, unknown>>(inputObject: T): Record<string, unknown> {
  if (typeof inputObject !== 'object' || inputObject === null) {
    return inputObject
  }

  if (Array.isArray(inputObject)) {
    return inputObject.map(item => transformKeysToCamelCase(item as Record<string, unknown>)) as unknown as Record<string, unknown>
  }

  return Object.keys(inputObject).reduce(
    (result, key) => {
      const camelCaseKey = toCamelCase(key)
      const value = inputObject[key]
      if (typeof value === 'object' && value !== null) {
        result[camelCaseKey] = transformKeysToCamelCase(value as Record<string, unknown>)
      } else {
        result[camelCaseKey] = value
      }
      return result
    },
    {} as Record<string, unknown>
  )
}

export function transformSubscriptionDetailsToCamelCase(subscriptionDetails: SubscriptionDetails): SubscriptionDetailsCamelCase {
  return transformKeysToCamelCase(subscriptionDetails) as unknown as SubscriptionDetailsCamelCase
}

export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

function transformKeysToSnakeCase<T extends Record<string, unknown>>(inputObject: T): Record<string, unknown> {
  if (typeof inputObject !== 'object' || inputObject === null) {
    return inputObject
  }

  if (Array.isArray(inputObject)) {
    return inputObject.map(item => transformKeysToSnakeCase(item as Record<string, unknown>)) as unknown as Record<string, unknown>
  }

  return Object.keys(inputObject).reduce(
    (result, key) => {
      const snakeCaseKey = toSnakeCase(key)
      const value = inputObject[key]
      if (typeof value === 'object' && value !== null) {
        result[snakeCaseKey] = transformKeysToSnakeCase(value as Record<string, unknown>)
      } else {
        result[snakeCaseKey] = value
      }
      return result
    },
    {} as Record<string, unknown>
  )
}

export function transformSubscriptionDetailsToSnakeCase(subscriptionDetailsCamelCase: SubscriptionDetailsCamelCase): SubscriptionDetails {
  return transformKeysToSnakeCase(subscriptionDetailsCamelCase) as unknown as SubscriptionDetails
}

export const subscriptionGroups: SubscriptionGroups = {
  [SubscriptionGroupKeys.GENERAL]: [NotificationType.EVENTS_STARTED, NotificationType.EVENTS_STARTS_SOON, NotificationType.REWARD_ASSIGNED],
  [SubscriptionGroupKeys.BUYING]: [NotificationType.BID_ACCEPTED, NotificationType.BID_RECEIVED],
  [SubscriptionGroupKeys.SELLING]: [NotificationType.ITEM_SOLD, NotificationType.ROYALTIES_EARNED],
  [SubscriptionGroupKeys.RENTALS]: [NotificationType.LAND_RENTAL_ENDED, NotificationType.LAND_RENTED],
  [SubscriptionGroupKeys.CREATORS]: [
    NotificationType.WORLDS_ACCESS_RESTORED,
    NotificationType.WORLDS_ACCESS_RESTRICTED,
    NotificationType.WORLDS_MISSING_RESOURCES
  ],
  [SubscriptionGroupKeys.GOVERNANCE]: [
    NotificationType.GOVERNANCE_ANNOUNCEMENT,
    NotificationType.GOVERNANCE_AUTHORED_PROPOSAL_FINISHED,
    NotificationType.GOVERNANCE_COAUTHOR_REQUESTED,
    NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROJECT_UPDATE,
    NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROPOSAL,
    NotificationType.GOVERNANCE_PROPOSAL_ENACTED,
    NotificationType.GOVERNANCE_VOTING_ENDED_VOTER
  ]
}

export function isInSubscriptionGroup(subscriptionGroupsKey: SubscriptionGroupKeys, notificationType: NotificationType) {
  return subscriptionGroups[subscriptionGroupsKey].includes(notificationType)
}
