import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link to="/" className="text-orange-500 hover:underline">
          Go back to shopping
        </Link>
      </div>
    );
  }
  const fallbackImg = 'https://placehold.co/100x100/png';
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.code}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image_front_url || fallbackImg}
                alt={item.product_name || "Product Image"}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.product_name}</h2>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.code)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between">
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Clear Cart
        </button>
        <Link
          to="/"
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;