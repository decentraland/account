import { NotificationType } from '@dcl/schemas'
import { SubscriptionGroupKeys, SubscriptionGroups } from './types'

export const subscriptionGroups: SubscriptionGroups = {
  [SubscriptionGroupKeys.MARKETPLACE]: [
    NotificationType.ITEM_SOLD,
    NotificationType.BID_ACCEPTED,
    NotificationType.BID_RECEIVED,
    NotificationType.ROYALTIES_EARNED,
    NotificationType.REWARD_ASSIGNED,
    NotificationType.LAND_RENTAL_ENDED,
    NotificationType.LAND_RENTED
  ],
  [SubscriptionGroupKeys.EVENTS]: [NotificationType.EVENTS_STARTED, NotificationType.EVENTS_STARTS_SOON],
  [SubscriptionGroupKeys.DAO]: [
    NotificationType.GOVERNANCE_ANNOUNCEMENT,
    NotificationType.GOVERNANCE_AUTHORED_PROPOSAL_FINISHED,
    NotificationType.GOVERNANCE_COAUTHOR_REQUESTED,
    NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROJECT_UPDATE,
    NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROPOSAL,
    NotificationType.GOVERNANCE_PROPOSAL_ENACTED,
    NotificationType.GOVERNANCE_VOTING_ENDED_VOTER
  ],
  [SubscriptionGroupKeys.WORLDS]: [
    NotificationType.WORLDS_ACCESS_RESTORED,
    NotificationType.WORLDS_ACCESS_RESTRICTED,
    NotificationType.WORLDS_MISSING_RESOURCES
  ]
}

export function isInSubscriptionGroup(subscriptionGroupsKey: SubscriptionGroupKeys, notificationType: NotificationType) {
  return subscriptionGroups[subscriptionGroupsKey].includes(notificationType)
}
