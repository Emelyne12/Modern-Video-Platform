import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Feed from './pages/Feed'
import SearchFeed from './pages/SearchFeed'
import VideoDetail from './pages/VideoDetail'
import ChannelDetail from './pages/ChannelDetail'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
