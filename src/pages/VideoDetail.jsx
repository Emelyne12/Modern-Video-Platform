import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import Videos from '../components/Videos'
import VideoPlayer from '../components/VideoPlayer'
import Loader from '../components/Loader'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { formatViews } from '../utils/formatters'

function VideoDetail() {
  const { id } = useParams()

  const {
    data: videoData,
    isLoading: isVideoLoading,
    isError: isVideoError,
    error: videoError,
  } = useQuery({
    queryKey: ['video-details', id],
    queryFn: () =>
      fetchFromAPI('/videos', {
        part: 'snippet,statistics,contentDetails',
        id,
      }),
    staleTime: 1000 * 60 * 30,
  })

  const {
    data: relatedData,
    isLoading: isRelatedLoading,
    isError: isRelatedError,
    error: relatedError,
  } = useQuery({
    queryKey: ['related-videos', id],
    queryFn: () =>
      fetchFromAPI('/search', {
        part: 'snippet',
        relatedToVideoId: id,
        type: 'video',
      }),
    staleTime: 1000 * 60 * 30,
  })

  const relatedVideos = useMemo(() => relatedData?.items ?? [], [relatedData])
  const relatedVideoIds = useMemo(
    () => relatedVideos.map((video) => video?.id?.videoId).filter(Boolean).join(','),
    [relatedVideos],
  )

  const { data: relatedDetailsData } = useQuery({
    queryKey: ['related-video-details', id, relatedVideoIds],
    queryFn: () =>
      fetchFromAPI('/videos', {
        part: 'contentDetails,statistics',
        id: relatedVideoIds,
      }),
    enabled: Boolean(relatedVideoIds),
    staleTime: 1000 * 60 * 30,
  })

  const relatedDetailsMap = useMemo(() => {
    const map = {}

    for (const item of relatedDetailsData?.items ?? []) {
      map[item.id] = item
    }

    return map
  }, [relatedDetailsData])

  const video = videoData?.items?.[0]

  return (
    <main className="video-details-layout">
      <section>
        {isVideoLoading && <Loader label="Loading video..." />}

        {isVideoError && (
          <p className="error-state" role="alert">
            Could not load this video. {videoError?.message}
          </p>
        )}

        {!isVideoLoading && !isVideoError && video && (
          <>
            <VideoPlayer videoId={id} title={video.snippet?.title} />
            <h1 className="video-title-main">{video.snippet?.title}</h1>

            <div className="video-detail-info">
              <Link to={`/channel/${video.snippet?.channelId}`}>
                {video.snippet?.channelTitle}
              </Link>
              <span>{formatViews(video.statistics?.viewCount)}</span>
              <span>{Number(video.statistics?.likeCount || 0).toLocaleString()} likes</span>
            </div>

            <p className="video-description">{video.snippet?.description || 'No description available.'}</p>
          </>
        )}
      </section>

      <aside>
        <h2 className="related-heading">Related videos</h2>

        {isRelatedLoading && <Loader label="Loading related videos..." />}

        {isRelatedError && (
          <p className="error-state" role="alert">
            Could not load related videos. {relatedError?.message}
          </p>
        )}

        {!isRelatedLoading && !isRelatedError && (
          <Videos items={relatedVideos} detailsMap={relatedDetailsMap} />
        )}
      </aside>
    </main>
  )
}

export default VideoDetail
