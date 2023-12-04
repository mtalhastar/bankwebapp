import './globals.css'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/components/AuthProvider'

const inter = Poppins({
  subsets: ['latin'],
  weight: '400'
})

export const metadata = {
  title: 'Banking App',
  description: 'Banking App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head className='bg-gradient-to-b from-slate-50 to-gray-200'>
        <body className={inter.className}>
          <AuthProvider>
            <Toaster />
            {children}
          </AuthProvider>
        </body>
      </head>
    </html>
  )
}
