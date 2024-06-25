import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ComputerIcon from "@mui/icons-material/Computer";
import CableIcon from "@mui/icons-material/Cable";
import DiamondIcon from "@mui/icons-material/Diamond";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";

import MenuIcon from "@mui/icons-material/Menu";
import SidebarMenuItem from "../header/SidebarMenuItem";
import { useSession, signIn, signOut } from "next-auth/react";
import { Cookies, useCookies } from "react-cookie";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Elementthree() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const session = useSession();
  const googleUser = session?.data?.user;
  const router = useRouter();
  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const [user, setUser] = useState(null);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (!userId) return;

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
        // console.log(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        // setError("Error fetching user");
      }
    };

    fetchUser();
  }, [user]);

  const handleLogOutUser = async (e) => {
    // setIsCreatingUser(true);

    // signOut("google", { callbackUrl: "/" });
    removeCookie("userId");
    // toast("you have been logged out");
  };
  return (
    <>
      <div className="dropdown dropdown-bottom cursor-pointer md:hidden">
        <label tabIndex={0} className="  m-1">
          <MenuIcon
            className="my-auto ml-1 mt-3"
            onClick={() => setClick(true)}
          />
        </label>
        <div
          tabIndex={0}
          className="dropdown-content  w-[15rem] h-screen  p-2 shadow bg-white rounded-box "
        >
          <div className="items-start mt-0   p-2   ">
            <div className=" md:inline my-5">
              {session.status === "authenticated" ? (
                <div>
                  <a
                    href="/profile"
                    className="my-auto mb-3 mt-3 cursor-pointer "
                    // onClick={() => router.push("/profile")}
                  >
                    HI, {googleUser?.name || googleUser?.email}
                  </a>
                </div>
              ) : (
                <a
                  href="/register"
                  // onClick={signIn}
                  className=" text-primary border px-4  py-2 rounded-lg hover:text-white hover:bg-primary border-primary "
                >
                  LOGIN / SIGN UP
                </a>
              )}
            </div>

            {user && (
              <div className="mt-5  text-red-500 text-xl my-2">
                <CableIcon />
                <a href="/upload" className="ml-2">
                  upload a product
                </a>
              </div>
            )}

            <div
              onClick={() => setClick(false)}
              className="border-y-2 py-3 w-[80%] mt-10"
            >
              {session.status === "authenticated" && (
                <SidebarMenuItem
                  link="services"
                  text="My Profile"
                  Icon={PersonIcon}
                />
              )}

              <SidebarMenuItem
                link="services"
                text="Services"
                Icon={MicrowaveIcon}
              />

              <SidebarMenuItem
                link="property"
                text="land and property"
                Icon={HomeWorkIcon}
              />
              <SidebarMenuItem
                link="electronics"
                text="electronics"
                Icon={PhoneAndroidIcon}
              />

              <SidebarMenuItem
                link="fashion"
                text="Fashion"
                Icon={DiamondIcon}
              />

              <SidebarMenuItem
                link="beauty"
                text="Health & Beauty"
                Icon={MedicationLiquidIcon}
              />
              <SidebarMenuItem link="food" text="Food" Icon={MicrowaveIcon} />
              <SidebarMenuItem
                link="sports"
                text="Sporting Goods"
                Icon={DownhillSkiingIcon}
              />
              <SidebarMenuItem
                link="others"
                text="Other Categories"
                Icon={CategoryIcon}
              />
            </div>

            <div className="mt-10 w-[90%] text-center md:inline ">
              {user !== null && (
                <a
                  href="/login"
                  onClick={handleLogOutUser}
                  className=" text-primary border px-4 py-2 rounded-lg w-full hover:text-white hover:bg-primary border-primary "
                >
                  LOGOUT{" "}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
