import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {

    const [PhotoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
       hotel&&GetPlacePhoto()
    },[hotel])

    const GetPlacePhoto=async()=>{
        const data={
            textQuery:hotel?.hotelName
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[2].name);

            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[2].name);

            
            setPhotoUrl(PhotoUrl);
        })
    }
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.hotelAddress} target='_blank'>
            <div className='hover:scale-110 transition-all cursor-pointer'>
                <img src={PhotoUrl?PhotoUrl:'/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover' />
                <div className='my-2'>
                    <h2 className='font-medium '>{hotel?.hotelName}</h2>
                    <hr className='my-1' />
                    <h2 className='font-medium text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
                    <h2 className='font-medium text-sm text-gray-700 mt-1'>⭐{hotel?.rating} stars</h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem