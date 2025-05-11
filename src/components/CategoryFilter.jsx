const CategoryFilter = ({ categories, selected, onChange }) => {
  const handleCategoryChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <select
        value={selected}
        onChange={handleCategoryChange}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <option value="">All Categories</option>
        {categories.map((category, idx) => (
          <option key={idx} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;