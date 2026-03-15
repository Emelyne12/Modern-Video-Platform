import { Link } from 'react-router-dom'
import { formatDuration, formatViews } from '../utils/formatters'

function VideoCard({ video, detailsMap }) {
  const videoId = video?.id?.videoId || video?.id
  const snippet = video?.snippet

  if (!videoId || !snippet) {
    return null
  }

  const title = snippet.title || 'Untitled video'
  const channelTitle = snippet.channelTitle || 'Unknown channel'
  const channelId = snippet.channelId
  const thumbnail =
    snippet.thumbnails?.high?.url ||
    snippet.thumbnails?.medium?.url ||
    snippet.thumbnails?.default?.url
  const details = detailsMap?.[videoId]

  return (
    <article className="video-card">
      <Link to={`/video/${videoId}`} className="thumbnail-link">
        <img src={thumbnail} alt={title} loading="lazy" />
        <span className="duration">{formatDuration(details?.contentDetails?.duration)}</span>
      </Link>

      <div className="video-meta">
        <Link to={`/video/${videoId}`} className="video-title">
          {title}
        </Link>

        <div className="video-subline">
          <Link to={`/channel/${channelId}`} className="channel-link">
            {channelTitle}
          </Link>
          <span>{formatViews(details?.statistics?.viewCount)}</span>
        </div>
      </div>
    </article>
  )
}

export default VideoCard
