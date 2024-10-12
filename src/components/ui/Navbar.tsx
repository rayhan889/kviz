import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  const [collapseNavbar, setCollapseNavbar] = useState<boolean>(false);

  const location = useLocation();

  const navItems = [
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Docs",
      path: "/documentation",
    },
  ];

  function handleCollapseNavbar() {
    setCollapseNavbar(prev => !prev);
  }

  return (
    <>
      {/* Mobile Version */}
      <nav className="w-full lg:hidden h-24 px-8 flex items-center justify-between fixed top-0 left-0 z-50 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg border-b border-slate-300">
        <button className="flex items-center gap-x-2 text-xl text-blue-600">
          <img
            src="https://utfs.io/f/K0kPNXk3jrKMN0skWDZ4xSvAf5KFzoCiMj3PRm27hZ9JDyeu"
            alt="kviz logo"
            className="h-6 w-6"
          />
          <Link to="/" className="font-bold hover:underline">
            kviz.
          </Link>
        </button>

        {collapseNavbar ? (
          <FiMenu
            className="h-7 w-7 text-slate-950 cursor-pointer"
            onClick={handleCollapseNavbar}
          />
        ) : (
          <FiX
            className="h-7 w-7 text-slate-950 cursor-pointer"
            onClick={handleCollapseNavbar}
          />
        )}

        <div
          className={`w-full lg:hidden fixed top-24 left-0 z-40 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg border-b border-slate-300 transition-all duration-300 ease-in-out ${
            collapseNavbar
              ? "h-0 opacity-0"
              : "h-[calc(100vh-6rem)] opacity-100"
          }`}
        >
          <div className="px-8 py-6 flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-lg text-slate-950 hover:text-blue-600 transition-colors duration-300"
                onClick={handleCollapseNavbar}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Web Version */}
      <nav
        className="w-full hidden lg:flex h-24 px-[6.25rem] justify-between items-center fixed top-0 left-0 z-50
    bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg border-b border-slate-300"
      >
        <button className="flex items-center gap-x-2 text-xl text-blue-600">
          <img
            src="https://utfs.io/f/K0kPNXk3jrKMN0skWDZ4xSvAf5KFzoCiMj3PRm27hZ9JDyeu"
            alt="kviz logo"
            className="h-6 w-6"
          />
          <Link to="/" className="font-bold hover:underline">
            kviz.
          </Link>
        </button>
        <ul className="flex items-center gap-x-6">
          {navItems.map((item, idx) => (
            <li
              key={`nav_item_${idx}`}
              className={`text-base text-slate-500 hover:text-slate-950 transition duration-100 ${
                location.pathname === item.path && "font-medium text-slate-950"
              }`}
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <button className="w-[10rem] gap-x-3 text-blue-700 rounded bg-blue-50 px-3 py-2 text-sm border border-blue-700 shadow-md">
          Sign In
        </button>
      </nav>
    </>
  );
};

export default Navbar;
