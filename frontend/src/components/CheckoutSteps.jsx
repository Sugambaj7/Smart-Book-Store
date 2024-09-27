import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="w-full h-[10vh] flex">
      <div className="w-[32.5%]">a</div>
      <div className="w-[35%] flex">
        <div className="w-[25%] flex items-center justify-center">
          {step1 ? (
            <Link to="/login">
              <p>Sign in</p>
            </Link>
          ) : (
            <p>Sign in</p>
          )}
        </div>
        <div className="w-[25%] flex items-center justify-center">
          {step2 ? (
            <Link to="/shipping">
              <p>Shipping</p>
            </Link>
          ) : (
            <p>Shipping</p>
          )}
        </div>
        <div className="w-[25%] flex items-center justify-center">
          {step3 ? (
            <Link to="/payment">
              <p>Payment</p>
            </Link>
          ) : (
            <p>Payment</p>
          )}
        </div>
        <div className="w-[25%] flex items-center justify-center">
          {step4 ? (
            <Link to="/placeorder">
              <p>Place Order</p>
            </Link>
          ) : (
            <p>Place Order</p>
          )}
        </div>
      </div>
      <div className="w-[32.5%]"></div>
    </div>
  );
};

export default CheckoutSteps;
