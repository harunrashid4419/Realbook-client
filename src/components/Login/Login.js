import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UsersContext";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, googleSignUp, restorePassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShawPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // email password login
  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("LogIn Successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  // need email
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  // google sign in
  const handleGoogleSingUp = () => {
    googleSignUp(email)
      .then((result) => {
        const user = result.user;
        console.log(user);
        googleSingInAddDB(user.email, user.displayName);
        toast.success("Google SignUp success");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  // add to database
  const googleSingInAddDB = (email, displayName) => {
    const savedUser = { email, name: displayName };
    fetch("https://real-book-server.vercel.app/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(savedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  // forget password
  const handleForget = () => {
    restorePassword(email)
      .then((result) => {
        toast.success("Please check your email and reset password");
      })
      .catch((error) => {
        setEmail(error.message);
      });
  };

  return (
    <div className="container">
      <div className="login-section">
        <h3 className="text-4xl mb-5 text-center text-lime-500 font-bold">
          Please Login
        </h3>
        <form onSubmit={handleLogIn}>
          <div className="form-control w-full mb-3">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              required
              className="input input-bordered w-full"
              name="email"
              onChange={handleEmail}
            />
          </div>
          <div className="form-control w-full" id="password-field">
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              className="input input-bordered w-full"
              name="password"
              required
            />
            <div onClick={() => setShawPassword(!showPassword)} id="eye-icon">
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <p className="text-red-500 py-3">{error}</p>
          <div className="text-right">
            <Link onClick={handleForget} className="text-green-400">
              Forget Password?
            </Link>
          </div>
          <input
            type="submit"
            value="Login"
            className="w-full mt-5 btn btn-wide"
          />
        </form>
        <div className="flex flex-col w-full border-opacity-50">
          <div className="divider text-white">OR</div>
        </div>
        <div
          onClick={handleGoogleSingUp}
          className="bg-white md:w-4/5 w-full mx-auto py-3 cursor-pointer rounded-3xl"
        >
          <p className="text-center text-xl flex justify-center pl-4">
            Sign In With Google
          </p>
        </div>
        <p className="text-white pt-4 text-center md:text-xl">
          Don't have any account{" "}
          <Link className="text-green-700" to="/signup">
            SignUp
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
