import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";
import { addToCart } from "../features/cart/cartSlice";
import { deleteFromCart } from "../features/cart/cartSlice";

const CartComponent = () => {
  const { product_id } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  console.log(cartItems, "use selector cart");

  useEffect(() => {
    if (product_id) {
      console.log(product_id, qty, "k xa cart ma useEffect");
      dispatch(addToCart({ product_id, qty }));
      if (dispatch) {
        navigate("/cart");
      }
    }
  }, [dispatch, product_id, qty]);

  const deleteHandler = (product_id) => {
    dispatch(deleteFromCart(product_id));
  };

  return (
    <div className="w-full flex mt-8 h-[100vh]">
      <div className="w-[10%]"></div>
      <div className="w-[80%] flex justify-between">
        <div className="w-[60%]">
          <h1 className="text-3xl uppercase p">Shopping Cart</h1>
          <div className="mt-8">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex mt-4 pl-4 w-full border-b border-border_table pb-10"
                >
                  <div className="px-3 w-[20%]">
                    <img
                      src={"http://localhost:5001/" + item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="w-[20%] text-center">{item.name}</div>
                  <div className="w-[20%] text-center">{item.price}</div>
                  <div className="w-[20%] text-center">{item.qty}</div>
                  <div className="w-[20%] text-center">
                    <button
                      className="bg-red-500 px-1 py-1"
                      onClick={() => deleteHandler(item._id)}
                    >
                      <MdOutlineDelete className="text-xl text-white" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="mt-12 text-xl">Your cart is empty!!!</p>
            )}
          </div>
        </div>
        <div className="w-[40%] flex flex-col">
          <div className="w-[70%] border border-border_table self-end">
            <div className="flex flex-col pl-8 border-b border-border_table">
              <h2 className="text-2xl uppercase pt-4">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              <p className="py-3">
                Rs{" "}
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.qty,
                  0
                )}
              </p>
            </div>
            <div className="py-3 px-8">
              <button className="w-full bg-black text-white text-center py-1 uppercase">
                <p className="py-2 text-sm">Proceed to checkout</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[10%]"></div>
    </div>
  );
};

export default CartComponent;
