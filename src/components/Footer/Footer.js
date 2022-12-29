import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { AuthContext } from "../../context/UsersContext";
import { toast } from "react-hot-toast";

const Footer = () => {
  const { user, logOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Successfully LogOut");
        navigate("/login");
      })
      .catch(() => {});
  };

  return (
    <div className="bg-base-200 p-10 bg-black">
      <footer className="footer footer-center container text-base-content rounded">
        <div className="grid grid-flow-col gap-4">
          <Link className="text-white" to="/">
            Home
          </Link>
          <Link className="text-white" to="/media">
            Media
          </Link>
          <Link className="text-white" to="/about">
            About
          </Link>
          {user ? (
            <Link onClick={handleSignOut} className="text-white">
              LogOut
            </Link>
          ) : (
            <Link className="text-white" to="/login">
              Login
            </Link>
          )}
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://www.facebook.com/mdharun.orrashid.79827"
              target="_blank"
            >
              <FaFacebookF className="text-white text-2xl hover:text-green-600" />
            </a>
            <a
              href="https://www.linkedin.com/in/md-harun-or-rashid2/"
              target="_blank"
            >
              <FaLinkedin className="text-white text-2xl hover:text-green-600" />
            </a>
            <Link>
              <FaYoutube className="text-white text-2xl hover:text-green-600" />
            </Link>
            <Link>
              <FaWhatsapp className="text-white text-2xl hover:text-green-600" />
            </Link>
          </div>
        </div>
        <div>
          <p className="text-white">
            Copyright © 2022 - All right reserved by ACME Industries Ltd
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
