import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // Import React Modal

Modal.setAppElement('#root'); // Bind modal to your app's root element (adjust as necessary)

function BlogItem({ trip }) {
  const [PhotoUrl, setPhotoUrl] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='my-2 hover:scale-105 hover:drop-shadow-xl transition-all relative'>
        <div onClick={openModal} className='cursor-pointer'>
          <img
            src={PhotoUrl ? PhotoUrl : '/placeholder.jpg'}
            className='w-[400px] h-[300px] object-cover rounded-xl'
            alt='Trip'
          />
          <div className='absolute bottom-0 left-0 right-0 py-5 bg-gradient-to-t from-gray-900 to grayscale-0 rounded-b-xl'>
            <span className='font-bold text-2xl text-white'>
              {trip?.userselection?.location?.label}
            </span>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Trip Details"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-3/4 sm:h-auto sm:max-h-[80%] overflow-y-auto scrollbar-hide relative'>
          <button
            onClick={closeModal}
            className='absolute top-2 right-2 bg-black text-white px-2 rounded-lg z-10'
          >
            ✕
          </button>
          <div className='relative'>
            <img
              src={PhotoUrl ? PhotoUrl : '/placeholder.jpg'}
              className='w-full h-64 object-cover rounded-md'
              alt='Trip'
            />
            <span className='absolute bottom-4 left-4  font-bold text-[35px] text-white backdrop-blur-sm px-2 py-2 rounded-2xl'>
              {trip?.userselection?.location?.label}
            </span>
          </div>
          
          <h2 className='font-bold text-2xl text-gray-600 my-5'>Explore</h2>
          <div className='text-gray-700'>
            {trip.tripData?.itinerary.map((item, index) => (
              <div key={index} className='mt-5'>
                <div className='grid md:grid-cols-1 gap-5'>
                <h2 className='text-lg'>{item?.description}</h2>
                  
                 
                </div>
              </div>
            ))}
          </div>
          <Button onClick={closeModal} className='font-bold text-[20px] w-full  '>Close</Button>
        </div>

      </Modal>
    </>
  );
}

export default BlogItem;
