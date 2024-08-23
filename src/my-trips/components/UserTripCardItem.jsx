import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}){
    const [PhotoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
       trip&&GetPlacePhoto()
    },[trip])

    const GetPlacePhoto=async()=>{
        const data={
            textQuery:trip?.userselection?.location?.label
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[2].name)

            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[2].name);
            setPhotoUrl(PhotoUrl);
        })
    }
  return (
    <Link to={'/view-trip/'+trip.id}>
    <div className='my-2 hover:scale-105 hover:drop-shadow-xl transition-all' >
        <img src={PhotoUrl?PhotoUrl:'/placeholder.jpg'} className=' w-[400px] h-[220px] object-cover rounded-xl '/>
        <div>
            <h2 className='font-bold text-lg text-left mt-2'>{trip?.userselection?.location?.label}</h2>
            <h2 className='text-sm text-gray-700 text-left '>{trip?.userselection?.noOfDays} Days trip, With {trip?.userselection?.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem