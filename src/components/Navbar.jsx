import { NavLink } from "react-router-dom";
import "../index.css";

const Navbar = () => {
      // The NavLink component is similar to the Link component, but it adds a class to the element when it matches the current URL.
  return (
    <header className='header fixed top-0 left-0 w-full z-50'>
        <NavLink to="/" className=" ml-2 mt-4 w-21 h-10 rounded-lg items-center justify-center flex font-bold shadow-md">
            <p className="blue-gradient_text text-2xl">TRENDLY</p>
        </NavLink>
    </header>
  )
}

export default Navbar