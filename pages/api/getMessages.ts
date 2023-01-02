import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Message } from "../../types";

type Data = {
  messages: Message[];
}

type ErrorData = {
  body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'GET') {
    res.status(400).json({body: 'Method Not Allowed'})
    return;
  }
  // retrieves all the messages from redis db
  const messagesRes = await redis.hvals('messages')
  // sort messages in ascending order
  const messages: Message[] = messagesRes.map(message => JSON.parse(message)).sort((a, b) => b.created_at - a.created_at)

  res.status(200).json( { messages })
}