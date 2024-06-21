import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function RecomHeader({ title, color, seeAll }) {
  const router = useRouter();

  return (
    <div
      className={`${color} p-3 rounded-t-lg text-xl text-white  flex justify-between`}
    >
      <h2 className="upp uppercase lg:mx-auto">{title}</h2>
      <a href={`/allProducts/${title}`} className="text-sm cursor-pointer">
        see all {">"}
      </a>
    </div>
  );
}
