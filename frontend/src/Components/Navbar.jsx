import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import {BsKey} from 'react-icons/bs'

const Navbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar p-2 bg-white border">
      {/* Navbar content */}
      <button className="navbar-toggler" onClick={toggleSidebar}>
        <RxHamburgerMenu />
      </button>
      <div className="dropdown px-5">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {user.name}
        </button>

        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item " to={`/profile/${user.id}`}>
              <div className="d-flex align-items-center">
                <CgProfile
                  style={{ marginRight: "0.5rem" }}
                />
                <span style={{ lineHeight: "1" }}>Profile</span>
              </div>
            </Link>
          </li>
          <li>
            <Link className="dropdown-item " to={`/update-password/${user.id}`}>
              <div className="d-flex align-items-center">
                <BsKey
                  style={{ marginRight: "0.5rem" }}
                />
                <span style={{ lineHeight: "1" }}>Password</span>
              </div>
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button onClick={handleLogout} className="dropdown-item" href="#">
              <div className="d-flex align-items-center">
                <BiLogOut
                  style={{ marginRight: "0.5rem" }}
                />
                <span style={{ lineHeight: "1" }}>Logout</span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
