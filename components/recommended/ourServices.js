import React, { useEffect, useState } from "react";
import Post from "./post";
import RecomHeader from "./header";
import { fetchProductsByBrand } from "@/lib/fetchData";
import { Skeleton } from "@mui/material";
import { NGnaira } from "@/lib/help";

export default function OurServices() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    // const fetchProducts = async () => {
    //   // const products = await fetchProductsByBrand("Oraimo");
    //   setPosts(products);
    //   // console.log(products);
    // };
    // fetchProducts();
  });

  return (
    <div className="pt-5">
      <RecomHeader title="our services" color="bg-green-800" />

      <div className="carousel lg:h-[15rem] h-[13rem]  rounded-b-xl">
        <div id="item1" className="carousel-item w-full">
          <img src="/swo1.png" className="object-cover" alt="Image" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src="/swo2.png" className="w-full object-top" alt="Image" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img
            src="https://ng.jumia.is/cms/0-1-initiatives/jbps/updated-jbp-2022/Nivea/Desktop-MLP-slider_-1168x384-(Show-Now).jpg"
            className="w-full"
            alt="Image"
          />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img
            src="https://ng.jumia.is/cms/0-1-initiatives/jbps/updated-jbp-2022/nestle/Desktop_MLP_slider__1168x384_(Show_Now).jpg"
            className="w-full"
            alt="Image"
          />
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>
    </div>
  );
}
