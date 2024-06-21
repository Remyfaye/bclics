"use client";
import { menuEmpty } from "@/constants";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CategoryDisplay from "@/components/categories/CategoryDisplay";
import Saved from "@/components/saved/Saved";
import Post from "@/components/recommended/post";
import Leftside from "@/components/header/leftside";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [id, setId] = useState(null);
  const [header, setHeader] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(router.isReady);

    const fetchProduct = async () => {
      try {
        if (router.isReady) {
          setId(router.query.id);
          const response = await fetch(`/api/product/products?category=${id}`);
          const data = await response.json();
          console.log(data);
          setProducts(data);
          setLoading(false);
        } else {
          setLoading(true);
        }

        if (!response.ok) {
          const errorData = await response.json();
          return;
        }
        const fetchedProducts = menuEmpty.filter(
          (item) => item.category === id
        );
        const results = products.filter((product) =>
          product.name.toLowerCase().includes(id?.toLowerCase())
        );
        setSearchedProducts(results);
      } catch (err) {
        console.error("Error fetching Product:", err);
      }
    };

    fetchProduct();
  }, [products, router.isReady, router.query.id, id]);

  // if (!loading && products?.length < 1) {
  //   return (
  //     <div className="pt-32 mx-auto text-center">
  //       <h3 className="mb-6 text-xl">No products yet</h3>
  //       <Link
  //         className="bg-primary border shadow-xl text-white px-10 py-3 mt-10 rounded-[7px] "
  //         href="/upload"
  //       >
  //         Upload a product
  //       </Link>
  //     </div>
  //   );
  // }

  // if (loading) {
  //   return <div className="pt-32 mx-auto text-center text-xl">Loading...</div>;
  // }
  return (
    <div className=" pr-4 lg:px-20 ">
      <h1 className="mb-[4rem]  border-b-2 w-[50%] mx-auto border-red-300  text-center">
        {id} :nss
      </h1>
      <div className="flex gap-5 ">
        <div className="z-50 max-h-screen">
          <Leftside allProducts />
        </div>

        <div className="lg:mr-[3rem] lg:w-[45%]  max-w-5xl mx-auto">
          <h1 className="lg:hidden mb-[1rem] lg:ml-[-15rem]  text-3xl capitalize">
            {id}:
          </h1>
          <div className="grid  w-full  lg:ml-[-15rem] lg:grid-cols-3 grid-cols-2 gap-3 max-w-4xl  mx-auto">
            {products.length > 0 &&
              products?.map((post) => (
                <Post
                  allProducts
                  key={post.id}
                  title={post.name}
                  image={post.image}
                  price={post.price}
                  id={post._id}
                  category={post.category}
                  location={post.location}
                />
              ))}
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 m-0 lg:max-w-3xl lg:mr-20 lg:mx-auto">
            {searchedProducts.map((post) => (
              <Post
                allProducts
                key={post.id}
                title={post.name}
                image={post.image}
                price={post.price}
                id={post._id}
                category={post.category}
              />
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <>
          <div className="text-center my-10">loading...</div>
        </>
      )}
    </div>
  );
};

export default page;
