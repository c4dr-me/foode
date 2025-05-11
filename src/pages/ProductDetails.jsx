import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByBarcode } from "../utils/api";
import { useCart } from "../context/CartContext"; 

const ProductDetail = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); 

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductByBarcode(barcode);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [barcode]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  if (!product) return <p className="p-4 text-center">Product not found.</p>;

  const {
    product_name,
    image_front_url,
    ingredients_text,
    nutrition_grades,
    nutriments,
    labels_tags,
    code,
  } = product;

  const fallbackImage = "https://placehold.co/600x400/png";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/"
        className="inline-block mb-6 bg-[#EDF844] p-2 rounded-md text-orange-600 hover:underline"
      >
        Back
      </Link>

      <div className="bg-white shadow-lg border-orange-300 border rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            {product_name || "Unnamed Product"}
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={image_front_url || fallbackImage}
              alt={product_name || "N/A"}
              className="w-full md:w-1/3 h-60 object-cover rounded-lg"
              loading="lazy"
            />

            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Ingredients
                </h2>
                <p className="text-gray-600">{ingredients_text || "N/A"}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Nutrition Grade
                </h2>
                <p className="uppercase text-orange-600 font-bold">
                  {nutrition_grades || "N/A"}
                </p>
              </div>

              
              <button
                onClick={() => addToCart(product)}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Nutritional Values (per 100g)
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <li>
              <strong>Energy:</strong> {nutriments?.energy_100g || "N/A"} kJ
            </li>
            <li>
              <strong>Fat:</strong> {nutriments?.fat_100g || "N/A"} g
            </li>
            <li>
              <strong>Carbohydrates:</strong>{" "}
              {nutriments?.carbohydrates_100g || "N/A"} g
            </li>
            <li>
              <strong>Proteins:</strong> {nutriments?.proteins_100g || "N/A"} g
            </li>
            <li>
              <strong>Sugars:</strong> {nutriments?.sugars_100g || "N/A"} g
            </li>
            <li>
              <strong>Salt:</strong> {nutriments?.salt_100g || "N/A"} g
            </li>
          </ul>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Labels</h2>
          <div className="flex flex-wrap gap-2">
            {labels_tags?.length ? (
              labels_tags.map((label, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full"
                >
                  {label}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No labels available.</p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-800">Barcode</h2>
          <p className="font-mono text-sm text-gray-700">{code || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;