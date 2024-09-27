import React, { useState, useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../features/cart/cartSlice";

const PaymentComponent = () => {
  const { paymentMethod, shippingAddress } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const [mypaymentMethod, setMyPaymentMethod] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(mypaymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <div className="w-full flex mt-5 mb-20">
        <div className="w-[30%]"></div>
        <div className="w-[40%] flex justify-center items-center">
          <form onSubmit={submitHandler} className="w-[70%]">
            <h2 className="text-3xl uppercase">Payment Method</h2>
            <div className="flex flex-col mt-8">
              <p className="text-2xl">Select Method</p>
              <div className="mt-3 pl-3">
                <input
                  type="radio"
                  id="paymentmethod"
                  name="paymentMethod"
                  value="Cash On Delivery"
                  checked={mypaymentMethod === "Cash On Delivery"}
                  onChange={(e) => setMyPaymentMethod(e.target.value)}
                  required
                />
                <label htmlFor="paymentmethod" className="pl-4 text-md">
                  Cash On Delivery
                </label>
              </div>
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

export default PaymentComponent;
