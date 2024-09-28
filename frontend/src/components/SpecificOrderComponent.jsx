import React from "react";
import { useSelector } from "react-redux";

const SpecificOrderComponent = () => {
  const { specificOrder } = useSelector((state) => state.order);
  return (
    <div className="w-full flex mt-5 mb-10">
      <div className="w-[10%]"></div>
      {/* <div className="w-[80%] flex"> */}
      <div className="w-[60%] flex flex-col">
        <div className="w-full flex pr-10">
          <div className="w-[15%]"></div>
          <div className="w-[85%] flex flex-col  border-b border-border_table pl-10">
            <h1 className="text-2xl uppercase">order id {specificOrder._id}</h1>
            <p className="text-xl text-black mt-4">Shipping</p>
            <p className="pt-3 pb-0 text-md">
              address: {specificOrder.shippingAddress.city},
              {specificOrder.shippingAddress.address}
            </p>
            <p className="pt-3 pb-4 text-md">
              phone: {specificOrder.shippingAddress.phone}
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
                {specificOrder?.orderItems.map((item) => (
                  <div className="flex pb-8 border-b border-border_table mt-3">
                    <div className="w-[20%] h-[10vh] flex justify-center items-center">
                      <img
                        src={"http://localhost:5001/" + item.image}
                        alt={item.name}
                        className="h-full w-full"
                        srcset=""
                      />
                    </div>
                    <div className="w-[60%] flex justify-center items-center">
                      {item.name}
                    </div>
                    <div className="w-[20%] flex justify-center items-center">
                      {item.qty} * {item.price} = Rs {item.qty * item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[20%] h-[35vh] border border-border_table flex-col">
        <div className="border-b border-border_table flex justify-center items-start">
          <p className="text-xl uppercase py-4">Order Summary</p>
        </div>
        <div className="border-b border-border_table">
          <div className="flex justify-between px-8 py-2">
            <h4 className="text-md">Shipping</h4>
            <p>Rs {specificOrder.shippingPrice}</p>
          </div>
        </div>
        <div className="border-b border-border_table">
          <div className="flex justify-between px-8 py-2">
            <h4 className="text-md">Tax</h4>
            <p>Rs {specificOrder.taxPrice}</p>
          </div>
        </div>
        <div className="border-b border-border_table">
          <div className="flex justify-between px-8 py-2">
            <h4 className="text-md">Total</h4>
            <p>Rs {specificOrder.totalPrice}</p>
          </div>
        </div>
        <div className="border-b border-border_table">
          <div className="flex justify-between px-8  py-2">
            <h4 className="text-md">Delivery Guy Detail</h4>
            <p>9860130176</p>
          </div>
        </div>
        <div className="flex justify-center items-center px-8  py-2">
          <div>
            <p>Only Accept cash on delivery</p>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="w-[10%]"></div>
    </div>
  );
};

export default SpecificOrderComponent;
