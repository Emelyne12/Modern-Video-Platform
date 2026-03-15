import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Loader from '../components/Loader'
import Videos from '../components/Videos'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { formatSubscribers } from '../utils/formatters'

function ChannelDetail() {
  const { id } = useParams()

  const {
    data: channelData,
    isLoading: isChannelLoading,
    isError: isChannelError,
    error: channelError,
  } = useQuery({
    queryKey: ['channel-details', id],
    queryFn: () =>
      fetchFromAPI('/channels', {
        part: 'snippet,statistics,brandingSettings',
        id,
      }),
    staleTime: 1000 * 60 * 30,
  })

  const {
    data: channelVideosData,
    isLoading: isVideosLoading,
    isError: isVideosError,
    error: videosError,
  } = useQuery({
    queryKey: ['channel-videos', id],
    queryFn: () =>
      fetchFromAPI('/search', {
        part: 'snippet',
        channelId: id,
        order: 'date',
        type: 'video',
      }),
    staleTime: 1000 * 60 * 30,
  })

  const channelVideos = useMemo(() => channelVideosData?.items ?? [], [channelVideosData])
  const videoIds = useMemo(
    () => channelVideos.map((item) => item?.id?.videoId).filter(Boolean).join(','),
    [channelVideos],
  )

  const { data: detailsData } = useQuery({
    queryKey: ['channel-video-details', id, videoIds],
    queryFn: () =>
      fetchFromAPI('/videos', {
        part: 'contentDetails,statistics',
        id: videoIds,
      }),
    enabled: Boolean(videoIds),
    staleTime: 1000 * 60 * 30,
  })

  const detailsMap = useMemo(() => {
    const map = {}

    for (const item of detailsData?.items ?? []) {
      map[item.id] = item
    }

    return map
  }, [detailsData])

  const channel = channelData?.items?.[0]
  const banner =
    channel?.brandingSettings?.image?.bannerExternalUrl ||
    channel?.brandingSettings?.image?.bannerMobileImageUrl

  return (
    <main className="channel-page">
      {isChannelLoading && <Loader label="Loading channel..." />}

      {isChannelError && (
        <p className="error-state" role="alert">
          Could not load channel profile. {channelError?.message}
        </p>
      )}

      {!isChannelLoading && !isChannelError && channel && (
        <>
          {banner && <img className="channel-banner" src={banner} alt={`${channel.snippet?.title} banner`} />}

          <section className="channel-head">
            <img
              className="channel-avatar"
              src={channel.snippet?.thumbnails?.high?.url || channel.snippet?.thumbnails?.default?.url}
              alt={`${channel.snippet?.title} avatar`}
            />
            <div>
              <h1>{channel.snippet?.title}</h1>
              <p>{formatSubscribers(channel.statistics?.subscriberCount)}</p>
            </div>
          </section>
        </>
      )}

      <h2 className="related-heading">Uploads</h2>

      {isVideosLoading && <Loader label="Loading channel videos..." />}

      {isVideosError && (
        <p className="error-state" role="alert">
          Could not load uploaded videos. {videosError?.message}
        </p>
      )}

      {!isVideosLoading && !isVideosError && <Videos items={channelVideos} detailsMap={detailsMap} />}
    </main>
  )
}

export default ChannelDetail
