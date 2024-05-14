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

const defaultStyle = { color: '#fcfcfc', fontSize: 16 }

function NotificationIcon(props: Props) {
  const { name } = props

  switch (name) {
    case NotificationType.GOVERNANCE_ANNOUNCEMENT:
      return <CampaignRoundedIcon sx={defaultStyle} />
    case NotificationType.GOVERNANCE_COAUTHOR_REQUESTED:
      return <GroupRoundedIcon sx={defaultStyle} />
    case NotificationType.GOVERNANCE_AUTHORED_PROPOSAL_FINISHED:
      return <HourglassBottomRoundedIcon sx={defaultStyle} />
    case NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROJECT_UPDATE:
      return <MarkChatUnreadRoundedIcon sx={defaultStyle} />
    case NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROPOSAL:
      return <MarkUnreadChatAltRoundedIcon sx={defaultStyle} />
    case NotificationType.GOVERNANCE_PROPOSAL_ENACTED:
      return <QuickreplyRoundedIcon sx={defaultStyle} />
    case NotificationType.GOVERNANCE_VOTING_ENDED_VOTER:
      return <HourglassBottomRoundedIcon sx={defaultStyle} />
    case NotificationType.GOVERNANCE_PITCH_PASSED:
      return <PlaylistAddCheckRoundedIcon sx={defaultStyle} />
    case NotificationType.GOVERNANCE_TENDER_PASSED:
      return <CheckCircleRoundedIcon sx={defaultStyle} />
    case NotificationType.ROYALTIES_EARNED:
      return <InsightsRoundedIcon sx={defaultStyle} />
    default: {
      const iconName = Object.values(NotificationType).includes(name) ? name : 'mana'
      return (
        <IconStyled>
          <img src={`src/images/icons/${iconName}.svg`} />
        </IconStyled>
      )
    }
  }
}

export default NotificationIcon
