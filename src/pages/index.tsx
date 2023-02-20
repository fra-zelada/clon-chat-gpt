import { Avatar } from '@/components/Avatar'
import { ChatGPTLogo, PlusIcon, SendIcon } from '@/components/Icons'
import { TypingEffect } from '@/components/TypingEffect'
import Head from 'next/head'
import {
  FC,
  FormEvent,
  PropsWithChildren,
  useRef,
  KeyboardEvent,
  useEffect
} from 'react'
import { useMessageStore } from '../store/messages'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Clon Chat GPT</title>
      </Head>
      <div className='w-full relative bg-gptgray h-screen'>
        <Aside />
        {children}
      </div>
    </>
  )
}

const Aside = () => {
  return (
    <aside className='bg-gptdarkgray fixed flex w-64 h-screen flex-col z-10'>
      <nav className='flex flex-col flex-1 h-full p-2 space-y-1'>
        <button className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20'>
          <PlusIcon />
          New chat
        </button>
      </nav>
    </aside>
  )
}

interface MessageProps {
  ia: boolean
  message: string
}

const UserAvatar = () => {
  return (
    <picture>
      <img src={`${process.env.NEXT_PUBLIC_PROFILE_PIC}`} alt='mi imagen' />
    </picture>
  )
}

const Message: FC<MessageProps> = ({ ia, message }) => {
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

export const ChatForm = () => {
  const sendPrompt = useMessageStore((state) => state.sendPrompt)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (
    event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault()
    const value = textAreaRef.current!.value.trim()
    if (!value) return
    sendPrompt(value)
    textAreaRef.current!.value = ''
  }

  const handleChange = () => {
    const el = textAreaRef.current
    el!.style.height = '0px'
    const scrollHeight = el?.scrollHeight
    el!.style.height = scrollHeight + 'px'
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <section className=' mt-auto w-full bg-gptgray'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-row max-w-3xl pt-6 m-auto mb-6 '
      >
        <div className='relative flex flex-col flex-grow w-full px-4 py-3 text-white border rounded-md shadow-lg bg-gptlightgray border-gray-900/50'>
          <textarea
            onChange={handleChange}
            onKeyDown={(event) => {
              handleKeyDown(event)
            }}
            ref={textAreaRef}
            rows={1}
            tabIndex={0}
            autoFocus
            defaultValue=''
            className='w-full h-[24px] resize-none bg-transparent m-0 border-0 outline-none'
          />
          <button
            className='absolute p-1 rounded-md
          bottom-2.5 right-2.5'
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </section>
  )
}

const Chat = () => {
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

export default function Home() {
  return (
    <Layout>
      <Chat />
    </Layout>
  )
}

// create a js iterator
