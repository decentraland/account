import { NotificationType } from '@dcl/schemas'
import { SubscriptionGroupKeys, SubscriptionGroups } from './types'

export const subscriptionGroups: SubscriptionGroups = {
  [SubscriptionGroupKeys.MARKETPLACE]: [
    NotificationType.ITEM_SOLD,
    NotificationType.BID_ACCEPTED,
    NotificationType.BID_RECEIVED,
    NotificationType.ROYALTIES_EARNED,
    NotificationType.LAND_RENTAL_ENDED,
    NotificationType.LAND_RENTED
  ],
  [SubscriptionGroupKeys.CREDITS]: [
    NotificationType.CREDITS_REMINDER_COMPLETE_GOALS,
    NotificationType.CREDITS_REMINDER_CLAIM_CREDITS,
    NotificationType.CREDITS_REMINDER_USAGE,
    NotificationType.CREDITS_REMINDER_DO_NOT_MISS_OUT
  ],
  [SubscriptionGroupKeys.EVENTS]: [NotificationType.EVENTS_STARTED, NotificationType.EVENTS_STARTS_SOON],
  [SubscriptionGroupKeys.REWARDS]: [
    NotificationType.REWARD_ASSIGNED,
    NotificationType.REWARD_CAMPAIGN_OUT_OF_FUNDS,
    NotificationType.REWARD_CAMPAIGN_OUT_OF_STOCK
  ],
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
    NotificationType.WORLDS_MISSING_RESOURCES,
    NotificationType.WORLDS_PERMISSION_GRANTED,
    NotificationType.WORLDS_PERMISSION_REVOKED
  ],
  [SubscriptionGroupKeys.STREAMING]: [
    NotificationType.STREAMING_KEY_EXPIRED,
    NotificationType.STREAMING_KEY_RESET,
    NotificationType.STREAMING_KEY_REVOKE,
    NotificationType.STREAMING_PLACE_UPDATED,
    NotificationType.STREAMING_TIME_EXCEEDED
  ],
  [SubscriptionGroupKeys.TIPS]: [NotificationType.TIP_RECEIVED],
  [SubscriptionGroupKeys.REFERRAL]: [NotificationType.REFERRAL_INVITED_USERS_ACCEPTED, NotificationType.REFERRAL_NEW_TIER_REACHED]
}

export function isInSubscriptionGroup(subscriptionGroupsKey: SubscriptionGroupKeys, notificationType: NotificationType) {
  return subscriptionGroups[subscriptionGroupsKey].includes(notificationType)
}
