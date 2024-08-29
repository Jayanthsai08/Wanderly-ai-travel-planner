import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import { db } from '@/service/firebaseConfig'; // Adjust the import path as needed
import { doc, deleteDoc } from 'firebase/firestore';

function UserTripCardItem({ trip }) {
  const [PhotoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userselection?.location?.label
    };
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[2].name);
      setPhotoUrl(PhotoUrl);
    });
  };

  const handleDelete = async () => {
    try {
      const tripDocRef = doc(db, "AITrips", trip.id);
      await deleteDoc(tripDocRef);
      console.log("Trip deleted successfully");
      window.location.reload(); 
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return (
    
      <div className='my-2 hover:scale-105 hover:drop-shadow-xl transition-all relative'>
        <Link to={'/view-trip/' + trip.id}>
        <img src={PhotoUrl ? PhotoUrl : '/placeholder.jpg'} className='w-[400px] h-[220px] object-cover rounded-xl' />
        </Link>
        <div className='flex'>
          <div>
            <h2 className='font-bold text-lg text-left mt-2'>{trip?.userselection?.location?.label}</h2>
            <h2 className='text-sm text-gray-700 text-left'>{trip?.userselection?.noOfDays} Days trip, With {trip?.userselection?.budget} Budget</h2>
          </div>
          
          <div className='mt-5 ml-32 hover:scale-110 absolute right-0 '>
            <Button onClick={handleDelete}><RiDeleteBinLine /></Button>
          </div>
        </div>
      </div>
    
  );
}

export default UserTripCardItem;
