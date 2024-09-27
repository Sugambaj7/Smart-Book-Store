import React from "react";
import { useEffect } from "react";
import { listMyRecentOrders } from "../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearMyCart } from "../features/cart/cartSlice";
import { recommendProducts } from "../features/products/productSlice";
import ProductCardComponent from "./ProductCardComponent";
// import { changePlaceOrderStatus } from "../features/order/orderSlice";



const OrderViewComponent = () => {
  const dispatch = useDispatch();

  const user_id = useParams();

  const { createdOrder, loading, myerror, success } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    // dispatch(changePlaceOrderStatus());
    dispatch(listMyRecentOrders(user_id));
    dispatch(clearMyCart());
    //sorted in ascending order
    dispatch(recommendProducts());
    console.log(user_id, "user_id ma k aaako xa order view component");
    dispatch(recommendPersonalizedProducts(user_id));
  }, [success, dispatch, user_id]);

  const { userInfo } = useSelector((state) => state.userLogin);

  //sortedProducts
  const { products } = useSelector((state) => state.products);

  const itemsPrice = createdOrder?.orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  return (
    <>
      <div className="w-full flex mt-5 mb-10">
        <div className="w-[10%]"></div>
        {/* <div className="w-[80%] flex"> */}
        <div className="w-[60%] flex flex-col">
          <div className="w-full flex pr-10">
            <div className="w-[15%]"></div>
            <div className="w-[85%] flex flex-col  border-b border-border_table pl-10">
              <h1 className="text-2xl uppercase">
                order id {createdOrder?._id}
              </h1>
              <p className="text-xl text-black mt-4">Shipping</p>
              <p className="pt-6 pb-4 text-md">Name: {userInfo.name}</p>
              <p className="pt-6 pb-4 text-md">Email: {userInfo.email}</p>
              <p className="pt-6 pb-4 text-md">
                Address: {createdOrder?.shippingAddress.address},{" "}
                {createdOrder?.shippingAddress.city}
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
                  {createdOrder?.orderItems.map((item) => (
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
        <div className="w-[20%] h-[40vh] border border-border_table flex-col">
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
              <p>Rs {createdOrder?.shippingPrice}</p>
            </div>
          </div>
          <div className="border-b border-border_table">
            <div className="flex justify-between px-8 py-2">
              <h4 className="text-md">Tax</h4>
              <p>Rs {createdOrder?.taxPrice}</p>
            </div>
          </div>
          <div className="border-b border-border_table">
            <div className="flex justify-between px-8 py-2">
              <h4 className="text-md">Total</h4>
              <p>Rs {createdOrder?.totalPrice}</p>
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
      <div className="flex">
        <div className="w-[15%]"></div>
        <div className="w-[70%] flex flex-col">
          <h2 className="text-3xl text-black">You May Also Like</h2>
          <ProductCardComponent />
        </div>
        <div className="w-[15%]"></div>
      </div>
      <div className="flex bg-red-500">
        <div className="w-[15%]"></div>
        <div className="w-[70%] flex flex-col">
          <h2 className="text-3xl text-black">Personalized Recommendations</h2>
        </div>
        <div className="w-[15%]"></div>
      </div>
    </>
  );
};

export default OrderViewComponent;
