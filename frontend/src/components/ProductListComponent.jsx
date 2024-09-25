import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ProductListComponent = () => {
  return (
    <div className="flex w-full mt-10 mb-10">
      <div className="w-[20%]"></div>
      <div className="w-[60%]">
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
              <th className="w-[5%] px-2 py-3">Id</th>
              <th classname="w-[19%] px-2 py-3">Name</th>
              <th classname="w-[19%] px-2 py-3">Price</th>
              <th classname="w-[19%] px-2 py-3">Category</th>
              <th classname="w-[19%] px-2 py-3">Genre</th>
              <th classname="w-[19%] px-2 py-3">Actions</th>
            </thead>
            <tbody className="w-full">
              <tr className="w-full">
                <td className="w-[5%]">
                  <p className="text-center">1</p>
                </td>
                <td classname="w-[19%]">
                  <p className="text-center px-2 py-3">Product 1</p>
                </td>
                <td classname="w-[19%]">
                  <p className="text-center px-2 py-3">100</p>
                </td>
                <td classname="w-[19%]">
                  <p className="text-center px-2 py-3">Category 1</p>
                </td>
                <td classname="w-[19%]">
                  <p className="text-center px-2 py-3">Genre 1</p>
                </td>
                <td classname="w-[19%]">
                  <div className="w-full flex justify-center">
                    <button className="bg-white px-1 py-1">
                      <FaRegEdit className="text-xl" />
                    </button>
                    <button className="bg-red-500 px-1 py-1">
                      <MdOutlineDelete className="text-xl text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-[20%]"></div>
    </div>
  );
};

export default ProductListComponent;
