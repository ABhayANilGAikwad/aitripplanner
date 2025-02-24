import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {trip?.TripData?.itinerary.map((place, index) => (
          <div key={index} className="py-3">
            <h3 className="font-medium text-lg">{place.day}</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
              {place?.activities?.map((plan, index) => (
                <div key={index} className="">
                  <h2 className="font-medium text-sm text-orange-700">
                    {plan?.timeSlot}
                  </h2>
                  <div className="">
                    <PlaceCardItem plan={plan} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
