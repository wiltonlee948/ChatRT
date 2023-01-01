import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Message } from "../../types";

type Data = {
  message: Message;
}

type ErrorData = {
  body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'POST') {
    res.status(400).json({body: 'Method Not Allowed'})
    return;
  }

  const { message } = req.body;
  const newMessage = {
    ...message,
    // Replace timestamp of user with the timestamp of the server
    created_at: Date.now()
  }
  // push to upstash redis db
  await redis.hset('messages', message.id, JSON.stringify(newMessage))

  res.status(200).json({message: newMessage})
}