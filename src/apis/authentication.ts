import { API_URL } from '@/constants/common'

const API_AUTHENTICATION_URL = `${API_URL}/api/authentication`

interface AccountInfoInterface {
  name: string
  email: string
  password: string
}

export const registerAccount = async (accountInfo: AccountInfoInterface) => {
  const res = await fetch(`${API_AUTHENTICATION_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(accountInfo),
  })

  return res
}