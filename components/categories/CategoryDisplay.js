import React, { useEffect, useState } from "react";
import { fetchProductsbyCategory } from "@/lib/fetchData";
import { Skeleton } from "@mui/material";
import { NGnaira } from "@/lib/help";
import { menuEmpty } from "@/constants";
import Post from "../recommended/post";
import RecomHeader from "../recommended/header";
import PlaceHolder from "../layout/PlaceHolder";
import { useSession } from "next-auth/react";

export default function CategoryDisplay({ color, header, productPage }) {
  const [posts, setPosts] = useState();
  const [products, setProducts] = useState([]);
  const session = useSession();

  useEffect(() => {
    // const products = menuEmpty.filter((item) => item.category === header);
    // setProducts(products);
    // console.log(session);

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/product/products?category=${header}`
        );
        const data = await response.json();
        // console.log(data);
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
    <div className="pt-5 mt-5 rounded-xl">
      {!productPage && <RecomHeader title={header} color={color} />}

      <div className="bg-white ">
        {productPage && (
          <h2 className="p-2 border-b mb-5 pb-2">You may also like</h2>
        )}
        <div
          className={
            productPage
              ? "carousel lg:pr-3 lg:grid grid-cols-5 carousel-center w-full shadow-lg"
              : "carousel lg:pr-3  carousel-center w-full shadow-lg"
          }
        >
          {products.length > 0
            ? products?.map((post) => (
                <Post
                  key={post.id}
                  title={post.name}
                  image={post.image}
                  price={post.price}
                  id={post._id}
                  category={post.category}
                  vendor={post.vendor}
                  location={post.location}
                />
              ))
            : menuEmpty.map((item) => <PlaceHolder />)}
        </div>
      </div>
    </div>
  );
}
