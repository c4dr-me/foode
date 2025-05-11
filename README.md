## Features

- **Search Products**: Search for food products by name or barcode.
- **Category Filter**: Filter products by category.
- **Sorting**: Sort products by name or nutrition grade.
- **Product Details**: View detailed information about a product, including ingredients, nutrition values, and labels.
- **Shopping Cart**: Add products to a cart, view cart items, and manage the cart (remove items or clear the cart).
- **Responsive Design**: Fully responsive and optimized for all devices.

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **State Management**: Context API
- **Build Tool**: Vite
- **API**: [Open Food Facts API](https://world.openfoodfacts.org)

## Problem-Solving Approach

1. **Understanding Requirements**: The problem was broken down into smaller tasks, such as implementing search, filtering, sorting, and cart functionality. Each feature was mapped to a React component or utility function.

2. **Component-Based Design**: The application was built using reusable React components like `SearchBar`, `CategoryFilter`, `SortOptions`, and `Card`. This ensured modularity and ease of maintenance.

3. **State Management**: The Context API was used to manage the cart state globally, allowing seamless addition, removal, and clearing of cart items.

4. **API Integration**: The Open Food Facts API was integrated to fetch product data. Utility functions like `fetchProductsByName` and `fetchProductByBarcode` were created to handle API requests.

5. **Performance Optimization**:

   - **Debouncing**: The `useDebounce` hook was implemented to optimize search input handling.
   - **Caching**: Cache product data, reducing redundant API calls.
   - **Skeleton Loaders**: For a better UX added skeleton loaders

6. **Responsive Design**: Tailwind CSS was used to ensure the application is fully responsive and visually appealing across devices.

7. **Testing and Debugging**: Each feature was tested individually to ensure functionality and resolve any issues.

## Time Taken

The assignment was completed in approximately **8 hours**, including:

- **2 hours** for planning and understanding requirements.
- **4 hours** for implementation and coding.
- **2 hours** for testing, debugging, and documentation.
