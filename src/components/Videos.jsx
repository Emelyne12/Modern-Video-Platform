import ChannelCard from './ChannelCard'
import VideoCard from './VideoCard'

function Videos({ items, detailsMap }) {
  if (!items?.length) {
    return <p className="empty-state">No results found.</p>
  }

  return (
    <section className="video-grid">
      {items.map((item) => {
        const kind = item?.id?.kind || ''

        if (kind.includes('channel')) {
          return <ChannelCard key={`${item.id.channelId}-channel`} channel={item} />
        }

        const fallbackVideoId = typeof item.id === 'string' ? item.id : item?.id?.videoId

        return <VideoCard key={`${fallbackVideoId}-video`} video={item} detailsMap={detailsMap} />
      })}
    </section>
  )
}

export default Videos
