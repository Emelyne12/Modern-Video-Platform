import { Link } from 'react-router-dom'
import { formatSubscribers } from '../utils/formatters'

function ChannelCard({ channel }) {
  const channelId = channel?.id?.channelId || channel?.id
  const title = channel?.snippet?.title || 'Unknown Channel'
  const thumbnail =
    channel?.snippet?.thumbnails?.high?.url ||
    channel?.snippet?.thumbnails?.medium?.url ||
    channel?.snippet?.thumbnails?.default?.url
  const subscribers = channel?.statistics?.subscriberCount

  if (!channelId) {
    return null
  }

  return (
    <Link className="channel-card" to={`/channel/${channelId}`}>
      <img src={thumbnail} alt={`${title} channel avatar`} />
      <h3>{title}</h3>
      <p>{formatSubscribers(subscribers)}</p>
    </Link>
  )
}

export default ChannelCard
