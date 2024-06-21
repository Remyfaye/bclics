"use client";
import { navItems } from "@/constants";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import toast from "react-hot-toast";

const SideBar = ({ setSideBar }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const session = useSession();
  const userData = session.data?.user;
  const { status } = session;

  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const [active, setActive] = useState("");

  const handleLogOutUser = async (e) => {
    // setIsCreatingUser(true);

    signOut("google", { callbackUrl: "/" });
    removeCookie("userId");
    toast("you have been logged out");
  };

  return (
    <>
      <div className="lg:mt-[-7rem] fixed left-0 p-7 h-screen lg:w-[15rem] w-[20rem] bg-white shadow-md">
        <div className="flex justify-between items-center">
          <Image
            className="lg:hidden"
            src="/logo.png"
            alt=""
            width={200}
            height={200}
          />
          <p
            className="text-3xl lg:hidden cursor-pointer"
            onClick={() => setSideBar(false)}
          >
            x
          </p>
        </div>
        {userId && (
          <Link
            onClick={() => setSideBar(false)}
            href="/profile"
            className="capitalize mt-8 mb-[3.5rem] border-b-2 pb-2 text-xl cursor-pointer"
          >
            My account
          </Link>
        )}
        {!userId && (
          <Link
            href="/login"
            onClick={() => setSideBar(false)}
            className="capitalize mt-8 mb-[3.5rem] border-b pb-2 text-2xl cursor-pointer"
          >
            login
          </Link>
        )}

        <div className="mt-7 border-b-2 pb-5 w-[50%]">
          {navItems.map((item) => (
            <>
              <Link
                onClick={() => (setActive(item.label), setSideBar(false))}
                href={`/${item.route}`}
                className={
                  active === item.label
                    ? "flex flex-col gap-2 my-2 text-xl text-gray-400 capitalize"
                    : "flex flex-col gap-2  my-2 text-xl capitalize"
                }
              >
                {item.label}
              </Link>
            </>
          ))}
        </div>

        <Link
          onClick={() => setSideBar(false)}
          className="relative"
          href={`/cart/${userId}`}
        >
          {/* {cartTotal != 0 && (
            <>
              <p className="absolute right-[-10px] top-[-12px] text-xs bg-primary rounded-full text-center text-white py-1 px-2">
                {cartTotal}
              </p>
            </>
          )} */}

          <p className="text-4xl">cart</p>
        </Link>

        <div className=" absolute bottom-5">
          {userId && (
            <Link
              href="/vendors/create"
              className="text-lg capitalize mt-3 btn2"
            >
              become a vendor
            </Link>
          )}
          {userId && (
            <button
              onClick={handleLogOutUser}
              className="btn2 bg-primary w-[90%] mt-3 text-white"
            >
              logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
