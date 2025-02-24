import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='flex flex-col items-center mx-56 gap-9 h-[88vh]'>
            <h1 className='font-extrabold text-[60px] text-center mt-16'> <span className='text-[#f56551]'>Your Perfect Getaway , </span> <br /> Just a Click Away  Personalized Travel Planning Made Simple.</h1>
            <p className='text-xl text-gray-500 text-center'>Reimagine travel with the power of AI. Get tailored plans, stress-free coordination, and unforgettable experiences – all in one app. Your next journey starts here!</p>
            <Link to={"/create-trip"}>
                <Button> Get Started,its Free</Button>
            </Link>

        </div>
    )
}

export default Hero
