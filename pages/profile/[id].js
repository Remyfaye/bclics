"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import "firebase/compat/storage";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
import { adminItems, menuEmpty } from "@/constants";
import Link from "next/link";
import UploadImage from "../../components/layout/UploadImage";

import { Cookies, useCookies } from "react-cookie";
import Post from "@/components/recommended/post";

const Profile = () => {
  const router = useRouter();

  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const [user, setUser] = useState(null);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  const [isChosingImage, setIsChosingImage] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadBtn, setShowUploadBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("posts");
  const [chosenState, setChosenState] = useState("posts");

  const [userProducts, setUserProducts] = useState(null);
  const [error, setError] = useState(false);
  // const [email, setEmail] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();

  const session = useSession();
  // const user = session?.data?.user;
  const email = session?.data?.user.email;

  useEffect(() => {
    // setEmail(session?.data?.user);
    console.log(session);
    const fetchUser = async () => {
      try {
        if (session.status === "authenticated") {
          const response = await fetch(`/api/users/${email}`);

          if (!response.ok) {
            const errorData = await response.json();
            return;
          }

          const data = await response.json();
          setUser(data);
          // console.log(data);
        } else {
          console.log(session);
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
        const products = data.filter((item) => item.vendor === userId);
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

  // const data = {
  //   name: name,
  //   phone: phone,
  //   address: address,
  // };

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
          {/* logout */}
          <div className="flex-row justify-end bg-red-300">
            <Image
              onClick={handleLogOutUser}
              width={200}
              height={200}
              className="absolute top-[6rem] right-5 h-8 w-8"
              src="/icons/logout.png"
              alt=""
            />
          </div>

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
        {/* admin items */}
        <div className="px-5 overflow-x-auto custom-scrollbar cursor-pointer flex mx-auto  gap-3  p-5 capitalize lg:mx-auto justify-center mb-5">
          {adminItems.map((item) => (
            <>
              <div
                // href={item.route}
                onClick={() => (
                  setActive(item.label), setChosenState(item.label)
                )}
                className={
                  active === item.label
                    ? "bg-primary lg:px-5 px-3 py-2 rounded-xl text-white"
                    : "px-2 py-2 lg:px-5 rounded-xl border text-black"
                }
              >
                {item.label}{" "}
              </div>
            </>
          ))}
        </div>

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
                      profile
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
