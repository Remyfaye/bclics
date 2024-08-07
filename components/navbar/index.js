import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Elementthree from "./elementthree";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import ShoppingCart from "./shoppingcart";
import { cartState } from "../../atom/cartAtom";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { menuEmpty } from "@/constants";
import Search from "./search";
import Link from "next/link";
import { Cookies } from "react-cookie";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cookie = new Cookies();

  const session = useSession();
  const googleUser = session?.data?.user;
  const email = googleUser?.email;
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState();
  // React Recoil
  const [user, setUser] = useState(null);
  const userId = user?._id;
  const getUserId = user?._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${email}`);

        if (!response.ok) {
          const errorData = await response.json();
          return;
        }

        const data = await response.json();
        setUser(data);
        // console.log(user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    const getCart = async () => {
      try {
        const response = await fetch(`/api/saved/${getUserId}`);
        const data = await response.json();
        setCart(data);
        console.log(cart.items);
      } catch (error) {
        console.error("Error saving item:", error);
      }
    };

    fetchUser();
    getCart();
  }, [cart, user, email]);

  const onSearch = () => {
    const delayBounceFn = setTimeout(() => {
      let newUrl = "";
      console.log(searchParams);
      // alert(searchParams);
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams,
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams,
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayBounceFn);
  };

  return (
    <div className="fixed w-full z-50 ">
      <div className="bg-white align-middle">
        <div className="md:max-w-7xl mx-auto items-center flex py-3 flex-row justify-between space-x-2 ">
          <div className="flex space-x-2">
            <span>
              <Elementthree suppressHydrationWarning />
            </span>
            <a
              // src="/jumia.png"
              className="h-[40px] text-primary mt-1 cursor-pointer  text-3xl"
              // alt="logo"
              href={"/"}
            >
              b <span className="text-black ml-[-8px]">clics</span>
            </a>
          </div>

          <div className="hidden lg:flex">
            <Search />
          </div>

          <div className="hidden md:inline">
            {session.status === "authenticated" ? (
              <div>
                <h3
                  className="my-auto  cursor-pointer"
                  onClick={() => router.push("/profile")}
                >
                  HI, {user?.name || user?.email}
                </h3>
              </div>
            ) : (
              <Link
                href="/register"
                // onClick={signIn}
                className=" text-primary  border px-4 py-2 rounded-lg hover:text-white hover:bg-primary border-primary "
              >
                LOGIN / SIGN UP
              </Link>
            )}
          </div>

          <div className="flex gap-2 items-center lg:hidden">
            <Search />

            <ShoppingCart items={cart?.items?.length} />
          </div>
          <div className="hidden lg:flex">
            <ShoppingCart items={cart?.items?.length} />
          </div>
        </div>
      </div>
    </div>
  );
}
