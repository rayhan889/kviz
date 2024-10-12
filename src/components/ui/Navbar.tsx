import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
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

  return (
    <nav
      className="w-full flex h-24 px-[6.25rem] justify-between items-center fixed top-0 left-0 z-50
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
  );
};

export default Navbar;
