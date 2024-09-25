import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userRegister,
  clearError,
  updateSuccess,
} from "../features/user/userRegisterSlice";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { loading, myerror, success } = useSelector(
    (state) => state.userRegister
  );

  const validate = () => {
    if (name === "") {
      setError("Username is not supposed to be empty");
      return false;
    } else if (!/^[a-zA-Z]*$/g.test(name)) {
      setError("Invalid characters in username");
      return false;
    } else if (name.length < 8) {
      setError("Username should be at least 8 characters long");
      return false;
    } else if (email === "") {
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
    } else if (confirmPassword === "") {
      setError("Confirm Password is not supposed to be empty");
      return false;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const dispatch = useDispatch();

  const handleFocus = () => {
    dispatch(clearError());
    dispatch(updateSuccess());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(userRegister({ name, email, password, confirmPassword }));

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="w-full flex justify-between mt-10 mb-24">
      <div></div>
      <div className="h-full w-[35%]">
        <form action="" onSubmit={submitHandler}>
          <h2 className="text-3xl">SIGN UP</h2>
          {myerror !== null ? (
            <div className="w-full bg-custom_alert px-6 py-3 border border-custom_alert rounded mt-8">
              <p className="text-alert_red text-sm tracking-wide">{myerror}</p>
            </div>
          ) : null}
          {success && (
            <div className="w-full bg-custom_green px-6 py-3 border border-custom_alert rounded mt-8">
              <p className="text-white text-sm tracking-wide">
                Registration Successfull!!!
              </p>
            </div>
          )}
          {error && (
            <div className="w-full bg-custom_alert px-6 py-3 border border-custom_alert rounded mt-8">
              <p className="text-alert_red text-sm tracking-wide">{error}</p>
            </div>
          )}

          <div className="flex flex-col mt-4">
            <label htmlFor="name">Name</label>
            <input
              className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
              type="text"
              placeholder="Enter name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="email">Email Address</label>
            <input
              className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
              type="text"
              placeholder="Enter email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="password">Password</label>
            <input
              className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col w-[20%] bg-black text-white mt-4">
            <input
              className="px-4 py-3 cursor-pointer"
              type="submit"
              value="Register"
            />
          </div>
          <div className="mt-4">
            <p>
              Have an Account?
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default RegisterComponent;
