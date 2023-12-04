'use client'

import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import Image from 'next/image';
import { Input } from './ui/input';
import { Label } from './ui/label';

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const session = useSession();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/users/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        toast.success('Logged in successfully');

        const token = response.data.user.name;
        localStorage.setItem('token', token)
        
        console.log(token);

        router.push('/questions');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };
  
  return (
    <div className='flex flex-col md:flex-row h-screen bg-gradient-to-b from-slate-50 to-gray-200'>
      <div className="w-full md:w-1/2 flex flex-col">
        <div className='flex justify-between px-5 py-5'>
          <div className='flex'>
            <Image 
              src='/bank.png'
              alt='ABC Bank'
              width={32}
              height={32}
              className='mr-2'
            />
            <h1 className='text-black ml-2 font-semibold text-2xl'>Bank ABC</h1>
          </div>
          <Link href="/signup" className="text-sm mt-1.5 tracking-wider font-semibold text-black text-center underline">Create an account</Link>
        </div>
        <div className="text-center border-gray-300 p-8 mt-4 md:mt-6">
          <h2 className="text-3xl text-black font-semibold mb-2">Welcome back</h2>
          <p className="text-md text-black mb-4">Enter your account details</p>

          <div className="md:w-64 lg:w-80 mx-auto">
            <div className="mb-4">
              <Input className="w-full px-3 py-2 border bg-gray-100 text-black rounded-lg placeholder-gray-900 focus:outline-none border-gray-400" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className="mb-2">
              <Input className="w-full px-3 py-2 border bg-gray-100 text-black rounded-lg placeholder-gray-900 focus:outline-none border-gray-400" type="password" placeholder="Password" value={[password]} onChange={(e) => setPassword(e.target.value)}  />
            </div>

            <Button onClick={handleLogin} className="w-full px-3 py-2 border font-semibold text-gray-100 bg-black rounded-lg focus:outline-none focus:border-gray-900">
              Log In
            </Button>

          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 md:block hidden">
        <Image 
          className="object-cover w-full h-screen" 
          src="/bankbg.jpeg" 
          alt="Login Image" 
          width={500}
          height={500}
        />
      </div>

    </div>
  );
};

export default Login;
