const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchProductsByName(name, page = 1, pageSize = 20) {
  const url = `${BASE_URL}/cgi/search.pl?search_terms=${name}&page=${page}&page_size=${pageSize}&json=true`;

  const res = await fetch(url);
  const data = await res.json();
  return data.products;
}

export async function fetchProductByBarcode(barcode) {
  const res = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
  const data = await res.json();
  return data.product;
}

export async function fetchProductsByCategory(category, page = 1) {
  const url = `${BASE_URL}/facets/categories/${encodeURIComponent(category)}.json?page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.products || [];
}
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/facets/categories.json`);
  const data = await res.json();
  return data.tags.map((tag) => tag.name);
}
