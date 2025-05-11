import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  const {
    product_name,
    image_front_small_url,
    categories,
    ingredients_text,
    nutrition_grades,
    code,
  } = product;

  const fallbackImage = 'https://placehold.co/600x400/png';

  return (
    <Link to={`/product/${code}`} className="block">
      <article className="border rounded-xl p-4 shadow-sm hover:shadow-lg border-orange-300 transition hover:scale-105 bg-white flex flex-col h-full">
        <img
          src={image_front_small_url || fallbackImage}
          alt={product_name || 'Product Image'}
          className="w-full h-40 object-contain mb-4 bg-gray-100 rounded"
          loading='lazy'
        />

        <h2 className="text-lg font-semibold mb-2 text-gray-800 truncate">
          {product_name || 'Unknown Product'}
        </h2>

        <p className="text-sm text-gray-600 mb-1 line-clamp-1">
          <strong>Category:</strong> {categories || 'N/A'}
        </p>

        <p className="text-sm text-gray-600 mb-1 line-clamp-2">
          <strong>Ingredients:</strong>{' '}
          {ingredients_text
            ? ingredients_text.slice(0, 80) + (ingredients_text.length > 80 ? '...' : '')
            : 'N/A'}
        </p>

        <p className="text-sm text-gray-600 mb-1">
          <strong>Nutrition Grade:</strong>{' '}
          <span className="uppercase">{nutrition_grades || 'N/A'}</span>
        </p>

        <p className="text-sm text-gray-600 mt-auto">
          <strong>Code:</strong> <span className="font-mono text-xs">{code || 'N/A'}</span>
        </p>
      </article>
    </Link>
  );
};

export default Card;
