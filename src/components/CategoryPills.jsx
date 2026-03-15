import { categories } from '../constants/categories'

function CategoryPills({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-pills" role="tablist" aria-label="Quick category filters">
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          role="tab"
          aria-selected={selectedCategory === category}
          className={selectedCategory === category ? 'active' : ''}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryPills
