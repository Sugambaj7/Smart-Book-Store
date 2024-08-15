import React from "react";

const CategoryComponent = () => {
  return (
    <div className="h-full w-full p-11 flex flex-col">
      <div className="w-full text-center mb-8">
        <h3 className="text-h2">Categories</h3>
      </div>
      <div className="flex justify-center flex-wrap">
        <div className="px-14 py-10 bg-pink-500 m-1">
          <p className="text-white text-xl">Fiction</p>
        </div>
        <div className="px-14 py-10 bg-red-500 m-1">
          <p className="text-white text-xl">Thriller</p>
        </div>
        <div className="px-14 py-10 bg-yellow-500 m-1">
          <p className="text-white text-xl">Tech</p>
        </div>
        <div className="px-14 py-10 bg-green-500 m-1">
          <p className="text-white text-xl">Philosophy</p>
        </div>
        <div className="px-14 py-10 bg-green-500 m-1">
          <p className="text-white text-xl">Philosophy</p>
        </div>
        <div className="px-14 py-10 bg-green-500 m-1">
          <p className="text-white text-xl">Philosophy</p>
        </div>
        <div className="px-14 py-10 bg-green-500 m-1">
          <p className="text-white text-xl">Philosophy</p>
        </div>
        <div className="px-14 py-10 bg-green-500 m-1">
          <p className="text-white text-xl">Romance</p>
        </div>
        <div className="px-14 py-10 bg-green-500 m-1">
          <p className="text-white text-xl">Manga</p>
        </div>
      </div>
      <div className="w-full text-center mt-8">
        <button className="bg-red-500 px-4 py-2 rounded">
          <p className="text-white">Explore All</p>
        </button>
      </div>
    </div>
  );
};

export default CategoryComponent;
