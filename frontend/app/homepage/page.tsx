'use client'

import Cookies from 'js-cookie';
import { RefreshCw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

interface Question {
  title: string
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const Page = () => {

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rotation, setRotation] = useState(0);
  const router = useRouter();

  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([])

  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    setIsRecording(true);
    // Create a new SpeechRecognition instance and configure it
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event: any) => {
    const lastResult = event.results[event.results.length - 1];
    if (lastResult.isFinal) {
      const { transcript } = lastResult[0];
      setTranscript(prevTranscript => [...prevTranscript, transcript]);
  }
};

    // Start the speech recognition
    recognitionRef.current.start();
  };

  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      const question = questions[currentPage].title;
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(question);
      synth.speak(utterance);
    } else {
      console.error('Text-to-speech not supported in this browser.');
    }
  };

  // Cleanup effect when the component unmounts
  useEffect(() => {
    return () => {
      // Stop the speech recognition if it's active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Function to stop recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      // Stop the speech recognition and mark recording as complete
      recognitionRef.current.stop();
      setRecordingComplete(true);
      setTranscript(transcript); // Set the transcript in the state
      // sendTranscriptToBackend(transcript); // Send the transcript to the backend
    }
    // Reset transcript array
  };
  
  // Toggle recording state and manage recording actions
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const sendTranscriptToBackend = (transcript: any) => {

    const token = Cookies.get('authToken');
    console.log(token);

    if (!token) {
      console.error('Token not found');
      return;
    }

    const newtranscript=  transcript.join("");
    console.log(newtranscript);
    
    fetch(`http://127.0.0.1:8000/response/savemessage/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({ transcript:newtranscript }),
    })
      .then((response) => {
        // Handle the response from the backend, if needed
        if (response.ok) {
          console.log('Transcript sented successfully');
          toast.success('Response saved');
          setTranscript([]);
        }
        else {
          console.log('Error sending transcript');
          toast.error('Error saving response');
        }
      })
      .catch((error) => {
        // Handle errors, if any
        console.error('Error while sending transcript', error);
        toast.error('Error saving response');
      });
  };

  const rotateIcon = () => {
    setRotation(rotation + 360); // Rotate by 360 degrees (1 full rotation)
    speakQuestion();
    setTranscript([]);
  };

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/question/getQuestionaire/');

        if (response.status === 200) {
          // Sort the questions by ID in ascending order
          const sortedQuestions = response.data.questionnaires.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
          setQuestions(sortedQuestions);
        } else {
          console.error("Failed to fetch questions");
        }

      } catch (error) {
        console.error("Error fetching questions", error);
      }
    }

    fetchQuestions();
  }, []);

  const nextPage = () => {
    if (currentPage < questions.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const submitQuestion = () => {
    if (transcript.length === 0) {
      toast.error('Please record a response');
    }
    else {
      setTranscript(transcript);
      sendTranscriptToBackend(transcript);
      if (currentPage < questions.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleLogout = () => {
    Cookies.set('authToken', '')
    router.push('/login')
  }

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
        <div className='flex p-10 justify-between font-bold text-xl'>
          <div className='flex'>
            <RefreshCw
              onClick={() => {
                rotateIcon();

              }}
              className='cursor-pointer'
              style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 1s' }}
            />
          </div>
          <div>
            <button
              className='w-7 h-7'
              onClick={previousPage}
              title='previous page'
            >
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path fill="#000000" d="m16 8l1.43 1.393L11.85 15H24v2H11.85l5.58 5.573L16 24l-8-8l8-8z"/>
                <path fill="#000000" d="M16 30a14 14 0 1 1 14-14a14.016 14.016 0 0 1-14 14Zm0-26a12 12 0 1 0 12 12A12.014 12.014 0 0 0 16 4Z"/>
              </svg>
            </button>
            <button
              className='w-7 h-7'
              onClick={nextPage}
            >
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path fill="#000000" d="m16 8l-1.43 1.393L20.15 15H8v2h12.15l-5.58 5.573L16 24l8-8l-8-8z"/>
                <path fill="#000000" d="M16 30a14 14 0 1 1 14-14a14.016 14.016 0 0 1-14 14Zm0-26a12 12 0 1 0 12 12A12.014 12.014 0 0 0 16 4Z"/>
              </svg>
            </button>
          </div>
          <div>
            <h1>{currentPage + 1}/{questions.length}</h1>
          </div>
        </div>
        {/* Main Content */}
        <div className='text-center justify-center px-6 sm:px-36 py-2 overflow-auto'>
          {currentPage < questions.length && (
            <div>
              <h1 className='font-bold text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>{questions[currentPage].title}</h1>
            </div>
          )}
          <h2 className='font-normal text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-[4%] overflow-auto'>
            {transcript && (
              <div className="rounded-md p-2 h-[20vh] mt-4 ">
                <p className="mb-0">{transcript}</p>
              </div>
            )}
          </h2>
        </div>
        
        {/* Microphone */}
        <div className="flex flex-col mt-32 items-center w-full">
          <div className="flex-1 flex">
            {isRecording ? (
              // Button for stopping recording
              <button
                onClick={handleToggleRecording}
                className="m-auto flex items-center fixed left-0 right-0 bottom-5 justify-center bg-red-400 hover:bg-red-500 rounded-full w-20 h-20 focus:outline-none"
              >
                <svg
                  className="h-12 w-12 "
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </button>
            ) : (
              // Button for starting recording
              <button
                onClick={handleToggleRecording}
                className="m-auto flex items-center fixed left-0 right-0 bottom-5 justify-center bg-yellow-400 hover:bg-yellow-500 rounded-full w-20 h-20 focus:outline-none"
              >
                <svg
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-white"
                >
                  <path
                    fill="currentColor"
                    d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                  />
                </svg>
              </button>
            )}
            <button
              className='m-auto flex absolute bottom-5 right-5 items-center justify-center bg-yellow-400 ml-10 hover:bg-yellow-500 rounded-full w-12 h-12 focus:outline-none'
              onClick={submitQuestion}
            >
              <svg width="128" height="128" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fff" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Page;
