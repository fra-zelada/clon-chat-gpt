import { FC, PropsWithChildren } from 'react'

export const Avatar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <figure className='w-[30px] h-[30px] flex items-center justify-center rounded-sm bg-gptlogo '>
      {children}
    </figure>
  )
}
