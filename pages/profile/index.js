"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import "firebase/compat/storage";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
import { adminItems } from "@/constants";
import Link from "next/link";
import UploadImage from "../../components/layout/UploadImage";

import { Cookies } from "react-cookie";

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [active, setActive] = useState("profile");
  const [chosenState, setChosenState] = useState("profile");
  const [fetchedAddress, setFetchedAddress] = useState("");

  // const userName = session.data?.user.name;
  // const email = session.data?.user.email;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          const errorData = await response.json();
          return;
        }

        const data = await response.json();
        setUser(data);
        // console.log(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        // setError("Error fetching user");
      }
    };

    fetchUser();
  }, [user]);

  const data = {
    name: name,
    phone: phone,
    address: address,
  };

  const saveChanges = async (e) => {
    // console.log(e);
    setIsUploading(true);

    const uploadPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/users/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, data }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          return;
        }

        console.log(response);
        alert("update successful");
      } catch (err) {
        console.error("Error fetching user:", err);
        // setError("Error fetching user");
      }
    });

    await toast.promise(uploadPromise, {
      loading: "saving",
      success: "saved",
      error: "an error occured, please try again",
    });

    setIsUploading(false);
    setShowUploadBtn(false);
  };

  return (
    <>
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
                    : "px-2 py-2 lg:px-5 rounded-xl border"
                }
              >
                {item.label}{" "}
              </div>
            </>
          ))}
        </div>

        {chosenState === "profile" && (
          <>
            {/* user Info */}
            <div className="lg:flex mb-5 -px-3    gap-10 justify-center">
              {/* image */}
              <UploadImage
                image={image}
                isUploading={isUploading}
                setImage={setImage}
                setDisabled={setDisabled}
              />

              {/* form */}
              <div className=" shadow-xl mt-10  p-5 rounded-xl lg:w-[30rem]">
                <label className="flex flex-col  gap-3">
                  Username
                  <input
                    disabled={isChosingImage}
                    className="p-4"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={user?.name}
                  />
                </label>

                <label className="mt-5 flex flex-col gap-3">
                  Email
                  <input disabled className="p-4" placeholder={user?.email} />
                </label>

                <label className="mt-5 flex flex-col gap-3">
                  phone
                  <input
                    disabled={isChosingImage}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    className="p-4 text-gray-400"
                    placeholder={user?.phone}
                  />
                </label>

                <label className="mt-5 flex flex-col gap-3">
                  Address
                  <input
                    disabled={isChosingImage}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="p-4 text-gray-400"
                    placeholder={user?.address}
                  />
                </label>

                <button
                  disabled={isChosingImage}
                  onClick={saveChanges}
                  className="bg-primary mt-10 py-5 px-10 w-full text-white text-xl rounded-xl"
                >
                  save changes
                </button>
              </div>
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
