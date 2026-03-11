import React from 'react'
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className='h-[75vh] flex flex-col lg:flex-row items-center justify-center '>
        <div className='w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
            <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>Build Your Story Stack</h1>
            <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>Stack your shelf with amazing stories, timeless classics, and modern bestsellers.
Your next great read is just a click away.</p>
        <div className='mt-8'>
            <Link to="/all-books" className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>
            Browse Collection
        </Link>
        </div>
        </div>
        <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center p-4'>
            <img src="./CoverPhoto.png" alt="Hero Image" />
        </div>
    </div>
  )
}

export default Hero