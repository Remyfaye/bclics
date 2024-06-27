"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import "firebase/compat/storage";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
import { adminItems, menuEmpty } from "@/constants";
import Link from "next/link";
import UploadImage from "../../components/layout/UploadImage";

import { Cookies, useCookies } from "react-cookie";
import Post from "@/components/recommended/post";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  console.log(router.query);

  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("posts");
  const [chosenState, setChosenState] = useState("posts");

  const [userProducts, setUserProducts] = useState(null);
  const [error, setError] = useState(false);
  // const [email, setEmail] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [id, setId] = useState(null);

  const session = useSession();
  // const user = session?.data?.user;
  const email = session?.data?.user.email;

  useEffect(() => {
    // setEmail(session?.data?.user);
    console.log(session);
    const fetchUser = async () => {
      try {
        if (router.isReady) {
          setId(router.query.id);
          const response = await fetch(`/api/getVendor/${id}`);
          const data = await response.json();
          console.log(data);
          setUser(data);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        // setError("Error fetching user");
      }
    };

    const fetchProduct = async () => {
      const response = await fetch("/api/product/allProducts");
      const data = await response.json();
      // console.log(userProducts);
      // userProducts.vendor === userId && setUserProducts(data);
      if (data.length > 0) {
        const products = data.filter((item) => item.vendor === id);
        setUserProducts(products);
      }

      setLoading(false);
      if (!response.ok) {
        setLoading(false);
        setError(true);
      }
    };
    fetchUser();
    fetchProduct();
    console.log(userProducts);
  }, [user, session, email, session.status]);

  const handleLogOutUser = async (e) => {
    // setIsCreatingUser(true);

    signOut("google", { callbackUrl: "/" });
    removeCookie("userId");
    toast("you have been logged out");
  };

  return (
    <>
      <section className="h-full ">
        {/* userPosts */}

        <div className="text-black">
          {/* userDetails */}
          <div className="flex flex-col justify-center mx-auto  items-center pt-20 ">
            <div className="border flex-row justify-center items-center rounded-lg h-[80px] w-[80px] bg-gray-300">
              {!user?.image ? (
                <div className="border flex-row justify-center items-center rounded-lg h-[80px] w-[80px] bg-gray-300"></div>
              ) : (
                <>
                  <Image
                    width={30}
                    height={30}
                    className=" rounded-lg h-[80px] w-[80px] text-center"
                    src={user?.image}
                    alt=""
                  />
                </>
              )}
            </div>

            <h2 className="text-black mt-5 font-pbold text-xl">
              {user?.name || user?.email}
            </h2>

            <div className="flex  gap-20 mb-10">
              <div className="flex-col items-center flex">
                <h2 className="text-black/80 mt-5 font-pbold text-xl">
                  {userProducts?.length}
                </h2>
                <h2 className="text-black/80">Posts</h2>
              </div>

              <div className="flex-col items-center flex">
                <h2 className=" mt-5 font-pbold text-xl">0</h2>
                <h2 className="">Customers</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5  gap-10 justify-center">
        {/* <h1>Products </h1> */}
        {chosenState === "posts" && (
          <>
            <div className="grid p-5 w-full  -mt-10 lg:grid-cols-3 grid-cols-2 gap-3 max-w-4xl  mx-auto">
              <>
                {userProducts?.map((post) => (
                  <>
                    <Post
                      key={post.id}
                      title={post.name}
                      image={post.image}
                      price={post.price}
                      id={post._id}
                      category={post.category}
                      location={post.location}
                    />
                  </>
                ))}
              </>

              {!loading && !error && (
                <>
                  {userProducts === null && (
                    <>
                      <div className="flex justify-center items-center bg-white ">
                        <h1>No products yet</h1>
                      </div>
                    </>
                  )}
                </>
              )}

              {error && (
                <>
                  <h1 className="flex mx-auto justify-center items-center ">
                    An error occured, please refresh the page
                  </h1>
                </>
              )}

              {loading && (
                <>
                  <h1 className=" flex items-center justify-center">
                    Loading...
                  </h1>
                </>
              )}
            </div>
          </>
        )}
      </section>

      {/* mobile */}

      {/* )} */}
    </>
  );
};

export default Profile;
