import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, clearError } from "../features/user/userLoginSlice";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { myerror, success, userInfo } = useSelector(
    (state) => state.userLogin
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const handleFocus = () => {
    dispatch(clearError());
  };

  const validate = () => {
    if (email === "") {
      setError("Email is not supposed to be empty");
      return false;
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email)
    ) {
      setError("Invalid Email");
      return false;
    } else if (password === "") {
      setError("Password is not supposed to be empty");
      return false;
    } else if (password.length < 8) {
      setError("Password should be at least 8 characters long");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(userLogin({ email, password }));

      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-full flex justify-between mt-10 mb-36">
      <div></div>
      <div className="h-full w-[35%]">
        <form action="" onSubmit={submitHandler}>
          <h2 className="text-3xl">SIGN IN</h2>
          {myerror !== null ? (
            <div className="w-full bg-custom_alert px-6 py-3 border border-custom_alert rounded mt-8">
              <p className="text-alert_red text-sm tracking-wide">{myerror}</p>
            </div>
          ) : null}
          {error && (
            <div className="w-full bg-custom_alert px-6 py-3 border border-custom_alert rounded mt-8">
              <p className="text-alert_red text-sm tracking-wide">{error}</p>
            </div>
          )}
          <div className="flex flex-col mt-8">
            <label htmlFor="">Email Address</label>
            <input
              className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="">Password</label>
            <input
              className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col w-[20%] bg-black text-white mt-4">
            <input
              className="px-4 py-3 cursor-pointer"
              type="submit"
              value="Sign In"
            />
          </div>
          <div className="mt-4">
            <p>
              New Customer?{" "}
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default LoginComponent;
