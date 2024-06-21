import React from "react";
import RecomHeader from "../recommended/header";
import { storesEmpty } from "@/constants";
import Store from "./store";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function SliderMainPage() {
  return (
    <div className="mt-5 ">
      <RecomHeader title="Official  Stores" link="stores" color="bg-lime-300" />
      <div className="carousel w-full">
        <div className="carousel-item w-full ">
          {storesEmpty?.map((store) => (
            <Store
              key={store.id}
              name={store.name}
              desc={store.desc}
              url={store.url}
              id={store.id}
            />
          ))}
        </div>

        {/* <div id="store1" className="carousel-item w-full">
          <img
            src="https://ng.jumia.is/cms/0-1-initiatives/jbps/updated-jbp-2022/adidas/mlp.jpg"
            className="w-full"
            alt="Image"
          />
        </div>
        <div id="store2" className="carousel-item w-full">
          <img
            src="https://ng.jumia.is/cms/0-1-initiatives/jbps/updated-jbp-2022/oraimo/Desktop_MLP_slider__1168x384_(Show_Now).jpg"
            className="w-full"
            alt="Image"
          />
        </div>
        <div id="store3" className="carousel-item w-full">
          <img
            src="https://ng.jumia.is/cms/0-1-initiatives/jbps/updated-jbp-2022/Nivea/Desktop-MLP-slider_-1168x384-(Show-Now).jpg"
            className="w-full"
            alt="Image"
          />
        </div>
        <div id="store4" className="carousel-item w-full">
          <img
            src="https://ng.jumia.is/cms/0-1-initiatives/jbps/updated-jbp-2022/nestle/Desktop_MLP_slider__1168x384_(Show_Now).jpg"
            className="w-full"
            alt="Image"
          />
        </div> */}
      </div>

      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#store1" className="btn btn-xs">
          1
        </a>
        <a href="#store2" className="btn btn-xs">
          2
        </a>
        <a href="#store3" className="btn btn-xs">
          3
        </a>
        <a href="#store4" className="btn btn-xs">
          4
        </a>
      </div>
    </div>
  );
}
