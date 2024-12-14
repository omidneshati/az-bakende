"use client";

import { useCallback, useState } from "react";
import { treaty } from "@elysiajs/eden";
import type { App } from "../../../backend/src/index";

const client = treaty<App>("http://localhost:3000");

export default function Home() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");

  // const base_url = "http://localhost:3000";

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        // const response = await fetch(`${base_url}/`, {
        //   method: "POST",
        //   body: JSON.stringify({ data: name }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });

        const data = await client.index.post({
          data: name,
        });

        // const data = await response.json();
        setResponse(data.data.message);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    [name]
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
        <button type="submit">Save</button>
        <p className="text-white">{response}</p>
      </form>
    </main>
  );
}
