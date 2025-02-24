import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Information from '../components/information';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

const ViewTrip = () => {
  const { tripId } = useParams(); // Get tripId from URL params
  const [trip, setTrip] = useState(null); // Initialize as `null` to reflect object data
  const [loading, setLoading] = useState(true); // Add loading state for better UX

  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  const getTripData = async () => {
    setLoading(true); // Set loading state
    try {
      const docRef = doc(db, 'AiTrips', tripId); // Firestore document reference
      const docSnap = await getDoc(docRef); // Fetch document snapshot
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setTrip(docSnap.data()); // Store trip data
      } else {
        console.log('No such document!');
        toast.error("No Such Trip Found!"); // Show error toast
      }
    } catch (error) {
      console.error('Error fetching trip data:', error);
      toast.error('Failed to fetch trip data. Please try again later.');
    } finally {
      setLoading(false); // Remove loading state
    }
  };

  return (
    <div className="bg-white h-full p-10 md:px-20 lg:px-44 xl:px-52">
      {loading ? (
        <p>Loading...</p> // Show loading indicator while fetching data
      ) : trip ? (
        <>
          {/* Information Section */}
          <Information trip={trip} />
          {/* Recommended Hotels */}
          <Hotels trip={trip}/>
          {/* Daily Plan */}
          <PlacesToVisit trip={trip}/>
        </>
      ) : (
        <p>No trip data available.</p> // Display message if no trip data
      )}
      <Footer/>
    </div>
  );
};

export default ViewTrip;
