import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
    return (
        <div>
            <hr></hr>
            <h2 className='font-bold text-2xl text-left mt-2'>Itinerary</h2>
            <div className='mt-5'>
                {trip.tripData?.itinerary.map((item, index) => (
                        <div>
                            <h2 className='font-bold text-xl text-left '>Day {item.day}</h2>
                            <div className=' grid md:grid-cols-2 gap-5'>
                            {item?.places.map((places, index) => (
                                <div>
                                    <h2 className='font-medium text-left text-orange-500'>{places?.timeToVisit}</h2>
                                    <PlaceCardItem places={places}></PlaceCardItem>
                                </div>

                            ))}
                        </div>
                        <hr className='my-5'></hr>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default PlacesToVisit