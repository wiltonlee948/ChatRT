'use client'
import { FormEvent, useState } from "react";
// creates a unique id
import { v4 as uuid } from 'uuid';
import { Message } from "../types";
// allows you to fetch and then cache that data so you dont need to make additional requests
import useSWR from 'swr';
import fetcher from "../fetchMessages";

function ChatInput() {
  const [input, setInput] = useState('');
  // useSWR(key to access cache, fetcher)
  const { data, error, mutate } = useSWR('/api/getMessages', fetcher);

  console.log('DATA', data);
  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    const inputToSend = input;
    setInput("");

    const id = uuid();
    const message: Message = {
      id,
      message: inputToSend,
      created_at: Date.now(),
      username: 'Elon Musk',
      profilePic: 'https://links.papareact.com/jne',
      email: 'test@gmail.com',
    }

    const uploadMessageToUpstash = async() => {
      try {
        const res = await fetch('/api/addMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message,
          })
        });

        const resData = await res.json();
        //using the bang operator to make sure that data is not undefined
        return [resData.message, ...data!]
      } catch (error) {
        console.log(error);
      }
    };
    // passing function to mutate will invoke function and its return value is used to update cache
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...data!],
      rollbackOnError: true,
    })
  }

  return (
    <form onSubmit={addMessage} className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="
          flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600
          focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed
        "
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  )
}

export default ChatInput;