import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fetchFromAPI } from '../utils/fetchFromAPI'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim())
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const { data: suggestionData } = useQuery({
    queryKey: ['search-suggestions', debouncedSearchTerm],
    queryFn: () =>
      fetchFromAPI('/search', {
        part: 'snippet',
        q: debouncedSearchTerm,
        type: 'video',
        maxResults: 5,
      }),
    enabled: debouncedSearchTerm.length > 1,
    staleTime: 1000 * 60 * 5,
  })

  const suggestions = suggestionData?.items ?? []

  const handleSubmit = (event) => {
    event.preventDefault()
    const term = searchTerm.trim()

    if (!term) {
      return
    }

    navigate(`/search/${encodeURIComponent(term)}`)
    setIsSuggestionOpen(false)
    setSearchTerm('')
  }

  const handleSuggestionSelect = (value) => {
    navigate(`/search/${encodeURIComponent(value)}`)
    setSearchTerm('')
    setDebouncedSearchTerm('')
    setIsSuggestionOpen(false)
  }

  return (
    <div className="search-wrap">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onFocus={() => setIsSuggestionOpen(true)}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search videos"
        />
        <button type="submit">Search</button>
      </form>

      {isSuggestionOpen && suggestions.length > 0 && (
        <ul className="suggestions-list" role="listbox" aria-label="Search suggestions">
          {suggestions.map((item) => {
            const title = item?.snippet?.title
            const key = item?.id?.videoId || title

            if (!title) {
              return null
            }

            return (
              <li key={key}>
                <button type="button" onMouseDown={() => handleSuggestionSelect(title)}>
                  {title}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
