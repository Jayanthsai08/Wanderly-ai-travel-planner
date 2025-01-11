import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import ShareButton from '../component/ShareButton';
import { FaTemperatureLow } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { IoMdCash } from "react-icons/io";
import { IoRainy } from "react-icons/io5";
import axios from 'axios';

function InfoSection({ trip }) {
    const [PhotoUrl, setPhotoUrl] = useState();
    const [weatherData, setWeatherData] = useState([]);
    const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    // Fetch place photo
    useEffect(() => {
        if (trip) {
            GetPlacePhoto();

        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        try {
            const data = { textQuery: trip?.userselection?.location?.label };
            const resp = await GetPlaceDetails(data);
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0]?.photos[1]?.name);
            setPhotoUrl(PhotoUrl || '/placeholder.jpg');
        } catch (error) {
            console.error("Error fetching place photo:", error.message);
        }
    };


    return (
        <div>
            <div>
                <img
                    src={PhotoUrl || '/placeholder.jpg'}
                    className='w-full object-cover rounded-[30px] h-[300px] sm:h-[300px] md:h-[300px] lg:h-[450px] xl:h-[450px]'
                    alt='Place'
                />
            </div>

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-3xl text-left'>
                        {trip?.userselection?.location?.label}
                    </h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-left text-xs md:text-md'>
                            🗓️ {trip?.userselection?.noOfDays} Days
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-left text-xs md:text-md'>
                            💲{trip?.userselection?.budget} Budget
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-left text-xs md:text-md'>
                            ✈️ No. of Travelers : {trip?.userselection?.traveler}
                        </h2>
                        <hr />
                    </div>
                </div>
                <ShareButton trip={trip} />
            </div>
            <div className="my-5 p-5 rounded-lg place-items-start ">
                <h3 className="font-bold text-2xl  mb-3 ">Additional Details</h3>
                <div className="flex flex-col gap-4 text-left">
                <div className="flex justify-between items-start space-x-40">
    <div className="text-md">
        <strong className="block mb-2">Total Cost</strong>
        <span>{trip?.tripData?.TripCost}</span>
    </div>
    <div className="text-md">
        <strong className="block mb-2">Local Currency</strong>
        <div className="flex items-center gap-2">
            <IoMdCash className="text-lg" />
            <span>{trip?.tripData?.LocalCurrency}</span>
        </div>
    </div>
</div>

                    <div className="text-md mt-2">
                        <h3 className="font-bold text-md mb-3">Weather Forecast</h3>
                        <div className="flex flex-col gap-2 ">
                            {/* Temperature */}
                            <div className="flex items-center gap-3">
                                <FaTemperatureLow className="text-lg ml-1" />
                                <h2 className="text-sm font-medium ">Temperature:</h2>
                                <span>{trip?.tripData?.Weather?.temperature}</span>
                            </div>

                            {/* Humidity */}
                            <div className="flex items-center gap-3">
                                <IoWaterOutline className="text-lg" />
                                <h2 className="text-sm font-medium">Humidity:</h2>
                                <span>{trip?.tripData?.Weather?.humidity}</span>
                            </div>

                            {/* Precipitation */}
                            <div className="flex items-center gap-3">
                                <IoRainy className="text-lg" />
                                <h2 className="text-sm font-medium">Precipitation:</h2>
                                <span>{trip?.tripData?.Weather?.precipitation}</span>
                            </div>

                            {/* Additional Details */}
                            <div className="flex items-center gap-3">
                                <h2 className="text-sm font-medium">Note:</h2>
                                <span>{trip?.tripData?.Weather?.details}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default InfoSection;
