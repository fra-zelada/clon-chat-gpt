import { useMessageStore } from '@/store/messages'
import { FormEvent, useRef, KeyboardEvent } from 'react'
import { SendIcon } from './Icons'

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
