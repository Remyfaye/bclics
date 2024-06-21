import { useRouter } from "next/router";
import React, { useState } from "react";

const ConfirmDelete = ({ id, setDeleteItem }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // const deleteItem = async () => {
  //   setLoading(true);
  //   const response = await fetch("/api/product/delete", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(id),
  //   });

  //   console.log(response);

  //   if (response.ok) {
  //     setLoading(false);
  //     alert("Delete sucessfull");
  //     router.push("/");
  //   } else {
  //     alert("something went wrong, please try again");
  //     setDeleteItem(false);
  //   }

  //   if (id === "") {
  //     alert("pls try again");
  //   } else {
  //   }
  // };

  async function deleteItem() {
    setLoading(true);
    try {
      const response = await fetch("/api/product/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        // Log response status and text if the request was not successful
        const errorText = await response.text();
        alert("error: response not ok");
        console.error("Failed to delete item:", response.status, errorText);
        console.log(response.statusText);
        setDeleteItem(false);
        throw new Error("Failed to delete item");
      }

      const data = await response.json();
      setLoading(false);
      alert("Item deleted");
      router.push("/");
      console.log("Item deleted successfully:", data);
    } catch (error) {
      alert("error: server error");
      console.error("Error deleting item: catch", error);
    }
  }

  return (
    <div className=" top-[20rem]  absolute bg-white p-5 flex justify-center items-center flex-col">
      <h2>Are you sure you want to delete this item?</h2>
      <div className="mt-5">
        <button
          className="border mr-5 py-2 px-3 rounded-[7px]"
          onClick={() => setDeleteItem(false)}
        >
          cancel
        </button>
        <button
          className="bg-red-500 text-white py-2 px-3 rounded-[7px]"
          onClick={deleteItem}
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
