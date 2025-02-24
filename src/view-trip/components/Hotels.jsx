import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Hotels = (trip) => {
    return (
        <div className=''>
            <h2 className='font-bold text-xl mt-5'>Hotel Recomendation</h2>
            <div  className='grid grid-col md:grid-cols-3 lg:grid-col-4 gap-5 '>
                {trip?.trip?.TripData?.hotels.map((hotel, index) => (
                    <Link to={"https://www.google.com/maps/search/?api=1&query="+hotel?.hotelName+' , '+hotel?.address} target="_blank">
                    <div key={index} className='shadow-xl hover:scale-105 cursor-pointer transition-all'>
                        <img className='w-28' src={hotel?.imageUrl} alt="" />
                        <div className='my-2 flex flex-col gap-2'>
                            <h2 className='font-medium'>{hotel?.hotelName}</h2>
                            <h2 className='text-xs text-gray-500'>📍 {hotel?.address}</h2>
                            <h2 className='text-sm text-gray-500'>💲 {hotel?.price} /Night</h2>
                            <h2 className='text-sm text-gray-500'>⭐ {hotel?.rating}/5 Star</h2>

                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>

    )
}

export default Hotels
