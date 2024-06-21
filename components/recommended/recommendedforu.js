import React, { useEffect, useState } from "react";
import Post from "./post";
import RecomHeader from "./header";
import { fetchProductsbyCategory } from "@/lib/fetchData";
import { Skeleton } from "@mui/material";
import { NGnaira } from "@/lib/help";
import { menuEmpty } from "@/constants";

export default function Recommendedforu() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    // const fetchProducts = async () => {
    //   const products = await fetchProductsbyCategory("supermarket");
    //   setPosts(products);
    //   // console.log(products);
    // };
    // fetchProducts();
  });

  return (
    <div className="pt-5 mt-5">
      <RecomHeader title="Recomended for you" color="bg-blue-400" />

      <div className="carousel carousel-center bg-white w-full shadow-lg">
        {menuEmpty?.map((post) => (
          <Post
            key={post.id}
            title={post.name}
            image={post.image}
            price={post.price}
            id={post.id}
          />
        ))}
      </div>
    </div>
  );
}
