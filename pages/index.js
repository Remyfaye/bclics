import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";
import Oraimo from "@/components/recommended/ourServices";
import Recommended from "@/components/recommended/recommended";
import SliderMainPage from "@/components/mainPage/slider";
import Recommendedforu from "@/components/recommended/recommendedforu";
import FeaturedProducts from "@/components/recommended/featuredProducts";
import OurServices from "@/components/recommended/ourServices";
import CategoryDisplay from "@/components/categories/CategoryDisplay";
import { useState } from "react";
import Search from "@/components/navbar/search";
import Post from "@/components/recommended/post";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("eventhub");
    const users = await db.collection("users").find({}).toArray();

    return {
      props: { users: JSON.parse(JSON.stringify(users)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { users: [] },
    };
  }
}

export default function Home() {
  const [results, setResults] = useState([]);

  return (
    <main className="md:max-w-7xl mx-auto p-2 lg:px-[60px]">
      {/* <Toaster> */}
      <Header />

      <Recommended />

      <div className="lg:grid grid-cols-2 gap-10 mt-5 mb-10">
        <OurServices />
        <SliderMainPage />
        {/* <FeaturedProducts />
        <Recommendedforu /> */}
      </div>

      <CategoryDisplay header={"electronics"} color={"bg-primary"} />
      <CategoryDisplay header={"fashion"} color={"bg-primary"} />
      <CategoryDisplay header={"services"} color={"bg-primary"} />
      <CategoryDisplay header={"property"} color={"bg-green-800"} />
      <CategoryDisplay header={"health and beauty"} color={"bg-green-600"} />
      <CategoryDisplay header={"food"} color={"bg-blue-600"} />
      {/* </Toaster> */}
    </main>
  );
}
