import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";

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

import SidebarMenuItem from "./SidebarMenuItem";
import Link from "next/link";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";

export default function Leftside({ allProducts }) {
  const [user, setUser] = useState(null);
  const cookie = new Cookies();
  const userId = cookie.get("userId");

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
        console.log(data);
        // console.log(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Error fetching user");
      }
    };

    fetchUser();
  }, []);
  return (
    <div
      className={
        allProducts
          ? "fixed  max-h-[35rem] hidden md:inline md:w-[40%] lg:w-[20%]"
          : "hidden md:inline md:w-[40%] lg:w-[22%]"
      }
    >
      <div className="items-start bg-white p-2 h-[95%] rounded-xl shadow-2xl mb-5">
        {user && (
          <div className="mt-5  text-red-500 text-xl my-2">
            <CableIcon />
            <a href="/upload" className="ml-2">
              upload a product
            </a>
          </div>
        )}

        <div className="border-y-2 py-3 w-[80%]">
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

          <SidebarMenuItem link="fashion" text="Fashion" Icon={DiamondIcon} />

          <SidebarMenuItem
            link="beauty"
            text="Health & Beauty"
            Icon={MedicationLiquidIcon}
          />

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
      </div>
    </div>
  );
}
