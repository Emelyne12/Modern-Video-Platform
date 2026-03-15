import { sidebarCategories } from '../constants/categories'

function Sidebar({ selectedCategory, onSelectCategory }) {
  return (
    <aside className="sidebar" aria-label="Video categories">
      {sidebarCategories.map((category) => (
        <button
          type="button"
          key={category}
          className={selectedCategory === category ? 'active' : ''}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </aside>
  )
}

export default Sidebar
