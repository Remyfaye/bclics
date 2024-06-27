import NumberFormat from "react-number-format";
import Link from "next/link";
import Image from "next/image";
import PlaceIcon from "@mui/icons-material/Place";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

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
  return (
    <>
      <div
        className={
          allProducts
            ? "border-black/20 mt-3 rounded-xl border-[1px] "
            : profile
            ? " border-black/20  rounded-xl border-[1px] "
            : "carousel-item  mx-1 flex flex-col w-[160px] md:w-[200px] p-2"
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

        <div className="px-3">
          <div className="hover:underline ">
            <div className="flex items-center justify-between">
              {/* price */}
              <h2 className="text-md mb-2 mt-2 text-cyan-400">
                &#8358; {price}
              </h2>

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
            <span className="capitalize font-[500] justify-center  line-clamp-2">
              <a href={`/product/${id}`}> {title}</a>

              {!title && <h1>product name</h1>}
            </span>
          </div>

          <small className="line-clamp-1 my-3">
            {" "}
            <a href={`/profile/${vendor}`}>{vendor}</a>
            {!vendor && <h1>vendor</h1>}
          </small>

          <h3 className="capitalize text-sm items-center text-gray-600 my-3 flex gap-1">
            <PlaceIcon className="text-sm" />
            {/* <Image src="/bookmark.png" width={18} height={15} /> */}
            {location}
            {!location && <h1>location</h1>}
          </h3>
        </div>
      </div>
    </>
  );
}
