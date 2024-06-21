import React, { useEffect, useState } from "react";
import Post from "./post";
import RecomHeader from "./header";
import { fetchProductsbyCategory } from "@/lib/fetchData";
import { Skeleton } from "@mui/material";
import { NGnaira } from "@/lib/help";
import { menuEmpty } from "@/constants";

export default function FeaturedProducts() {
  const [posts, setPosts] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/api/product/allProducts");
        const data = await response.json();
        console.log(data);
        setProducts(data);
        // setLoading(false);

        if (!response.ok) {
          const errorData = await response.json();
          return;
        }
      } catch (err) {
        console.error("Error fetching Product:", err);
      }
    };

    fetchProduct();
  }, [products]);

  return (
    <div className="pt-5 mt-5">
      <RecomHeader title="featured products" color="bg-red-400" />

      <div className="carousel carousel-center bg-white w-full shadow-lg">
        {products.length > 0 &&
          products?.map((post) => (
            <Post
              key={post.id}
              title={post.name}
              image={post.image}
              price={post.price}
              id={post._id}
            />
          ))}
      </div>
    </div>
  );
}
