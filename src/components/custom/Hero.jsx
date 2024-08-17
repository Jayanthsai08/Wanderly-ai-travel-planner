import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-column items-center mx-55 gap-9'>
      <h1
        className='font-extrabold text-[45px] text-center mt-16'>
      <span className='text-[#680fa0bc]'>Your Perfect Trip, Curated by AI:</span> Effortless Itineraries in Seconds
      
      <p className='text-xl font-medium text-gray-500 text-center mt-5'>Your personal trip planner and travel curator, creating custom itinereries tailored to your interests and budget</p>
      
      <Link to={'/create-trip'}>
      <Button>Plan a trip.</Button>
      </Link>
      </h1> 
    </div>
  )
}

export default Hero