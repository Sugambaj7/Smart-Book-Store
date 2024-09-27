import React, { useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../features/order/orderSlice";

const PlaceOrderComponent = () => {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success, myerror } = useSelector((state) => state.order);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 100;
  const taxPrice = Number(0.15 * itemsPrice);
  const totalPrice =
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        user: userInfo,
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  console.log(myerror, "saccahia errorrrr");
  if (success && !myerror) {
    console.log(myerror, "saccahia errorrrr");
    navigate(`/order/${userInfo._id}`);
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="w-full flex mt-5 mb-10">
        <div className="w-[10%]"></div>
        <div className="w-[80%] flex">
          <div className="w-[70%] flex flex-col">
            <div className="w-full flex pr-10">
              <div className="w-[15%]"></div>
              <div className="w-[85%] flex flex-col border-b border-border_table pl-10">
                <h1 className="text-2xl uppercase">shipping</h1>
                <p className="pt-6 pb-4 text-md">
                  Address: {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}
                </p>
              </div>
            </div>
            <div className="w-full flex pr-10">
              <div className="w-[15%]"></div>
              <div className="w-[85%] flex flex-col border-b border-border_table pl-10">
                <h1 className="text-xl uppercase pt-6">payment method</h1>
                <p className="pt-4 pb-4 text-md">
                  Method: {cart.paymentMethod}
                </p>
              </div>
            </div>
            <div className="w-full flex pr-10">
              <div className="w-[15%]"></div>
              <div className="w-[85%] flex flex-col">
                <div className="w-full pl-10">
                  <h1 className="text-xl uppercase pt-12">Order Items</h1>
                </div>
                <div className="w-full flex pl-10 pt-5">
                  <div className="w-full">
                    {cart.cartItems.length === 0 ? (
                      <p>Your Cart is Empty!!!</p>
                    ) : (
                      cart.cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex pb-8 border-b border-border_table mt-3"
                        >
                          <div className="w-[20%] h-[10vh] flex justify-center items-center">
                            <img
                              src={"http://localhost:5001/" + item.image}
                              alt={item.name}
                              className="h-full w-full"
                            />
                          </div>
                          <div className="w-[60%] flex justify-center items-center">
                            {item.name}
                          </div>
                          <div className="w-[20%] flex justify-center items-center">
                            {item.qty} * {item.price} = Rs{" "}
                            {item.qty * item.price}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[30%] border border-border_table flex-col">
            <div className="border-b border-border_table flex justify-center items-start">
              <p className="text-xl uppercase py-4">Order Summary</p>
            </div>
            <div className="border-b border-border_table">
              <div className="flex justify-between px-8 py-2">
                <h4 className="text-md">Items</h4>
                <p>Rs {itemsPrice}</p>
              </div>
            </div>
            <div className="border-b border-border_table">
              <div className="flex justify-between px-8 py-2">
                <h4 className="text-md">Shipping</h4>
                <p>Rs {shippingPrice}</p>
              </div>
            </div>
            <div className="border-b border-border_table">
              <div className="flex justify-between px-8 py-2">
                <h4 className="text-md">Tax</h4>
                <p>Rs {taxPrice}</p>
              </div>
            </div>
            <div className="border-b border-border_table">
              <div className="flex justify-between px-8 py-2">
                <h4 className="text-md">Total</h4>
                <p>Rs {totalPrice}</p>
              </div>
            </div>
            <div className="border-b border-border_table">
              <p className="text-red-500">{myerror}</p>
            </div>
            <div className="text-center">
              <div className="px-2 py-4">
                <button
                  className="bg-black text-white uppercase w-full p-4"
                  disabled={cart.cartItems.length === 0 && myerror}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[10%]"></div>
      </div>
    </>
  );
};

export default PlaceOrderComponent;
