import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div>
      <hr></hr>
        <h2 className='font-bold text-xl mt-5 text-left my-3'>Hotel Recommendations</h2>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
            {trip?.tripData?.hotels?.map((hotel,index)=>(
                <HotelCardItem hotel={hotel}/>
            ))}
        </div>
    </div>
  )
}
export default Hotels