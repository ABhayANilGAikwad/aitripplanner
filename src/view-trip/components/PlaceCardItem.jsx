import React from 'react';
import { Link } from 'react-router-dom';

const PlaceCardItem = ({ plan }) => {
  return (
    //fix the location
    <Link to={"https://www.google.com/maps/search/?api=1&query="+plan?.geoCoordinates?.latitude+' , '+plan?.geoCoordinates?.longitude } target="_blank">
    <div className="border rounded-xl mt-2 p-4 flex gap-5 hover:scale-105 hover:shadow-lg transition-all cursor-pointer">
      <img
        src="/PlaceHolder.jpg"
        alt="image"
        className="w-64 h-40 rounded-xl"
      />
      <div className=" ml-4">
        {/* Display the timeSlot property from the plan */}
        <h2 className='font-bold text-lg text-black'>{plan?.placeName || 'No Time Slot Available'}</h2>
        <p className='text-sm text-gray-500'>{plan?.placeDetails}</p>
        <h2 className='mt-2 '>⌚{plan?.travelTime}</h2>

      </div>
    </div>
    </Link>
  );
};

export default PlaceCardItem;
