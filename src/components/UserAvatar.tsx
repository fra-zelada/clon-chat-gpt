export const UserAvatar = () => {
  return (
    <picture>
      <img src={`${process.env.NEXT_PUBLIC_PROFILE_PIC}`} alt='mi imagen' />
    </picture>
  )
}
