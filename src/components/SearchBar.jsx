import { useState, useEffect } from 'react';
import useDebounce from '../utils/useDebounce';
import { fetchProductByBarcode } from '../utils/api';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 1000);

  const handleSearch = async () => {
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      onSearch({ searchTerm: 'food', products: [], hasMore: true });
      return;
    }

    const isBarcode = /^\d+$/.test(trimmed);

    try {
      if (isBarcode) {
        const product = await fetchProductByBarcode(trimmed);
        onSearch({ searchTerm: '', products: product ? [product] : [], hasMore: false });
      } else {
        onSearch({ searchTerm: trimmed, products: [], hasMore: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedQuery]);

  return (
    <div className="flex items-center gap-2">
           <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or barcode..."
        className="p-2 border border-gray-300 rounded w-full md:w-[20vw] focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
};

export default SearchBar;