import { fetchProductById } from "@/lib/fetchData";
import { NGnaira } from "@/lib/help";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Items({ name, item, index, removeItem }) {
  return (
    <div
      className="flex space-x-5 p-3"
      style={{ borderBottom: "2px solid #ededed" }}
    >
      <img className="w-[150px] h-[150px]" src={item.image} alt={item.title} />

      <div>
        <span className="text-sm line-clamp-2 text-black">
          <Link href={`/product/${item.id}`} className="hover:underline">
            {name}
          </Link>
        </span>

        <p className="text-gray-400 text-sm capitalize">
          {item.units === 0 ? (
            <span className="text-red-700 text-sm">Out of Stock</span>
          ) : (
            <>In Stock</>
          )}
        </p>

        <p>
          {!item.price ? (
            <span className="text-green-800 text-sm">Free Delivery</span>
          ) : (
            <span className="text-gray-500 text-sm">
              {NGnaira.format(item.price)}
            </span>
          )}
        </p>

        <button
          className="btn btn-warning btn-sm btn-outline mt-3"
          onClick={() => removeItem(index)}
        >
          <DeleteIcon /> REMOVE
        </button>
      </div>

      <div className="hidden md:inline">
        <b className="text-xl">{NGnaira.format(item.price)}</b>
      </div>
    </div>
  );
}
