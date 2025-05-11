const SortOptions = ({ selected, onChange }) => {
  const handleSortChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <select
        value={selected}
        onChange={handleSortChange}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <option value="">Sort By</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="grade-asc">Nutrition Grade (Low-High)</option>
        <option value="grade-desc">Nutrition Grade (High-Low)</option>
      </select>
    </div>
  );
};

export default SortOptions;