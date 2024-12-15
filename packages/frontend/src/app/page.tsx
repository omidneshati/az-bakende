"use client";

import { useCallback, useState } from "react";
import { treaty } from "@elysiajs/eden";
import { App } from "../../../backend/src/index";
const app = treaty<App>("http://localhost:3000");

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<string>();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await app.v1.auth.register.post({
          name,
          email,
          password,
        });
        // setResponse(response.data.message);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    [email, name, password]
  );

  return (
    <>
      <form
        className="flex flex-col gap-2 justify-center min-h-72 items-center border-2 border-red-500 rounded-md p-4"
        onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          className="border-2 border-gray-300 rounded-md p-2 text-black"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="border-2 border-gray-300 rounded-md p-2 text-black"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="border-2 border-gray-300 rounded-md p-2 text-black"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Register
        </button>
      </form>
      <div>{response}</div>
    </>
  );
};

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<string>();

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await app.v1.auth.login.post({
          email,
          password,
        });

        console.log(response.data);

        // if (response.data) setResponse(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    [email, password]
  );

  return (
    <>
      <form
        className="flex flex-col gap-2 justify-center min-h-72 items-center border-2 border-red-500 rounded-md p-4"
        onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          className="border-2 border-gray-300 rounded-md p-2 text-black"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="border-2 border-gray-300 rounded-md p-2 text-black"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Login
        </button>
      </form>
      <div>{response}</div>
    </>
  );
}

export default function Home() {
  return (
    <main className="flex h-screen gap-2 items-center justify-center">
      <Login />
      <Register />
    </main>
  );
}
