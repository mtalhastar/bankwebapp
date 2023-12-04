'use client'

import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  return (
    <div className='flex flex-col md:flex-row h-screen bg-gradient-to-b from-slate-50 to-gray-200'>
      {/* <Navbar /> */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className='flex justify-between px-5 py-5'>
          <div className='flex'>
            <img src="/logo.png" alt="Mind Care Icon" className="w-8 h-8 inline mr-2" />
            <h1 onClick={() => router.push('/login')} className='text-black font-semibold text-2xl cursor-pointer'>Mind Care</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
