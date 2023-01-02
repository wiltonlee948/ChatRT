import { Message } from "./types";

const fetcher = async () => {
  const res = await fetch('api/getMessages');
  const data = await res.json();
  const messages: Message[] = data.messages;

  return messages;
}

export default fetcher;