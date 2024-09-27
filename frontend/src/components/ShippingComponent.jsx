import React, { useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const ShippingComponent = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [name, setName] = useState(shippingAddress.name);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [phone, setPhone] = useState(shippingAddress.phone);

  console.log(cart, "ma shipping bata");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ name, address, city, phone }));
    navigate("/payment");
  };
  return (
    <>
      <CheckoutSteps step1 step2 />
      <div className="w-full flex mt-5 mb-20">
        <div className="w-[30%]"></div>
        <div className="w-[40%] flex justify-center items-center">
          <form action="" onSubmit={submitHandler} className="w-[70%]">
            <h2 className="text-3xl">Shipping</h2>
            <div className="flex flex-col mt-8">
              <label htmlFor="name">Name</label>
              <input
                className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
                type="text"
                placeholder="Enter name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="city">City</label>
              <input
                className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
                type="text"
                placeholder="Enter city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="phone">Phone no.</label>
              <input
                className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
                type="text"
                placeholder="Enter phone no."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="address">Address</label>
              <input
                className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col w-[20%] bg-black text-white mt-6">
              <input
                className="px-4 py-3 cursor-pointer"
                type="submit"
                value="Continue"
              />
            </div>
          </form>
        </div>
        <div className="w-[30%]"></div>
      </div>
    </>
  );
};

export default ShippingComponent;
