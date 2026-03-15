import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Videos from '../components/Videos'
import Loader from '../components/Loader'
import { fetchFromAPI } from '../utils/fetchFromAPI'

function SearchFeed() {
  const { searchTerm = '' } = useParams()

  const {
    data: searchData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['search-results', searchTerm],
    queryFn: () =>
      fetchFromAPI('/search', {
        part: 'snippet',
        q: decodeURIComponent(searchTerm),
        type: 'video,channel',
      }),
    staleTime: 1000 * 60 * 10,
  })

  const items = useMemo(() => searchData?.items ?? [], [searchData])

  const videoIds = useMemo(
    () =>
      items
        .map((item) => item?.id?.videoId)
        .filter(Boolean)
        .join(','),
    [items],
  )

  const { data: detailsData } = useQuery({
    queryKey: ['search-video-details', searchTerm, videoIds],
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

  return (
    <main className="search-page">
      <h2 className="feed-heading">Search results for “{decodeURIComponent(searchTerm)}”</h2>

      {isLoading && <Loader label="Searching videos..." />}

      {isError && (
        <p className="error-state" role="alert">
          Search failed. {error?.message}
        </p>
      )}

      {!isLoading && !isError && <Videos items={items} detailsMap={detailsMap} />}
    </main>
  )
}

export default SearchFeed
