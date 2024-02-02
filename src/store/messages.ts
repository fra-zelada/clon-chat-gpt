import { create } from 'zustand'

interface Message {
  id: number
  ia: boolean
  message: string
}
interface IMessage {
  messages: Message[]
  sendPrompt: (prompt: string) => void
}

export const useMessageStore = create<IMessage>((set, get) => ({
  messages: [
    // { id: Date.now() + Math.random(), ia: false, message: 'Mi pregunta' },
    // {
    //   id: Date.now() + Math.random(),
    //   ia: true,
    //   message:
    //   'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti ullam tempora nobis voluptates eos quam dolor, ducimus delectus cum excepturi! Eveniet quas iusto voluptatum, amet deleniti incidunt quasi eum provident dignissimos nihil vero consequuntur rerum quia aperiam, aliquam modi inventore, a rem sed illum? Asperiores, ratione. Magni, expedita cupiditate! Minima?'
    // }
  ],
  // messages: [],
  sendPrompt: async (prompt: string) => {
    const messageIAId = get().messages.length + 2

    set((state) => ({
      messages: [
        ...state.messages,
        {
          ia: false,
          id: state.messages.length,
          message: prompt
        },
        {
          ia: true,
          id: messageIAId,
          message: ''
        }
      ]
    }))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      })

      const json = await response.json()

      set((state) => ({
        messages: state.messages.map((entry) => {
          if (entry.id === messageIAId) {
            return {
              ...entry,
              message: json.response
            }
          } else {
            return entry
          }
        })
      }))
    } catch (error) {
      console.error(error)
    }
  }
}))
