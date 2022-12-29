import { Link} from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../Redux/features/userSlice";

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const dispatch=useDispatch()
    const handleLogOut = () => {
    dispatch(setUserEmail(''))
      logOut();
    };
  const menuOptions = (
    <>
      <li className="font-semibold ">
        <Link to="/" className="lg:text-white">
          HOME
        </Link>
        <Link to="/writeDiary" className="lg:text-white">
          WRITE DIARY
        </Link>
        <Link to="/myDiary" className="lg:text-white">
          MY DIARY
        </Link>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 bg-opacity-20">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuOptions}
            </ul>
          </div>
          <Link to="/">
            <div className="flex flex-col items-center">
              <h2 className="font-extrabold text-4xl font-Passions text-primary">
                Day Diary
              </h2>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menuOptions}</ul>
        </div>
        <div className="navbar-end">
          {user?.uid ? (
            <>
              <div className="hidden lg:block font-semibold mr-3">
                <p>{user?.displayName}</p>
              </div>
              <Link
                className="btn btn-sm text-bold bg-red-400 text-white rounded-xs border-none"
                onClick={handleLogOut}
                to="/login"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm text-bold bg-red-400 text-white rounded-xs border-none"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
