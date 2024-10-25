import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo-admin.png";
import axios from "axios";
import { PAGES, ROLES } from "../../utils/constants";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const menuRef = useRef(null);
  const [page, setPage] = useState(PAGES.DASHBOARD);

  const { user, setUser } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios
        .get(process.env.REACT_APP_URL + "/admin/dashboard/profile", {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
      if (!data) {
        return;
      }
      setProfile(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <div>
      <nav className="bg-gray-900">
        <div className="mx-auto max-w-full w-[1156px]">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div>
                <img className="h-6" src={logo} alt="Your Company" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    to="/admin/dashboard"
                    onClick={() => setPage(PAGES.DASHBOARD)}
                    className={({ isActive }) =>
                      isActive
                        ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/admin/tours"
                    onClick={() => setPage(PAGES.TOUR)}
                    className={({ isActive }) =>
                      isActive
                        ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    Tour
                  </NavLink>
                  <NavLink
                    to="/admin/bookings"
                    onClick={() => setPage(PAGES.BOOKING)}
                    className={({ isActive }) =>
                      isActive
                        ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    Booking
                  </NavLink>
                  {user && user.role == ROLES.S_ADMIN && (
                    <NavLink
                      to="/admin/accounts"
                      onClick={() => setPage(PAGES.ACCOUNT)}
                      className={({ isActive }) =>
                        isActive
                          ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                          : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    >
                      Account
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="text-gray-300 text-sm">
                  Xin chào{" "}
                  <span className="font-bold">
                    {profile ? profile.username : ""}
                  </span>
                </div>
                <div className="relative ml-3">
                  <button
                    type="button"
                    className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={toggleMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                  {isMenuOpen && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <span
                        onClick={async() => {
                          await axios.delete(
                            `${process.env.REACT_APP_URL}/admin/auth/logout`
                          );
                          setUser(null)
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        role="menuitem"
                        tabIndex="-1"
                      >
                        Sign out
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className="-mr-2 flex md:hidden">
          {/* Mobile button code here */}
        </div>
      </nav>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-full w-[1156px] py-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {page}
          </h1>
        </div>
      </header>
    </div>
  );
};

export default Header;
