"use client";

import { useCallback, useEffect, useState } from "react";
import { treaty } from "@elysiajs/eden";
import type { App } from "../../../backend/src/index";

const client = treaty<App>("http://localhost:3000");

type User = {
  id: string;
  name: string;
  email: string;
};

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>();

  const fetchUsers = async () => {
    const users = await client.index.get();
    setUsers(users.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const data = await client.index.post({
          name,
          email,
          password,
        });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    [email, name, password]
  );

  return (
    <main>
      <form
        className="flex flex-col gap-2 justify-center items-center h-screen border-2 border-red-500 rounded-md p-4"
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
          Save
        </button>

        <div className="flex flex-col gap-2">
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={() => {
              fetchUsers();
            }}>
            Fetch Users
          </button>
          <ul>
            {users?.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      </form>
    </main>
  );
}
