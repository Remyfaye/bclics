import React from "react";

export default function Recommended() {
  return (
    <div className="pt-5">
      <div className="carousel carousel-center w-full bg-white shadow-lg rounded-lg">
        <div className="carousel-item items-center mx-2 flex flex-col w-[150px] md:w-[200px]">
          <img
            src="https://www.mytechlogy.com/upload/by_users/RachelleW/081609072551TabletsPhonesandTechDevicesThatMakeLifeMoreConvenient.JPG"
            className="rounded-box border my-3 h-[7rem] lg:h-[10rem]"
            alt="image"
          />

          <span className="justify-center text-center">Phones & Tablets</span>
        </div>

        <div className="carousel-item items-center mx-2 flex flex-col w-[150px] md:w-[200px]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd443YPsTXsTfQnQFBlDHXN0SVuF3OlgH7VGZiGMK_jg&s"
            className="rounded-box object-contain border my-3 h-[7rem] lg:h-[10rem] mx-3"
            alt="image"
          />
          <span className="justify-center text-center">Television</span>
        </div>

        <div className="carousel-item items-center mx-2 flex flex-col w-[150px] md:w-[200px]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjf6Wd_F-rZ8HfNGxVHEhsJ7cw3W9IvLrb8WEgBvAgoA&s"
            className="rounded-box object-contain border my-3 h-[7rem] lg:h-[10rem] mx-3"
            alt="image"
          />
          <span className="justify-center text-center">Groceries</span>
        </div>
        <div className="carousel-item items-center mx-2 flex flex-col w-[150px] md:w-[200px]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2WfMjv6nT6hjyHHTnH8NxRj7ihxcU77GDF8F1YqGxQg&s"
            className="rounded-box object-contain border my-3 h-[7rem] lg:h-[10rem] mx-3"
            alt="image"
          />
          <span className="justify-center text-center">Refrigerators</span>
        </div>

        <div className="carousel-item items-center mx-2 flex flex-col w-[150px] md:w-[200px]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNIBXouRJiREIpwbOqMyZHmIqn9xSYWuQtGJXzAFhduA&s"
            className="rounded-box object-contain border my-3 h-[7rem] lg:h-[10rem] mx-3"
            alt="image"
          />
          <span className="justify-center text-center">Skin Care</span>
        </div>

        <div className="carousel-item items-center mx-2 flex flex-col w-[150px] md:w-[200px]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfK3Y5iMX-VYoOsGQwXXQuuAFDe8wStEahHCWq63x9iQ&s"
            className="rounded-box object-contain border my-3 h-[7rem] lg:h-[10rem] mx-3"
            alt="image"
          />
          <span className="justify-center text-center">Electronics</span>
        </div>

        {/* <div className="carousel-item flex flex-col w-[150px] md:w-[200px]">
          <img
            src="https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/01-thumbnails/Best_Seller.png"
            className="rounded-box"
            alt="image"
          />
          <span className="justify-center text-center">Best Sellers</span>
        </div> */}
      </div>
    </div>
  );
}
