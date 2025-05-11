export const sortProducts = (products, sortBy) => {
  if (products.length === 0) return products;

  const sorted = [...products];
  if (sortBy === 'name-asc') {
    sorted.sort((a, b) => a.product_name?.localeCompare(b.product_name));
  } else if (sortBy === 'name-desc') {
    sorted.sort((a, b) => b.product_name?.localeCompare(a.product_name));
  } else if (sortBy === 'grade-asc') {
    sorted.sort((a, b) => (a.nutrition_grades || '').localeCompare(b.nutrition_grades || ''));
  } else if (sortBy === 'grade-desc') {
    sorted.sort((a, b) => (b.nutrition_grades || '').localeCompare(a.nutrition_grades || ''));
  }

  return sorted;
};