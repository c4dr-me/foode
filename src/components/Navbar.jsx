import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext"; 

const Navbar = () => {
    const { cart } = useCart(); 

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="bg-[#EDF844] p-4 flex items-center justify-between shadow-md">
            <Link to="/" >
                <div className="text-orange-500 text-3xl tracking-wide antialiased font-bold font-mono">
                    FOODE
                </div>
            </Link>
            <Link to="/cart" className="text-orange-500 hover:underline flex items-center gap-2 relative">
                <FaShoppingCart size={20} /> 
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </Link>
        </nav>
    );
};

export default Navbar;