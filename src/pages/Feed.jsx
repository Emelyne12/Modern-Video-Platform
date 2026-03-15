import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Sidebar from '../components/Sidebar'
import CategoryPills from '../components/CategoryPills'
import Videos from '../components/Videos'
import Loader from '../components/Loader'
import { fetchFromAPI } from '../utils/fetchFromAPI'

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState('Coding')

  const {
    data: feedData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['feed-videos', selectedCategory],
    queryFn: () =>
      fetchFromAPI('/search', {
        part: 'snippet',
        q: selectedCategory,
        type: 'video',
      }),
    staleTime: 1000 * 60 * 10,
  })

  const videos = useMemo(() => feedData?.items ?? [], [feedData])
  const videoIds = useMemo(
    () => videos.map((video) => video?.id?.videoId).filter(Boolean).join(','),
    [videos],
  )

  const { data: videoDetailsData } = useQuery({
    queryKey: ['feed-video-details', selectedCategory, videoIds],
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

    for (const item of videoDetailsData?.items ?? []) {
      map[item.id] = item
    }

    return map
  }, [videoDetailsData])

  return (
    <main className="main-layout">
      <Sidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      <section className="content-area">
        <CategoryPills selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        <h2 className="feed-heading">{selectedCategory} videos</h2>

        {isLoading && <Loader label="Loading feed videos..." />}

        {isError && (
          <p className="error-state" role="alert">
            Could not load videos right now. {error?.message}
          </p>
        )}

        {!isLoading && !isError && <Videos items={videos} detailsMap={detailsMap} />}
      </section>
    </main>
  )
}

export default Feed
