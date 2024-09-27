import React, { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProductList,
  deleteProduct,
} from "../features/products/productSlice";

const ProductListComponent = () => {
  const dispatch = useDispatch();

  const { products, error, loading, success } = useSelector(
    (state) => state.products
  );

  const deleteHandler = async (product_id) => {
    if (window.confirm("Are you sure")) {
      try {
        await dispatch(deleteProduct(product_id)).unwrap();
        dispatch(fetchProductList());
      } catch (error) {
        console.error("Failed to delete the product: ", error);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  return (
    <div className="flex w-full mt-10 mb-10">
      <div className="w-[15%]"></div>
      <div className="w-[70%]">
        <div className="flex uppercase w-full justify-between mb-3">
          <div>
            <h2 className="text-3xl">Products</h2>
          </div>
          <div>
            <button className="uppercase bg-black text-white px-4 py-2">
              <Link to="/admin/createproduct">Create Product</Link>
            </button>
          </div>
        </div>
        <div className="w-full">
          <table className="bg-table_background w-full border border-border_table">
            <thead className="w-full">
              <tr>
                <th className="w-[5%] px-2 py-3">Id</th>
                <th className="w-[19%] px-2 py-3">Name</th>
                <th className="w-[19%] px-2 py-3">Price</th>
                <th className="w-[19%] px-2 py-3">Category</th>
                <th className="w-[19%] px-2 py-3">Description</th>
                <th className="w-[19%] px-2 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {(products || []).map((product) => (
                <tr key={product._id} className="w-full">
                  <td className="w-[5%]">
                    <p className="text-center px-2 py-3">{product._id}</p>
                  </td>
                  <td className="w-[19%]">
                    <p className="text-center px-2 py-3">{product.name}</p>
                  </td>
                  <td className="w-[19%]">
                    <p className="text-center px-2 py-3">{product.price}</p>
                  </td>
                  <td className="w-[19%]">
                    <p className="text-center px-2 py-3">{product.category}</p>
                  </td>
                  <td className="w-[19%]">
                    <p className="text-center px-2 py-3">
                      {product.description}
                    </p>
                  </td>
                  <td className="w-[19%]">
                    <div className="w-full flex justify-center">
                      <Link to={`/admin/product/edit/${product._id}`}>
                        <button className="bg-white px-1 py-1">
                          <FaRegEdit className="text-xl" />
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 px-1 py-1"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <MdOutlineDelete className="text-xl text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-[15%]"></div>
    </div>
  );
};

export default ProductListComponent;
