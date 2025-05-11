import { useState, useEffect, useMemo, useRef } from 'react';
import {
  fetchProductsByName,
  fetchCategories,
  fetchProductsByCategory
} from '../utils/api';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortOptions from '../components/Sort';
import CardSkeleton from '../components/CardSkeleton';
import { sortProducts } from '../utils/sortHelper';

const PAGE_SIZE = 8;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('food');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const cacheRef = useRef(new Map());

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const cacheKey = `${searchTerm}-${selectedCategory}-${page}`;

        if (cacheRef.current.has(cacheKey)) {
          const cachedData = cacheRef.current.get(cacheKey);
          setProducts((prev) =>
            page === 1 ? cachedData : [...prev, ...cachedData]
          );
          setHasMore(cachedData.length === PAGE_SIZE);
          return;
        }

        let newProducts = [];

        if (selectedCategory) {
          newProducts = await fetchProductsByCategory(selectedCategory, page, PAGE_SIZE);
        } else {
          newProducts = await fetchProductsByName(searchTerm, page, PAGE_SIZE);
        }

        cacheRef.current.set(cacheKey, newProducts);

        setProducts((prev) =>
          page === 1 ? newProducts : [...prev, ...newProducts]
        );

        setHasMore(newProducts.length === PAGE_SIZE);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchTerm, selectedCategory, page]);

  const sortedProducts = useMemo(
    () => sortProducts(products, sortBy),
    [products, sortBy]
  );

  const handleSearchResults = ({ searchTerm, products }) => {
    setSearchTerm(searchTerm);
    setSelectedCategory('');
    setProducts(products);
    setPage(1);
    setHasMore(products.length === PAGE_SIZE);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
    setProducts([]);
    setPage(1);
    setHasMore(true);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <div className="p-4 min-h-[100vh]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-6">
        <SearchBar onSearch={handleSearchResults} />
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={handleCategoryChange}
        />
        <SortOptions selected={sortBy} onChange={handleSortChange} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && page === 1
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => <CardSkeleton key={i} />)
          : sortedProducts.map((product, idx) => <Card key={idx} product={product} />)}

        {loading && page > 1 &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => <CardSkeleton key={`skeleton-${i}`} />)}
      </div>

      {!loading && hasMore && (
        <div ref={observerRef} className="h-10"></div>
      )}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No products found.</p>
      )}
    </div>
  );
};

export default Home;
