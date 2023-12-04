'use client'

import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import Image from 'next/image';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');
  const [accountType, setAccountType] = useState('');
  const session = useSession();

  const router = useRouter()

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:4000/users/create-user', {
        name: username,
        email,
        password,
        amount: amount,
        accountType: accountType,
      });

      if (response.status === 200) {
        toast.success('Signup successful');
        router.push('/login');
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <div className='flex flex-col md:flex-row h-screen bg-gradient-to-b from-slate-50 to-gray-200'>
      <div className="w-full md:w-1/2 flex flex-col">
        <div className='flex justify-between px-5 py-5'>
          <div className='flex'>
            <Image 
              src='/bank.png'
              alt='Bank ABC'
              width={32}
              height={32}
              className='mr-2'
            />
            <h1 className='text-black ml-2 font-semibold text-2xl'>Bank ABC</h1>
          </div>
          <Link href="/login" className="text-sm mt-1.5 tracking-wider font-semibold text-black text-center underline">Back to login</Link>
        </div>
        <div className="text-center border-gray-300 p-8">
          <h2 className="text-3xl text-black font-semibold mb-2">Open Account</h2>
          <p className="text-md text-black mb-4">Create a new account</p>

          <div className="md:w-64 lg:w-80 mx-auto">
            <div className="mb-4">
              <Input className="w-full px-3 py-2 border bg-gray-100 text-black rounded-lg placeholder-gray-900 focus:outline-none border-gray-400" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-4">
              <Input className="w-full px-3 py-2 border bg-gray-100 text-black rounded-lg placeholder-gray-900 focus:outline-none border-gray-400" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  />
            </div>
            <div className="mb-4">
              <Input className="w-full px-3 py-2 border bg-gray-100 text-black rounded-lg placeholder-gray-900 focus:outline-none border-gray-400" type="password" placeholder="Password" value={[password]} onChange={(e) => setPassword(e.target.value)}  />
            </div>
            <div className="mb-4">
              <Input className="w-full px-3 py-2 border bg-gray-100 text-black rounded-lg placeholder-gray-900 focus:outline-none border-gray-400" type="number" placeholder="Deposit Amount" value={[amount]} onChange={(e) => setAmount(e.target.value)}/>
            </div>
            <div className="mb-4">
              <select
                className="w-full px-3 py-2 border bg-gray-100 text-black rounded-lg placeholder-gray-900 focus:outline-none border-gray-400"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="">Select Account Type</option>
                <option value="current">Current</option>
                <option value="savings">Savings</option>
              </select>
            </div>

            <Button onClick={handleSignup} className="w-full px-3 py-2 border font-semibold text-gray-100 bg-black rounded-lg focus:outline-none focus:border-gray-900">
              Sign up
            </Button>
            
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 md:block hidden">
        <Image 
          className="object-cover w-full h-screen" 
          src="/bankbg.jpeg" 
          alt="Signup Image" 
          width={500}
          height={500}
        />
      </div>

    </div>
  );
};

export default Signup;
