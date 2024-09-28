import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderByUserId } from "../features/order/orderSlice";
import { getOrderById } from "../features/order/orderSlice";
import { useNavigate } from "react-router-dom";

const MyOrdersComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useParams();
  useEffect(() => {
    // console.log("user_id", user_id);
    dispatch(getOrderByUserId({user_id} ));
  }, [dispatch]);

  const { allMyOrders } = useSelector((state) => state.order);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleGetDetails = (order_id) => {
    dispatch(getOrderById(order_id)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        navigate(`/view_my_specific_order/${order_id}`);
      } else {
        console.error("Failed to get order details");
      }
    });
  };

  return (
    <>
      <div className="flex w-full">
        <div className="w-[15%]"></div>
        <div className="w-[70%] flex flex-col uppercase justify-between mb-3">
          <h2 className="text-3xl mt-10">My Orders</h2>

          <div className="w-full mt-6 mb-10">
            <table className="bg-table_background w-full border border-border_table">
              <thead className="w-full">
                <tr className="w-full">
                  <th className="w-[25%] py-2 ">Order Id</th>
                  {/* <th className="w-[13%] py-2">User Name</th> */}
                  <th className="w-[20%] py-2">Date</th>
                  <th className="w-[13%] py-2">Total</th>
                  <th className="w-[10%] py-2">Paid</th>
                  <th className="w-[16%] py-2">Status</th>
                  <th className="w-[16%] py-2">Details</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {(allMyOrders || []).map((order) => {
                  return (
                    <tr
                      key={order._id}
                      className="w-full border border-border_table"
                    >
                      <td className="w-[25%] py-1 ">
                        <p className="text-center py-4 px-10">{order._id}</p>
                      </td>

                      <td className="w-[20%] py-1">
                        <p className="text-center py-4">
                          {formatDate(order.createdAt)}
                        </p>
                      </td>
                      <td className="w-[13%] py-1">
                        <p className="text-center py-4">
                          Rs {order.totalPrice}
                        </p>
                      </td>
                      <td className="w-[10%] py-1">
                        <div className="w-full flex justify-between">
                          <div className="w-[20%]"></div>
                          <div className="w-[60%]">
                            <p className="text-center px-2 py-4">
                              {order.isPaid ? "Paid" : "Not Paid"}
                            </p>
                          </div>
                          <div className="w-[20%]"></div>
                        </div>
                      </td>
                      <td className="w-[16%] py-1">
                        <p className="text-center px-2 py-4">
                          {order.isDelivered ? "Delivered" : "Processing"}
                        </p>
                      </td>
                      <td className="w-[16%] py-1">
                        <div className="w-full flex justify-center">
                          <button
                            className="px-3 py-2 bg-black"
                            onClick={() => handleGetDetails(order._id)}
                          >
                            <p className="text-white">Details</p>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[15%]"></div>
      </div>
    </>
  );
};

export default MyOrdersComponent;
