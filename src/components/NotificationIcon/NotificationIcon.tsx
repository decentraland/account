import { NotificationType } from '@dcl/schemas'
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import MarkChatUnreadRoundedIcon from '@mui/icons-material/MarkChatUnreadRounded'
import MarkUnreadChatAltRoundedIcon from '@mui/icons-material/MarkUnreadChatAltRounded'
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded'
import QuickreplyRoundedIcon from '@mui/icons-material/QuickreplyRounded'
import { IconStyled } from './NotificationIcon.styled'

type Props = {
  name: NotificationType
}

function NotificationIcon(props: Props) {
  const { name } = props

  if (name === NotificationType.GOVERNANCE_ANNOUNCEMENT) {
    return <CampaignRoundedIcon sx={{ color: '#fcfcfc', fontSize: 16 }} />
  } else if (name === NotificationType.GOVERNANCE_COAUTHOR_REQUESTED) {
    return <GroupRoundedIcon sx={{ color: '#fcfcfc', fontSize: 16 }} />
  } else if (name === NotificationType.GOVERNANCE_AUTHORED_PROPOSAL_FINISHED) {
    return <HourglassBottomRoundedIcon sx={{ color: '#fcfcfc', fontSize: 16 }} />
  } else if (name === NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROJECT_UPDATE) {
    return <MarkChatUnreadRoundedIcon sx={{ color: '#fcfcfc', fontSize: 16 }} />
  } else if (name === NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROPOSAL) {
    return <MarkUnreadChatAltRoundedIcon sx={{ color: '#fcfcfc', fontSize: 16 }} />
  } else if (name === NotificationType.GOVERNANCE_PROPOSAL_ENACTED) {
    return <QuickreplyRoundedIcon sx={{ color: '#fcfcfc', fontSize: 16 }} />
  } else if (name === NotificationType.GOVERNANCE_VOTING_ENDED_VOTER) {
    return <HourglassBottomRoundedIcon sx={{ color: '#fcfcfc', fontSize: 16 }} />
  } else if (name === NotificationType.GOVERNANCE_PITCH_PASSED) {
    return <PlaylistAddCheckRoundedIcon sx={{ color: '#fcfcfc', fontSize: 16 }} />
  } else if (name === NotificationType.GOVERNANCE_TENDER_PASSED) {
    return <CheckCircleRoundedIcon sx={{ color: '#fcfcfc', fontSize: 16 }} />
  } else if (name === NotificationType.ROYALTIES_EARNED) {
    return <InsightsRoundedIcon sx={{ color: '#fcfcfc', fontSize: 16 }} />
  }

  const iconName = Object.values(NotificationType).includes(name) ? name : 'mana'
  return (
    <IconStyled>
      <img src={`src/images/icons/${iconName}.svg`} />
    </IconStyled>
  )
}

export default NotificationIcon
