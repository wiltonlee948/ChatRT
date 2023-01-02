'use client'

import useSWR from 'swr';
import fetcher from '../fetchMessages';
import { Message } from '../types';
import MessageComponent from './MessageComponent';


function MessageList() {
  const { data } = useSWR<Message[]>('/api/getMessages', fetcher);

  const messages = data?.map(message => {
    return <MessageComponent key={message.id} message={message} />
  });

  return (
    <div>
      {messages}
    </div>
  )
}

export default MessageList;