import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import ShareButton from '../component/ShareButton';


function InfoSection({ trip }) {

    const [PhotoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        trip && GetPlacePhoto()
    }, [trip])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userselection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[2].name)

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name);
            setPhotoUrl(PhotoUrl);
        })
    }

    return (
        <div>
            <img
                src={PhotoUrl ? PhotoUrl : '/placeholder.jpg'}
                className='w-full object-cover rounded-[50px] h-[300px] sm:h-[300px] md:h-[300px] lg:h-[450px] xl:h-[450px]'>
            </img>

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-3xl text-left'>
                        {trip?.userselection?.location?.label}
                    </h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700  text-left text-xs md:text-md'>
                            🗓️ {trip?.userselection?.noOfDays} Days
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-left text-xs md:text-md'>
                            💲{trip?.userselection?.budget} Budget
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-left text-xs md:text-md'>
                            ✈️ No. of Travelers : {trip?.userselection?.traveler}
                        </h2>
                        <hr></hr>
                    </div>
                </div>
                <ShareButton trip={trip} />
            </div>
        </div>
    )
}

export default InfoSection;