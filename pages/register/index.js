"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Image from "next/image";

// import { collection, addDoc } from "firebase/firestore";

const Register = () => {
  const [cookie, setCookie] = useCookies(["userId"]);

  const session = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [hasCreatedUser, setHasCreatedUser] = useState(false);
  const [notLoggedin, setNotLoggedin] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    console.log(session?.data?.user);
    setUser(session?.data?.user);
    if (session?.status === "authenticated") {
      const googleAuth = async () => {
        const response = await fetch("/api/users/googleAuth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user }),
        });

        if (response.ok) {
          setHasCreatedUser(true);
          setIsCreatingUser(true);
        }
        console.log(user);
        console.log(response);
      };

      router.push("/");
      googleAuth();
    }
  }, [user, session, session?.data?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreatingUser(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ googleUser, password, email }),
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

      console.log(user);
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Error adding user");
      setError(true);
    }
  };

  return (
    <>
      {/*  */}

      <div className="md:max-w-2xl pt-10 mx-auto p-5" align="center">
        <div className="w-[50px] mt-20 mb-10"></div>

        <span className="text-sm mt-20">
          Welcome to bclics, Log In with your Google Account to create an
          account with us.
        </span>

        <div className="pt-5">
          <button
            onClick={() => signIn("google")}
            className="border px-4 border-black py-3 rounded-2xl font-bold mt-2 flex items-center gap-2 justify-center"
          >
            <Image src="/google.jpg" alt="img" width={32} height={32} />
            {/* <FcGoogle className="text-2xl" /> */}
            Login with google
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
