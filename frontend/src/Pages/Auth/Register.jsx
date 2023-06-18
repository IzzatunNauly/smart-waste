import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {AiOutlineMail} from 'react-icons/ai'
import {BsKey, BsPerson} from 'react-icons/bs'


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/api/auth/register", data)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   const session = JSON.parse(localStorage.getItem("session"));

  //   if (session) {
  //     if (session.expiry > Date.now()) {
  //       localStorage.removeItem("session");
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("user");
  //       navigate("/");
  //     } else {
  //       navigate("/dashboard");
  //     }
  //   }
  // }, []);

  return (
    <div className="d-flex justify-content-center text-center">
      <div id="auth">
        <div className="row h-100">
          <div className="col-12">
            <div id="auth-left">
              <div className="auth-logo">
                <div className="d-flex align-items-center justify-content-center">
                  <svg
                    width="100px"
                    height="100px"
                    viewBox="0 0 1024 1024"
                    className="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M460.8 166.4h179.2v76.8H460.8z" fill="#EEBE00" />
                    <path
                      d="M652.8 256H448v-102.4h204.8v102.4z m-179.2-25.6h153.6v-51.2H473.6v51.2z"
                      fill="#231C1C"
                    />
                    <path
                      d="M793.6 844.8c0 42.24-21.76 51.2-64 51.2H371.2c-42.24 0-64-8.96-64-51.2V256c0-42.24 34.56-38.4 76.8-38.4h332.8c42.24 0 76.8-3.84 76.8 38.4v588.8z"
                      fill="#6FB0BE"
                    />
                    <path
                      d="M729.6 908.8H371.2c-39.68 0-76.8-7.68-76.8-64V256c0-16.64 3.84-28.16 12.8-37.12 15.36-15.36 38.4-15.36 66.56-14.08h353.28c28.16 0 51.2 0 66.56 14.08 8.96 8.96 12.8 20.48 12.8 37.12v588.8c0 56.32-37.12 64-76.8 64zM364.8 230.4c-17.92 0-33.28 1.28-39.68 7.68-3.84 2.56-5.12 8.96-5.12 17.92v588.8c0 30.72 10.24 38.4 51.2 38.4h358.4c40.96 0 51.2-7.68 51.2-38.4V256c0-8.96-1.28-15.36-5.12-17.92-7.68-7.68-28.16-7.68-48.64-7.68H364.8z"
                      fill="#231C1C"
                    />
                    <path d="M268.8 217.6h563.2v12.8H268.8z" fill="#EEBE00" />
                    <path
                      d="M256 204.8h588.8v38.4H256zM409.6 409.6h25.6v345.6h-25.6z"
                      fill="#231C1C"
                    />
                    <path d="M537.6 384h25.6v384h-25.6z" fill="#231C1C" />
                    <path d="M678.4 409.6h25.6v345.6h-25.6z" fill="#231C1C" />
                    <path d="M307.2 294.4h486.4v25.6H307.2z" fill="#231C1C" />
                  </svg>
                  <span className="logo-name ms-2 text-black text-center fs-1">
                    Smart Waste
                  </span>
                </div>
              </div>
              <h1 className="auth-title">Sign Up</h1>
              <p className="auth-subtitle mb-5">
                Input your data to register to our website.
              </p>
              <form action="index.html">
                <div className="form-group position-relative has-icon-left mb-4">
                  <input
                    type="text"
                    className="form-control form-control-xl"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="form-control-icon">
                    <AiOutlineMail />
                  </div>
                </div>
                <div className="form-group position-relative has-icon-left mb-4">
                  <input
                    type="text"
                    className="form-control form-control-xl"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="form-control-icon">
                    <BsPerson />
                  </div>
                </div>
                <div className="form-group position-relative has-icon-left mb-4">
                  <input
                    type="password"
                    className="form-control form-control-xl"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="form-control-icon">
                    <BsKey />
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                >
                  Sign Up
                </button>
              </form>
              <div className="text-center mt-5 text-lg fs-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link to="/" className="font-bold">
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
