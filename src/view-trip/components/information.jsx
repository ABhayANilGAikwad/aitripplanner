import React from 'react'
import { Button } from '@/components/ui/button'
import { FaShare } from "react-icons/fa";

const Information = (trip) => {
    return (
        <div>
            <img className=' h-[70vh] w-full  object-contain rounded-xl' src="https://static.toiimg.com/thumb/66440952/road-trip.jpg?width=636&height=358&resize=4" alt="image" />

            <div className='flex justify-around items-center h-fit'>
                <div className='my-5 flex flex-col gap-2 items-center justify-center'>
                    <h2 className='font-bold text-2xl text-center'>
                        {trip?.trip?.userSelection?.location}
                    </h2>
                    <div className='flex   gap-5 items-start justify-start'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs text-lg'>⌛ {trip?.trip?.userSelection?.noOfDays} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs text-lg'>💰{trip?.trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text-xs text-lg'>🍷No. of Traveller: {trip?.trip?.userSelection?.People}</h2>
                    </div>
                </div>
                <Button >Share <FaShare /></Button>
            </div>
        </div>
    )
}

export default Information
