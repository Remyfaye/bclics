import { getProviders, signIn } from "next-auth/react";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

// import { collection, addDoc } from "firebase/firestore";

export function Signin({ providers }) {
  return (
    <div className="md:max-w-2xl mx-auto p-5" align="center">
      <div className="w-[50px] mt-20 mb-10"></div>

      <span className="text-sm mt-20">
        Welcome to bclics, Log In with your Google Account to create an account
        with us.
      </span>

      <div className="mt-3">
        {Object?.values(providers).map((provider) => (
          <div key={provider.name} className="flex flex-col items-center">
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const Login = () => {
  const [cookie, setCookie] = useCookies(["userId"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [hasCreatedUser, setHasCreatedUser] = useState(false);
  const [error, setError] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreatingUser(true);
    try {
      const response = await fetch("/api/login/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMessage(data.message);
        setCookie("userId", data.user._id);
        setHasCreatedUser(true);
        setEmail("");
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message} Please try again`);
        setEmail("");
        setPassword("");
        setIsCreatingUser(false);
      }
    } catch (error) {
      console.error("Error loggin in:", error);
      setMessage("Error adding user");
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>hi</div>; // Prevent rendering on the server
  }

  return (
    <div className=" p-5  flex flex-col gap-3 lg:max-w-[25rem] max-w-xs mx-auto">
      <h1 className="mt-20 text-primary text-center text-3xl my-5 font-bold">
        Login
      </h1>
      {hasCreatedUser ? (
        <div className="text-center capitalize  bg-white/70 rounded-xl p-5 border mt-4">
          <h3 className="">login successful</h3>
          <button
            className="my-4 border px-4 py-2 rounded-xl shadow-md"
            onClick={() => setError(false)}
          >
            <a href="/">Go to home page</a>
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
            login
          </button>
          <p>{message}</p>

          <p className="text-center mt-2 text-gray-500">
            or login with provider
          </p>
          {/* <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="border py-3 rounded-2xl font-bold mt-2 flex items-center gap-2 justify-center"
        >
          Login with google
        </button> */}
          {/* <Signin /> */}
          <p className="text-center mt-3 text-gray-500">
            Existing account?{" "}
            <Link className="underline" href="/register">
              Register here
            </Link>
          </p>
          {/* </form> */}
        </>
      )}
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
