"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Image from "next/image";

// import { collection, addDoc } from "firebase/firestore";

const Register = () => {
  const [cookie, setCookie] = useCookies(["userId"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [hasCreatedUser, setHasCreatedUser] = useState(false);
  const [notLoggedin, setNotLoggedin] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreatingUser(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`User added successfully`);
        setCookie("userId", data.user._id);
        setHasCreatedUser(true);
        // setName('');
        setEmail("");
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
        setNotLoggedin(true);
        setError(true);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Error adding user");
      setError(true);
    }
  };

  const handleProcess = async () => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });
    const data = await response.json();
    setUser(data.processedData);
    console.log(user);
  };

  // const handleCreateUser = async (e) => {
  //   setIsCreatingUser(true);
  //   // const response = await fetch("/api/auth/register", {
  //   //   method: "POST",
  //   //   body: JSON.stringify({ email, password }),
  //   //   headers: { "Content-Type": "application/json" },
  //   // });
  //   // // setHasCreatedUser(true);

  //   // const data = await response.json();

  //   // setIsCreatingUser(false);
  //   // console.log(data);
  //   // if (response.status === 200) {
  //   //   setHasCreatedUser(true);
  //   // } else {
  //   //   setError(true);
  //   // }
  // };

  return (
    <section className=" p-5  flex flex-col gap-3 lg:max-w-[25rem] max-w-xs mx-auto">
      <h1 className="mt-20 text-primary text-center text-3xl my-5 font-bold">
        Register
      </h1>
      {hasCreatedUser && !error && (
        <div className="text-center capitalize text-sm my-3">
          <p className="mb-5">registrstion complete</p>
          {/* <div className="mt-2">
            you can now
            <Link
              className="underline text-lg text-blue-700 ml-1"
              href="/login"
            >
              Login
            </Link>{" "}
          </div> */}
          <a
            className=" border px-3 py-3 rounded-lg shadow-lg bg-white/70"
            href="/"
          >
            Go to home page
          </a>
        </div>
      )}
      {error ? (
        <div className="text-center capitalize  bg-white/70 rounded-xl p-5 border mt-4">
          <h3 className="">an error occured.</h3>
          <button
            className="my-4 border px-4 py-2 rounded-xl shadow-md"
            onClick={() => setError(false)}
          >
            <a href="/register">click here to try again</a>
          </button>
        </div>
      ) : (
        <>
          {/* <form> */}
          <input
            disabled={isCreatingUser}
            type="text"
            className="rounded-[7px]"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            disabled={isCreatingUser}
            placeholder="password"
            className="rounded-[7px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="border py-3 rounded-2xl capitalize text-white bg-primary"
            disabled={isCreatingUser}
          >
            register
          </button>
          {message}

          <div className="text-center mt-3 text-gray-500">
            Existing account?{" "}
            <Link className="underline" href="/login">
              Login here
            </Link>
          </div>
          {/* </form> */}
        </>
      )}
    </section>
  );
};

export default Register;
