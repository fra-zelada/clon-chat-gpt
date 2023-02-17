import create from 'zustand'

interface Todo {
  description: string
  completed: boolean
}

interface TodoState {
  todos: Todo[]
  addTodo: (description: string) => void
}

export const useStore = create<TodoState>((set) => ({
  // initial state
  todos: [],
  // methods for manipulating state
  addTodo: (description: string) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
          description,
          completed: false
        } as Todo
      ]
    }))
  }
}))
