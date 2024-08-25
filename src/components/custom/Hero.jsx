import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import TypingEffect from '../ui/TypeEffects';
import Footer from '@/view-trip/component/Footer';

function Hero() {
  return (
    <div>
      <div className='bg-gradient-to-b from-black to bg-gray-700 h-full'>
        <div className='flex flex-col items-center mx-4 md:mx-12 lg:mx-60 gap-9 px-4 md:px-10 lg:px-14 '>
          <h1 className='font-black text-4xl md:text-5xl lg:text-[60px] text-center mt-32  md:mt-16 lg:mt-28'>
            <span className='text-white '>Your Perfect Trip, Curated by AI:</span>{' '}
            <span className='text-black outline-white '>Effortless Itineraries in Seconds.</span>
            <p className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-100 text-center my-4 md:my-6'>
              Travel hassle-free and worry-free.
            </p>
          </h1>
        </div>
      </div>
      <div className='bg-gradient-to-b from-gray-700 to-white'>
        <TypingEffect className='my-6 md:my-8 lg:my-10 ' />
        <Link to={'/create-trip'}>
      
          <Button className='mt-6 md:mt-8 lg:mt-11 rounded-full p-4 md:p-5 lg:p-5 py-3 md:py-4 lg:py-5 hover:scale-110 transition-all   shadow-xl '>
            <h2 className='text-lg md:text-xl lg:text-3xl px-3 py-3'>Plan a trip.</h2>
          </Button>
        </Link>
        <h2 className='font-extrabold text-3xl md:text-4xl lg:text-[50px] mt-12 md:mt-16 lg:mt-20 text-left px-4 md:px-8 lg:px-44'>
          How to Use Wanderly.ai
        </h2>

        <div className='flex flex-col md:flex-row items-center px-4 md:px-10 lg:px-30 ml-2 md:ml-20 lg:ml-32'>
          <img
            src="/map.webp"
            className='w-full h-auto md:w-1/2 lg:w-[500px] md:h-auto lg:h-[500px] mb-8 md:mb-12 lg:mb-16'
            alt='Map'
          />
          <div className='mt-2 md:mt-2 lg:mt-4 ml-0 md:ml-14 lg:ml-20 shadow-xl w-full md:w-[600px] lg:w-[600px] rounded-3xl  bg-white'>
            <h2 className='font-bold text-xl md:text-2xl lg:text-[30px] mt-6 md:mt-10 text-left px-6 md:px-8 lg:px-12'>
              Configure Your Inputs/Needs
            </h2>
            <h2 className='text-gray-400 font-semibold text-base md:text-lg lg:text-[20px] px-6 md:px-8 lg:px-12 py-2 md:py-4 text-left'>
              Input your travel details such as destination, dates, budget. The more specific you are, the better the AI can tailor your itinerary to match your preferences.
            </h2>
            <Link to={'/create-trip'}>
              <Button className='w-full sm:w-[200px] md:w-[400px] h-[50px] rounded-xl hover:scale-105 transition-all my-8'>
                <h2 className='font-semibold text-xl md:text-2xl'>Start Your Journey</h2>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-[url("/back.jpg")] h-full bg-cover'>
        <div className='flex flex-col md:flex-row items-center px-4 md:px-10 lg:px-30 ml-2 md:ml-20 lg:ml-32'>
          <img
            src="/ai.webp"
            className='w-full h-auto md:w-1/2 lg:w-[500px] md:h-auto lg:h-[500px] mb-8 md:mb-12 lg:mb-16'
            alt='AI'
          />
          <div className='mt-2 md:mt-2 lg:mt-0 ml-0 md:ml-14 lg:ml-20 shadow-xl w-full md:w-[600px] lg:w-[600px] rounded-3xl bg-white'>
            <h2 className='font-bold text-xl md:text-2xl lg:text-[30px] mt-6 md:mt-10 text-left px-6 md:px-8 lg:px-12'>
              Wait for the Results
            </h2>
            <h2 className='text-gray-400 font-semibold text-base md:text-lg lg:text-[20px] px-6 md:px-8 lg:px-12 py-2 md:py-4 text-left'>
              After submitting your details, our AI works to create your personalized itinerary. This involves analyzing a wide range of travel data to ensure the best match for your trip. You'll be notified once your custom plan is ready.
            </h2>
            <Link to={'/create-trip'}>
              <Button className='w-full md:w-[400px] h-[50px] md:h-[50px] rounded-xl hover:scale-105 transition-all my-8'>
                <h2 className='font-semibold text-xl md:text-2xl'>Get Started</h2>
              </Button>
            </Link>
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center px-4 md:px-10 lg:px-30 ml-2 md:ml-20 lg:ml-32'>
          <img
            src="/passport.webp"
            className='w-full h-auto md:w-1/2 lg:w-[500px] md:h-auto lg:h-[500px] mb-8 md:mb-12 lg:mb-16'
            alt='Passport'
          />
          <div className='mt-2 md:mt-2 lg:mt-4 ml-0 md:ml-14 lg:ml-20 shadow-xl w-full md:w-[600px] lg:w-[600px] rounded-3xl bg-white'>
            <h2 className='font-bold text-xl md:text-2xl lg:text-[30px] mt-6 md:mt-10 text-left px-6 md:px-8 lg:px-12'>
              Explore Your Trip
            </h2>
            <h2 className='text-gray-400 font-semibold text-base md:text-lg lg:text-[20px] px-6 md:px-8 lg:px-12 py-2 md:py-4 text-left'>
              Review and customize the suggested itinerary. Make any changes to fit your needs, explore additional options, and save the final plan. Get ready to enjoy a journey that's uniquely tailored to you.
            </h2>
            <Link to={'/create-trip'}>
              <Button className='w-full md:w-[400px] h-[50px] md:h-[50px] rounded-xl hover:scale-105 transition-all my-8'>
                <h2 className='font-semibold text-xl md:text-2xl'>Try it out Today</h2>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-white mt-5'>
        <Footer />
      </div>
    </div>
  );
}

export default Hero;
