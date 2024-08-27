import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({ places }) {
    const [PhotoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
       places&&GetPlacePhoto()
    },[places])

    const GetPlacePhoto=async()=>{
        const data={
            textQuery:places?.placeName
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[2].name)
            
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[2].name);

            setPhotoUrl(PhotoUrl);
        })
    }
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + places?.placeName} target='_blank'>
            <div className='border rounded-xl p-3 shadow-md mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-lg cursor-pointer'>
                <img src={PhotoUrl?PhotoUrl:'/placeholder.jpg'}
                    className='w-[140px] h-[140px] rounded-xl object-cover '></img>
                <div>
                    <h2 className='font-bold text-lg text-left'>{places?.placeName}</h2>
                    <p className='text-left text-sm text-gray-500'>{places?.placeDetails}</p>
                    <h2 className='mt-2 text-left'>🕘 {places?.bestTimeToTravel}</h2>

                    {/**enable to use navigation button */}

                    {/* <div className='flex justify-items-end mt-1'>
    <Button className='ml-auto'> <FaMapLocationDot/> </Button>
    </div>*/}
                </div>
            </div>
        </Link >
  )
}

export default PlaceCardItem