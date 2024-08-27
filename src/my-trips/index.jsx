import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetUserTrips();
    }, []);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user) {
           navigate('/');
            return;
        }

        try {
            const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
            const querySnapshot = await getDocs(q);
            const trips = [];
            querySnapshot.forEach((doc) => {
                trips.push(doc.data());
            });
            setUserTrips(trips);
        } catch (error) {
            console.error("Error fetching user trips:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='px-4 sm:mx-4 lg:mx-10 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto mt-8 mb-14 '>
            <h2 className='font-bold text-2xl md:text-3xl text-left mb-6'>My Trips</h2>

            <div className='grid grid-cols-2 gap-6 mx-2 md:grid-cols-3 lg:grid-cols-3 lg:mx-10'>
                {loading ? (
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className='w-full h-[220px] bg-slate-200 animate-pulse rounded-xl'></div>
                    ))
                ) : userTrips.length > 0 ? (
                    userTrips.map((trip, index) => (
                        <div key={index} className='relative'>
                            <UserTripCardItem trip={trip} />
                            {/* Example delete button */}
                            
                             
                        </div>
                    ))
                ) : (
                    <p className='text-center text-gray-500 col-span-full'>No trips found.</p>
                )}
            </div>
        </div>
    );
}

export default MyTrips;
