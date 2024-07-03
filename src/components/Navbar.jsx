import {Link} from "react-router-dom";
import "../css/Navbar.css"
import useCartStore from "../zustand/store";

const Navbar = () => {

  const cartItemsCount = useCartStore((state) => state.items.length)

  return (
    <div>
      <nav>
        <ul>
          <li> 
            <Link to="/">Home</Link>{" "}
          </li>
          <li> 
            <Link to="/about">About Us</Link>{" "}
          </li>
          <li>
            <Link to="/contactUs">Contact Us</Link>{" "}
          </li>
          <li>
            <Link to="/cartPage">Cart  ({cartItemsCount}) </Link>{" "}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
