import { Message } from "../types";
import Image from 'next/image';

type Props = {
  message: Message;
}
function MessageComponent({ message }: Props) {
  return (
    <div>
        <div>
          <Image
            className="rounded-full mx-2 object-contain"
            src="message.profilePic"
            height={10}
            width={50}
            alt="Profile Picture"
          />
        </div>
    </div>
  )
}

export default MessageComponent;