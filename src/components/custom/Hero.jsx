import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='relative h-[88vh] overflow-hidden'>
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay to dim video for better readability */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10"></div>

            {/* Hero Content */}
            <div className='relative z-20 flex flex-col items-center mx-56 gap-9 h-full justify-center text-white'>
                <h1 className='font-extrabold text-[60px] text-center'>
                    <span className='text-[#f56551]'>Your Perfect Getaway, </span> <br />
                    Just a Click Away – Personalized Travel Planning Made Simple.
                </h1>
                <p className='text-xl text-gray-200 text-center'>
                    Reimagine travel with the power of AI. Get tailored plans, stress-free coordination, and unforgettable experiences – all in one app. Your next journey starts here!
                </p>
                <Link to={"/create-trip"}>
                    <Button>Get Started, it's Free</Button>
                </Link>
            </div>
        </div>
    )
}

export default Hero
