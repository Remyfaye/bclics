import { cartState } from "../../atom/cartAtom";
import { useRecoilState } from "recoil";
import Items from "./items";
import { useEffect, useState } from "react";
import { NGnaira } from "@/lib/help";

import { useSession } from "next-auth/react";
import { uploadOrder } from "@/lib/uploadOrder";
import { Modal } from "@mui/material";
import Message from "./message";

export default function CartItems() {
  // React Recoil
  const [cart, setCart] = useState();
  const [cartSum, setCartSum] = useState();
  const [loading, setLoading] = useState(false);
  const [deliverySum, setDeliverySum] = useState();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    deliveryAddress: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const session = useSession();
  const googleUser = session?.data?.user;
  const email = googleUser?.email;
  const [user, setUser] = useState(null);
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
        setError("Error fetching user");
      }
    };

    const getCart = async () => {
      try {
        const response = await fetch(`/api/saved/${getUserId}`);
        const data = await response.json();
        setCart(data.items);
        console.log(cart);
      } catch (error) {
        console.error("Error saving item:", error);
      }
    };
    getCart();
    fetchUser();

    var Sum = 0;
    for (var i = 0; i < cart?.length; i++) {
      Sum += parseInt(cart[i].productprice);
    }
    setCartSum(Sum);

    var Summ = 0;
    for (var i = 0; i < cart?.length; i++) {
      Summ += parseInt(cart[i].deliveryPrice);
    }
    setDeliverySum(Summ);
  });

  const submitFrom = async (event) => {
    event.preventDefault();

    if (!formData.phoneNumber || !formData.deliveryAddress) {
      alert("Please fill in your phone number and delivery address");
      return;
    }
    setLoading(true);

    const result = await uploadOrder(
      formData.phoneNumber,
      formData.deliveryAddress,
      session.user.name,
      cartSum,
      deliverySum,
      cart
    );

    setLoading(false);

    if (result) {
      // success
      setCart([]);
      handleOpen();
    } else {
      // failure
      alert("Error uploading order");
    }
  };

  const removeItem = (index) => {
    const newcart = [...cart];
    newcart.splice(index, 1);

    setCart(newcart);
  };

  return (
    <div className="p-3 md:flex md:space-x-5">
      <div className="bg-white pt-32 shadow-lg p-3 rounded-t-lg text-xl text-black uppercase w-[100%] md:w-[65%]">
        <span>Cart ({cart?.length})</span>
        <div className="divider"></div>
        {cart?.length === 0 && <div className="capitalize">Cart is Empty</div>}
        {cart?.map((item) => (
          <Items
            key={item._id + Math.random()}
            item={item.product}
            name={item.product.name}
            // index={i}
            removeItem={removeItem}
          />
        ))}
      </div>

      <div className="mt-3 text-xl text-black md:w-[35%]">
        <div className="bg-white w-full p-3 rounded-t-lg shadow-lg">
          <span className="text-black p-3 rounded-t-lg text-sm uppercase">
            Cart Summary
          </span>
          <div className="divider"></div>
          <div>Sub Total : {NGnaira.format(cartSum)}</div>
          <p className="text-sm text-gray-400  p-2">
            {!deliverySum ? (
              <>Delivery Fee : FREE </>
            ) : (
              <>Delivery Fee : {NGnaira.format(deliverySum)}</>
            )}
          </p>

          <div className="mt-3">
            <input
              type="text"
              value={session?.user?.name}
              placeholder="Name"
              disabled
              className="input input-bordered input-warning w-full"
            />
          </div>

          <div className="mt-3">
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered input-warning w-full"
              onChange={(event) =>
                setFormData({ ...formData, phoneNumber: event.target.value })
              }
            />
          </div>

          <div className="mt-3">
            <textarea
              className="textarea textarea-warning w-full"
              placeholder="Delivery Address, Please add landmark areas near your location."
              onChange={(event) =>
                setFormData({
                  ...formData,
                  deliveryAddress: event.target.value,
                })
              }
            ></textarea>
          </div>

          <button
            onClick={submitFrom}
            className={`${
              !session ? "btn-disabled" : ""
            } text-white btn btn-warning btn-wide w-full ${
              loading ? "loading" : ""
            }`}
          >
            Checkout ({NGnaira.format(cartSum + deliverySum)})
          </button>
          {!session && (
            <p className="text-sm text-gray-300" align="center">
              Please Login to be able to checkout
            </p>
          )}
        </div>

        <div></div>

        <div className="bg-white w-full p-3  text-sm rounded-b-lg shadow-lg mt-3">
          Returns are easy Free return within 15 days for Official Store items
          and 7 days for other eligible items
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Message />
          </Modal>
        </div>
      </div>
    </div>
  );
}
