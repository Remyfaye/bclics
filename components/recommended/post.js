import NumberFormat from "react-number-format";
import Link from "next/link";
import Image from "next/image";
import PlaceIcon from "@mui/icons-material/Place";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Post({
  allProducts,
  title,
  image,
  price,
  id,
  location,
  profile,
  vendor,
  vendorPage,
}) {
  const session = useSession();
  const email = session?.data?.user.email;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // setEmail(session?.data?.user);
    console.log(session);
    const fetchUser = async () => {
      try {
        if (session.status === "authenticated") {
          const response = await fetch(`/api/getVendor/${vendor}`);

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

    fetchUser();
    console.log(user);
  }, [user, session, email, session.status]);
  return (
    <>
      <div
        className={
          allProducts
            ? "border-black/20 mt-3 rounded-xl border-[1px] "
            : profile
            ? " border-black/20  rounded-xl border-[1px] "
            : "carousel-item mx-2  border-black/20   border-[1px] rounded-xl  my-5 flex flex-col w-[150px] md:w-[200px] "
        }
      >
        <img
          src={image}
          className={
            allProducts
              ? " w-[100%] rounded-t-xl mb-4 lg:h-[145px] h-[230px]  object-cover"
              : `${
                  profile && "mx-o h-[130px] object-cover"
                }"mx-1  w-[100%] h-[150px] md:h-[150px] rounded-lg object-cover"`
          }
          alt={title}
        />

        <div className="p-1">
          <div className="hover:underline ">
            <div className="flex items-center justify-between">
              {/* price */}
              <h2 className="text-md  text-cyan-400">&#8358; {price}</h2>

              {/* edit btn */}
              {profile && (
                <>
                  <a href={`/upload/edit/${id}`}>
                    <DriveFileRenameOutlineIcon />
                  </a>
                </>
              )}
            </div>

            {/* title */}
            <span className="capitalize my-1 font-[500] justify-center  line-clamp-1">
              <a href={`/product/${id}`}> {title}</a>

              {!title && <h1>product name</h1>}
            </span>
          </div>

          <small className="line-clamp-1 ">
            {" "}
            {!vendor ? (
              <h1>vendor</h1>
            ) : (
              <a href={`/profile/${vendor}`}>
                by: {user ? "loading..." : user?.name}
              </a>
            )}
          </small>

          {/* <small className="capitalize text-sm items-center text-gray-600 my-3 flex gap-1">
            <PlaceIcon className="text-sm" />
            <Image src="/bookmark.png" width={18} height={15} />

            {!location ? <h1>location</h1> : location}
          </small> */}
        </div>
      </div>
    </>
  );
}
