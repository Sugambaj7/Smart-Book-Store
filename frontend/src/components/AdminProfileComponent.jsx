import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserEmailAndPassword,
  clearError,
  clearUpdateSuccess,
} from "../features/user/userUpdateSlice";

const AdminProfileComponent = () => {
  const { myerror, success, userInfo } = useSelector(
    (state) => state.userLogin
  );
  const { loading, myerrorUpdate, updateSuccess } = useSelector(
    (state) => state.userUpdate
  );

  const userId = userInfo._id;

  useEffect(() => {
    dispatch(clearUpdateSuccess());
  }, []);

  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleFocus = () => {
    dispatch(clearError());
    dispatch(clearUpdateSuccess());
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        updateUserEmailAndPassword({ userId, email, password, confirmPassword })
      );

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="flex mt-20 mb-20">
      <div className="w-[20%]"></div>
      <div className="w-[60%] flex justify-center items-center">
        <div className="w-[50%]">
          <form action="" onSubmit={submitHandler}>
            <h2 className="text-3xl">ADMIN PROFILE</h2>
            {updateSuccess && (
              <div className="w-full bg-custom_green px-6 py-3 border border-custom_alert rounded mt-8">
                <p className="text-white text-sm tracking-wide">
                  Admin Update Successful!!!
                </p>
              </div>
            )}
            {myerrorUpdate !== null ? (
              <div className="w-full bg-custom_alert px-6 py-3 border border-custom_alert rounded mt-8">
                <p className="text-alert_red text-sm tracking-wide">
                  {myerrorUpdate}
                </p>
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
              <label htmlFor="">New Password</label>
              <input
                className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleFocus}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="">Confirm Password</label>
              <input
                className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
                type="password"
                placeholder="Retype your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={handleFocus}
              />
            </div>
            <div className="flex flex-col w-[20%] bg-black text-white mt-4">
              <input
                className="px-4 py-3 cursor-pointer"
                type="submit"
                value="Update"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="w-[20%]"></div>
    </div>
  );
};

export default AdminProfileComponent;
