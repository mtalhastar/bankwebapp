'use client'

import Link from 'next/link';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const page = () => {

    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const [newPassword, setNewPassword] = useState('');
    const router = useRouter();

    const handlePasswordChange = async () => {
      try {
        const data = {
          vcode: otpDigits.join(''),
          password: newPassword,
        };

        // Convert the data object to a JSON string.
        const jsonData = JSON.stringify(data);

        // Make an API request to update the password.
        const response = await axios.post('http://127.0.0.1:8000/change_password/', jsonData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });


        // Handle the response from the server.
        if (response.status === 200) {
          toast.success('Password changed successfully');
          router.push('/login');
          // Password change was successful.
          // You can redirect the user to a success page or perform other actions.
        } else {
          toast.error('Incorrect OTP');
          // Handle the error (e.g., display an error message).
        }
      } catch (error) {
        toast.error('Incorrect OTP');
    }
    };   

    const handleOtpChange = (index, value) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtpDigits = [...otpDigits];
            newOtpDigits[index] = value;
            setOtpDigits(newOtpDigits);

            if (index < inputRefs.current.length - 1 && value !== '') {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleBackspace = (index) => {
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = '';
        setOtpDigits(newOtpDigits);

        if (index > 0) {
            inputRefs.current[index - 1].focus();
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
          <h2 className="text-3xl text-black font-semibold mb-2 mt-28">OTP</h2>

          <div className="md:w-64 lg:w-80 mx-auto">

            <div className="ml-1 my-8 flex">
                {otpDigits.map((digit, index) => (
                    <Input
                        key={index}
                        size={1}
                        ref={(el) => (inputRefs.current[index] = el)} 
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(event) => handleOtpChange(index, event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Backspace' && digit === '') {
                                event.preventDefault();
                                handleBackspace(index);
                            }
                        }}
                    />
                ))}
            </div>

            <div className="my-8">
              <Input 
                className="w-full px-3 py-2 border bg-gray-100 text-black rounded-lg placeholder-gray-900 focus:outline-none border-gray-400" 
                type="text" 
                value={newPassword} 
                placeholder="New Password" 
                onChange={(e) => setNewPassword(e.target.value)} 
              />
            </div>

            <Button onClick={handlePasswordChange} className="w-full px-3 py-2 border font-semibold text-gray-100 bg-black rounded-lg focus:outline-none focus:border-gray-900">
              Submit
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

export default page;
