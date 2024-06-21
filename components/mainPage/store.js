import Link from "next/link";

export default function Store({ name, desc, url, id }) {
  return (
    <>
      <div
        className="bg-gray-600 lg:h-[15rem] rounded-b-xl h-[13rem] px-9 flex items-center carousel-item w-full text-white  p-2"
        id={id}
      >
        {/* <h2 className="text-2xl capitalize ">official store</h2> */}

        <span className="capitalize mr-[2rem]   lg:w-[50%]">
          <h2 className="text-xl font-bold ">{name}</h2>
          <h2 className="text-sm font-thin text-gray-300  mt-4 ">{desc}</h2>
        </span>

        <img
          src={url}
          className=" max-w-[10rem]  lg:max-w-[15rem] rounded-xl lg:h-[9rem] h-[7rem] object-cover"
          alt="Image"
        />
      </div>
    </>
  );
}
