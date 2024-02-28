import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode, Suspense } from 'react'

import type { Metadata } from 'next'

import Navbar from '@/components/Navbar'
import { AuthProvider } from '../providers/auth'
import Analytics from './analytics'
import { LAYOUT_METADATA } from '@/constants/metaDatas'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = LAYOUT_METADATA

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Suspense>
          <Analytics />
        </Suspense>
        <AuthProvider>
          <div>
            <Navbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
export default RootLayout
