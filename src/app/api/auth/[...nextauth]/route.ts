import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'
import bcrypt from 'bcryptjs'

import { connectMongoDB } from '@/libs/mongodb'
import User from '@/models/user'
import { AccountInfoInterface } from '@/types'

type CredentialsType = Pick<AccountInfoInterface, 'email' | 'password'>

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      async authorize(credentials: CredentialsType) {
        if (!credentials) throw new Error('no credentials to log in as')

        const { email, password } = credentials

        try {
          await connectMongoDB()
          const user = await User.findOne({ email })

          if (!user) {
            return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (!passwordsMatch) {
            return null
          }

          return user
        } catch (error) {
          console.log('Error: ', error)
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: `/auth/login`,
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
