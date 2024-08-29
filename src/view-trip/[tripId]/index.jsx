import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSection from '../component/InfoSection';
import Hotels from '../component/Hotels';
import PlacesToVisit from '../component/PlacesToVisit';
import Footer from '../component/Footer';


function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);
    
    

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            window.location.navigate='/';
            return;
        }
        
            
            useEffect(() => {
                tripId && GetTripData();
            }, [tripId])

            /**
             * Used to get trip information from firebase
             * 
             */
            const GetTripData = async () => {
                const docRef = doc(db, 'AITrips', tripId);
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    console.log("Documents:", docSnap.data());
                    setTrip(docSnap.data());
                }
                else {
                    console("NO such Document found");
                    toast('No trip Found')
                }
            }



            return (
                <div className='p-10 md:px-30 lg:px-40 xl:px-50'>
                    {/** Information section*/}

                    <InfoSection trip={trip} />

                    {/** Recomended hotels */}
                    <Hotels trip={trip} />

                    {/** Daily Plan*/}
                    <PlacesToVisit trip={trip} />

                    {/** Footer */}
                    <Footer trip={trip} />

                </div>
            )
        }
    

        export default Viewtrip;