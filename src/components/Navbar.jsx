import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo" aria-label="Go to homepage">
        <span className="logo-mark">▶</span>
        <span className="logo-text">ModernTube</span>
      </Link>
      <SearchBar />
    </header>
  )
}

export default Navbar
