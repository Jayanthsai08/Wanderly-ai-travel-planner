import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {

    const navigation = useNavigation();
    const [userTrips,setUserTrips]=useState([]);
    useEffect(() => {
        GetUserTrips();
    }, [])
    /**
     * Used to GET all user trips
     * @returns 
     */


    const GetUserTrips = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user) {
            navigation('/');
            return;
        }

        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {   
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal=>[...prevVal,doc.data()]);
        });
    }


    return (
        <div className='sm:px-10 md:px-21 lg:px-56 xl:px-10 px-5 mt-11 mx-28 my-10'>
            <h2 className='font-bold text-3xl text-left'>My Trips</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 my-5'>
                {userTrips?.length>0?userTrips.map((trip,index)=>(
                    <UserTripCardItem trip={trip} key={index}/>
                ))
                :[1,2,3,4,5,6].map((item,index)=>(
                    <div key={index} className='w-[400px] h-[220px] my-16 bg-slate-200 animate-pulse rounded-xl mt-2'>
                    </div>                
            ))
            }
            </div>

        </div>
    )
}

export default MyTrips