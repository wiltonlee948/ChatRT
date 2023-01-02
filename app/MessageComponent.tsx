import { Message } from "../types";
import Image from 'next/image';

type Props = {
  message: Message;
}
function MessageComponent({ message }: Props) {
  return (
    <div className="flex">
        <div className="flex-shrink-0">
          <Image
            className="rounded-full mx-2 object-contain"
            src={message.profilePic}
            height={10}
            width={50}
            alt="Profile Picture"
          />
        </div>

        <div>
          <p className="text-[0.65rem] px-2 pb-2">{message.username}</p>
          <div>
            <div>
              <p>{message.message}</p>
            </div>
          </div>
          <p>{new Date(message.created_at).toLocaleString()}</p>
        </div>
    </div>
  )
}

export default MessageComponent;