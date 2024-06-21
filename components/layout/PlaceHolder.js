import React from "react";

const PlaceHolder = ({ allProducts }) => {
  return (
    <>
      <div
        className={
          allProducts
            ? "border p-3 rounded-xl bg-white"
            : " carousel-item  flex flex-col w-[120px] md:w-[200px] p-2"
        }
      >
        <div
          className={
            allProducts
              ? "mx-1 w-[100%] mb-4 lg:h-[145px] h-[100px] md:h-[150px] rounded-lg object-cover"
              : "mx-1 flex items-center justify-center border bg-black/10 inset-0 mt-5 lg:w-[90%] w-[100%] h-[100px] md:h-[150px] rounded-lg object-cover"
          }
        >
          loading..
        </div>
        <a href={``} className="hover:underline">
          <span className="capitalize font-[500] justify-center text-center line-clamp-1">
            {/* {title} */}
          </span>
          <h2 className="text-sm text-center mt-2 text-cyan-400">
            {/* &#8358; {price} */}
          </h2>
        </a>
      </div>
    </>
  );
};

export default PlaceHolder;
