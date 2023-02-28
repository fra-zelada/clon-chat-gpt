import { useMessageStore } from '@/store/messages'
import { useEffect, useRef } from 'react'
import { ChatForm, Message } from '.'

export const Chat = () => {
  const messages = useMessageStore((state) => state.messages)
  const dummy = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (dummy.current !== null) {
      dummy.current!.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className='flex flex-col h-full flex-1 pl-64'>
      <main>
        {messages.map(({ id, ia, message }) => (
          <Message key={id} ia={ia} message={message} />
        ))}

        <p ref={dummy} />
      </main>
      <ChatForm />
    </div>
  )
}
