// components/Search.js

import { menuEmpty } from "@/constants";
import Link from "next/link";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

const Search = ({ onResults }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const results = menuEmpty.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );

      onResults(results);
      console.log(results);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <>
      <div className="lg:flex px-3 hidden py-1 items-center border border-primary rounded-xl ">
        <Link href={`/allProducts/${query}`}>
          <div className="text-gray-400 ">
            <SearchIcon fontSize="medium" />
          </div>
        </Link>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          // onChange={getSearchedProduct}
          placeholder="SEARCH"
          className=" border-none w-full outline-none max-w-md  my-auto hidden lg:inline"
        />
      </div>

      <div className="lg:hidden flex">
        {isSearch ? (
          <>
            <div className="flex px-3 w-[13rem] py-1 items-center border border-primary rounded-xl ">
              <Link href={`/allProducts/${query}`}>
                <div className="text-gray-400 ">
                  <SearchIcon fontSize="medium" />
                </div>
              </Link>
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                // on={() => router.push(`/allProducts/${query}`)}
                placeholder="SEARCH"
                className=" border-white outline-white  w-full  max-w-md  my-auto  lg:inline"
              />
            </div>
          </>
        ) : (
          <div
            onClick={() => setIsSearch(!isSearch)}
            className="text-gray-400 cursor-pointer"
          >
            <SearchIcon
              // onClick={() => setIsSearch(!isSearch)}
              fontSize="medium"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
