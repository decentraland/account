import { NotificationType } from '@dcl/schemas'
import { SubscriptionGroupKeys, SubscriptionGroups } from './types'

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
