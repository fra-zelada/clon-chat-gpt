import { FC } from 'react'
import { Avatar, TypingEffect, UserAvatar } from '.'
import { ChatGPTLogo } from './Icons'
interface MessageProps {
  ia: boolean
  message: string
}

export const Message: FC<MessageProps> = ({ ia, message }) => {
  const avatar = ia ? <ChatGPTLogo /> : <UserAvatar />

  const textElement = ia ? <TypingEffect text={message} /> : message

  return (
    <div
      className={` text-gray-100 ${ia ? 'bg-gptlightgray' : 'bg-gptgray'}  ' `}
    >
      <article className=' flex gap-4 p-4 m-auto max-w-3xl'>
        <Avatar>{avatar}</Avatar>
        <div className='min-h-[20px] flex flex-1 flex-col items-start gap-4 whitespace-pre-wrap'>
          <div className='prose-invert w-full break-words'>
            <p>{textElement}</p>
          </div>
        </div>
      </article>
    </div>
  )
}
