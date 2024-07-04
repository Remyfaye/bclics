import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import ConfirmDelete from "@/components/layout/ConfirmDelete";
import { useSession } from "next-auth/react";
import CategoryDisplay from "@/components/categories/CategoryDisplay";
import Saved from "@/components/saved/Saved";
import Leftside from "@/components/header/leftside";

export const Delete = () => {
  alert("here");
  return (
    <div className="bg-red-500 z-50">
      <h2>Are you sure you want to delete this product?</h2>
    </div>
  );
};

const Page = () => {
  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const [user, setUser] = useState(null);
  const [vendor, setVendor] = useState(null);
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [id, setId] = useState(null);
  const [header, setHeader] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const session = useSession();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (router.isReady) {
          setId(router.query.id);
          const response = await fetch(`/api/product/${router.query.id}`);
          const data = await response.json();
          setProduct(data);
          setHeader(data?.category);
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching product:", errorData);
            return;
          }
        } else {
          setLoading(true);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${session.data.user.email}`);
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching user:", errorData);
          return;
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    const fetchVendor = async () => {
      try {
        if (product?.vendor) {
          const response = await fetch(`/api/getVendor/${product.vendor}`);
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching vendor:", errorData);
            return;
          }
          const data = await response.json();
          setVendor(data);
        }
      } catch (err) {
        console.error("Error fetching vendor:", err);
      }
    };

    fetchUser();
    fetchVendor();
    fetchProduct();
  }, [
    router.isReady,
    router.query.id,
    product.vendor,
    session?.data?.user.email,
  ]);

  const addToSaved = async () => {
    try {
      const response = await fetch("/api/saved/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, userId: user?._id }),
      });
      if (response.ok) {
        alert("Item saved!");
      } else {
        const errorData = await response.json();
        console.error("Error saving item:", errorData);
      }
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  return (
    <div className={`${deleteItem ? "bg-black/50 inset-0" : ""} lg:flex gap-5`}>
      <div className="fixed top-[-4px] w-[16rem] h-screen mt-[4.2rem] mr-10">
        <Leftside />
      </div>
      <div className="p-2 lg:max-w-[65rem] lg:mx-auto lg:mr-[5.5rem]">
        <p className="mt-3">fi</p>
        <div className="lg:flex justify-between mt-10 gap-7">
          {/* left */}
          <div className="flex mt-5 gap-3 bg-white capitalize lg:w-[450px] rounded-lg">
            <img
              className={`${
                deleteItem ? "bg-black/50 inset-0" : ""
              } w-full object-cover h-[20rem] lg:h-[25rem] rounded-lg`}
              src={product?.image}
              alt={deleteItem ? "" : "img"}
            />
          </div>

          {deleteItem && (
            <ConfirmDelete id={id} setDeleteItem={setDeleteItem} />
          )}

          {/* product details */}
          <div
            className={`${
              deleteItem ? "bg-black/50 inset-0" : ""
            } bg-white mt-5 p-3 rounded-lg lg:w-[450px]`}
          >
            <div className="flex justify-between border-b mb-5">
              <h2 className="pb-2 font-bold">Product Details</h2>
              {user?._id && product.vendor && user._id === product.vendor && (
                <RestoreFromTrashIcon
                  onClick={() => setDeleteItem(true)}
                  className="text-red-500 text-[30px] cursor-pointer"
                />
              )}
            </div>
            <div className="p-3">
              <div className="mb-1 pb-2">
                <p className="font-semibold">Name: {product?.name}</p>
                <p className="my-3">Vendor: {vendor?.name || vendor?.email}</p>
              </div>
              <p className="font-[500]">Price: &#8358;{product?.price}</p>
              <p className="my-2 text-gray-500">
                Contact:{" "}
                <a className="cursor-pointer text-red-500" href="">
                  {product?.contact}
                </a>
              </p>
              <p className="mb-3">
                <span className="font-extralight cursor-pointer text-blue-300">
                  Location: {product.location}
                </span>
              </p>
              <div
                onClick={addToSaved}
                className=" bg-primary text-center cursor-pointer rounded-[7px] text-white lg:px-4 px-3 py-2"
              >
                Save this item
              </div>
              {user?._id && product.vendor && user._id === product.vendor && (
                <button className="cursor-pointer border  text-center my-5 w-full rounded-[7px] text-black lg:px-4 px-3 py-2">
                  <a href={`/upload/edit/${product._id}`}>Edit</a>
                </button>
              )}
            </div>
            <p className="border-t pt-3">{product?.description}</p>
          </div>
        </div>

        {loading && <div className="text-center my-10">Loading...</div>}

        {/* other category */}
        {!loading && <CategoryDisplay header={header} productPage />}
        {!loading && <Saved header={header} productPage />}
      </div>
    </div>
  );
};

export default Page;
