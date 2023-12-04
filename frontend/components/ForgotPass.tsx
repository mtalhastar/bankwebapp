'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';

const ForgotPass = () => {

  const router = useRouter()
  const [username, setUsername] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/forgot_password/', {
        username
      });

      if (response.status == 200) {
        toast.success("Code sent successfully!");
        router.push('/otp')
      }

      if (response.status == 500) {
        toast.error("Server timed out!");
      }

      // Assuming the response contains a token and user data
      const { token, serializer } = response.data;

    } catch (error) {
      toast.error("Code sending failed");
      // Handle login error
    }
  };

  return (
    <div className='flex flex-col md:flex-row h-screen bg-gradient-to-b from-slate-50 to-gray-200'>
      <div className="w-full md:w-1/2 flex flex-col">
        <div className='flex justify-between px-5 py-5'>
          <div className='flex'>
            <Image 
              src='/logo.png'
              alt='Mindcare Logo'
              width={32}
              height={32}
              className='mr-2'
            />
            <h1 className='text-black ml-2 font-semibold text-2xl'>Mind Care</h1>
          </div>
          <Link href="/login" className="text-sm mt-1.5 tracking-wider font-semibold text-black text-center underline">Back to login</Link>
        </div>
        <div className="text-center border-gray-300 p-8">
          <h2 className="text-3xl text-black font-semibold mb-2 mt-28">Forgot Password</h2>

          <div className="md:w-64 lg:w-80 mx-auto">

            <div className="my-8">
              <Input className="w-full px-3 py-2 border bg-gray-100 text-black rounded-lg placeholder-gray-900 focus:outline-none border-gray-400" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            </div>

            <Button onClick={handleForgotPassword}  className="w-full px-3 py-2 border font-semibold text-gray-100 bg-black rounded-lg focus:outline-none focus:border-gray-900">
              Send Code
            </Button>
            
            
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 md:block hidden">
        <Image 
          className="object-cover w-full h-screen" 
          src="/signup.jpg" 
          alt="Signup Image" 
          width={500}
          height={500}
        />
      </div>

    </div>
  );
};

export default ForgotPass;
