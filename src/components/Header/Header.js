import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo-primary.png";
import { AuthContext } from "../../context/Auth";
import avtTest from "../../assets/images/user.webp";
import { MdMenu } from "react-icons/md";
import axios from "axios";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { user, logoutUser } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/auth/logout`);
      if (res.status === 200) {
        logoutUser();
        navigate("/");
      }
    } catch (error) {
      alert('Đã xảy ra lỗi')
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className="flex justify-between items-center w-[1156px] font-semibold">
        <Link to={"/"}>
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <button className={styles.menuButton} onClick={toggleMenu}>
          <MdMenu className="md:text-3xl text-2xl" />
        </button>
        <div className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `${
                isActive
                  ? `${styles.activeLink}`
                  : `${styles.navLink} hover:text-red-500`
              }`
            }
          >
            Trang chủ
          </NavLink>
          {/* <NavLink to={'/tour'} className={({ isActive }) => (isActive ? styles.activeLink : styles.navLink)}> */}
          {/* About
                        <ul className={styles.navLink_items}>
                        <li className={styles.navLink_item}>OverView</li>
                        <li className={styles.navLink_item}>Our team</li>
                        <li className={styles.navLink_item}>History</li>
                        </ul> */}
          {/* </NavLink> */}
          <NavLink
            to={"/tour"}
            className={({ isActive }) =>
              `${
                isActive
                  ? `${styles.activeLink}`
                  : `${styles.navLink} hover:text-red-500`
              }`
            }
          >
            Tour
          </NavLink>
          {/* <NavLink
            to={"/destinations"}
            className={({ isActive }) =>
              `${
                isActive
                  ? `${styles.activeLink}`
                  : `${styles.navLink} hover:text-red-500`
              }`
            }
          >
            Điểm đến
          </NavLink> */}

          {/* <a href="/admin/dashboard">Admin</a> */}
          {user ? (
            <>
              <NavLink
                to={"/history"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? `${styles.activeLink}`
                      : `${styles.navLink} hover:text-red-500`
                  }`
                }
              >
                Booking
              </NavLink>
              <NavLink
                to={"/favorite"}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
              >
                Favorite
              </NavLink>
              <div className="group relative">
                <div className="flex items-center">
                  <img
                    className="w-6 h-6 rounded-full mr-2"
                    src={avtTest}
                    alt="avt"
                  />
                  <p>{user?.username}</p>
                </div>
                <div className="group-hover:block hidden bg-white shadow-2xl w-[100px] rounded-md border absolute top-full right-0 overflow-hidden">
                  <button
                    className="hover:bg-gray-200 px-1 blocl w-full text-left"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
              >
                Đăng nhập
              </NavLink>

              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
              >
                Đăng ký
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
