import React, { useState } from "react";
import {
  createProduct,
  updateSuccess,
} from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

const CreateProductComponent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleFocus = () => {
    dispatch(updateSuccess());
  };

  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.productCreate);
  // console.log(userInfo, "ko login xa tw");

  const validate = () => {
    if (name === "") {
      setError("Product Name is not supposed to be empty");
      return false;
    } else if (!/^[a-zA-Z\s]*$/g.test(name)) {
      setError("Invalid characters in product name");
      return false;
    } else if (isNaN(price) || price <= 0) {
      setError("Price must be a positive number");
      return false;
    } else if (category === "") {
      setError("Category is not supposed to be empty");
      return false;
    } else if (!/^[a-zA-Z\s]*$/g.test(category)) {
      setError("Category must contain only alphabetic characters");
      return false;
    } else if (isNaN(countInStock) || countInStock <= 0) {
      setError("Count in stock must be a positive number");
      return false;
    } else if (description === "") {
      setError("Description is not supposed to be empty");
      return false;
    } else if (!/^[a-zA-Z\s]*$/g.test(description)) {
      setError("Description must contain only alphabetic characters");
      return false;
    } else if (!image) {
      setError("Image is not supposed to be empty");
      return false;
    } else if (!/\.(png|jpg|jpeg)$/i.test(image.name)) {
      setError("Image must be a .png, .jpg, or .jpeg file");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(image, "k xa image ma");
    if (validate()) {
      dispatch(
        createProduct({
          name,
          price,
          image,
          category,
          description,
          countInStock,
          user: userInfo._id,
        })
      );
    }
  };

  return (
    <div className="flex w-full mt-10 mb-10">
      <div className="w-[30%]"></div>
      <div className="w-[30%]">
        <form action="" onSubmit={submitHandler}>
          <h2 className="text-3xl">Create Product</h2>

          {success && (
            <div className="w-full bg-custom_green px-6 py-3 border border-custom_alert rounded mt-8">
              <p className="text-white text-sm tracking-wide">
                Product created successfully
              </p>
            </div>
          )}

          {error && (
            <div className="w-full bg-custom_alert px-6 py-3 border border-custom_alert rounded mt-8">
              <p className="text-alert_red text-sm tracking-wide">{error}</p>
            </div>
          )}

          <div className="flex flex-col mt-8">
            <label htmlFor="" className="text-md">
              Name
            </label>
            <input
              className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="" className="text-md">
              Price
            </label>
            <input
              className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
              type="text"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="" className="text-md">
              Image
            </label>
            <input
              type="text"
              className="bg-custom_white px-6 py-2"
              placeholder="image url"
              disabled
            />
            <input
              className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
              type="file"
              placeholder="0"
              onChange={(e) => setImage(e.target.files[0])}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="" className="text-md">
              Count In Stock
            </label>
            <input
              className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
              type="text"
              placeholder="0"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="" className="text-md">
              Category
            </label>
            <input
              className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
              type="text"
              placeholder="Sample category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="" className="text-md">
              Description
            </label>
            <input
              className="mt-2 px-6 py-2 outline-none bg-custom_white border focus:border-2 border-border_login_input"
              type="Sample Description"
              placeholder="0"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div className="flex flex-col w-[20%] bg-black text-white mt-4">
            <input
              className="px-4 py-3 cursor-pointer"
              type="submit"
              value="Create"
            />
          </div>
        </form>
      </div>
      <div className="w-[40%]"></div>
    </div>
  );
};

export default CreateProductComponent;
