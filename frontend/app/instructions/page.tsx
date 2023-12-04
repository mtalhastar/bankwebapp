'use client'

import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Page = () => {

  const router = useRouter();

  const handleLogout = () => {
    Cookies.set('authToken', '')
    router.push('/login')
  }

const startTest = () => {
    // show loading toast for 2 seconds
    toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
            loading: 'Starting Test',
            success: 'Test Started',
            error: 'Failed to Start Test',
        }
    );
    setTimeout(() => {
        router.push('/homepage');
    }, 2000);

};

const leaveTest = () => {
    toast.success('Test Left');
    router.push('/');
};

return (
    <div>
        <Button
            className='absolute top-5 rounded-lg px-5 right-5 bg-black'
            onClick={handleLogout}
        >
            <h1 className='text-white'>Logout</h1>
        </Button>
    
        <div className='h-screen sm:px-28 pt-20 pb-10 xs:px-5 items-center justify-center bg-gradient-to-b from-slate-50 to-gray-200'>
      
            <div className='bg-gradient-to-b from-emerald-200 to-emerald-500 h-full w-full rounded-3xl relative'>
                
                {/* Top Bar */}
                <div className='flex px-10 pt-10 pb-5 justify-center font-bold text-xl'>
                    <Star className='text-black' size={25} fill='#000000' />
                    <h1 className='text-[30px] mx-4'>INSTRUCTIONS</h1>
                    <Star className='text-black' size={25} fill='#000000' />
                </div>

                {/* Main Content */}
                <div className='text-center justify-center px-6 sm:px-36 py-2'>
                    <h2 className='text-2xl font-semibold mb-4'>Read the instructions carefully</h2>
                    <ol className='text-left list-decimal pl-5 overflow-auto max-h-480 sm:max-h-300'>
                        <li className='mt-2'>Ensure that you are in a quiet and distraction-free environment.</li>
                        <li className='mt-2'>Read each question carefully before providing your answer.</li>
                        <li className='mt-2'>Answer each question to the best of your ability.</li>
                        <li className='mt-2'>There is no time limit, so take your time to consider your responses.</li>
                        <li className='mt-2'>Click <button className='rounded-lg px-5 bg-amber-500'>Start Test</button> when you are ready to begin.</li>
                        <li className='mt-2'>Click <button className='rounded-lg px-5 bg-red-500 text-white'>Leave</button> to leave the test.</li>
                        <li className='mt-2'>Once you start the questionnaire you cannot leave it before completing</li>
                        <li className='mt-2'>You will be able to see your results once you have completed the questionnaire.</li>
                    </ol>
                </div>
            
                {/* Buttons */}
                <div className="flex mt-32 justify-between px-16 w-full">
                    {/* Previous Button */}
                    <Button onClick={leaveTest} variant='destructive' className='rounded-lg px-5 absolute bottom-5 left-5'>
                        <h1 className='font-bold'>Leave</h1>
                    </Button>

                    {/* Next Button */}
                    <Button onClick={startTest} className='rounded-lg px-5 absolute bottom-5 right-5 bg-amber-400 hover:bg-amber-500'>
                        <h1 className='font-bold text-black'>Start Test</h1>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Page;
