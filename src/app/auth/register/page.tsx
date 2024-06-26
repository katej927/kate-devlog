import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import Register from '@/containers/Auth/Register'
import { authOptions } from '@/libs/auth'

const RegisterPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) redirect('/')

  return <Register />
}

export default RegisterPage
