import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectActivities, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Footer from '@/view-trip/component/Footer';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({
    activities: [], // Initialize activities as an empty array
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialogue] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleActivity = (activity) => {
    setFormData((prev) => {
      const isAlreadySelected = prev.activities.includes(activity);
      const updatedActivities = isAlreadySelected
        ? prev.activities.filter((act) => act !== activity) // Remove activity if already selected
        : [...prev.activities, activity]; // Add activity if not selected
      return {
        ...prev,
        activities: updatedActivities,
      };
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialogue(true);
      return;
    }

    if (formData?.noOfDays > 10 && (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.activities.length)) {
      toast("Please fill all details");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{activities}', formData.activities.join(', ')); // Include activities in the prompt

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAITrip(result?.response?.text());
  };

  const SaveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userselection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      });
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialogue(false);
      onGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className='bg-[url("/pattern.png")] h-full bg-cover my-0'>
      <div className='bg-gradient-to-b backdrop-blur-lg my-10 mx-4 sm:mx-10 md:mx-40 lg:mx-72'>
        <div className='px-4 py-5 sm:px-10 md:px-21 lg:px-56 xl:px-10 flex-grow shadow-2xl rounded-2xl'>
          <h2 className='mt-10 font-bold text-2xl sm:text-3xl'>
            Tell us your travel preferences 🗺️📍
          </h2>
          <p className='mt-3 text-gray-500 text-lg sm:text-xl mx-10'>
            Just provide us with some basic information, and our trip planner will generate a customized itinerary based on your preferences.
          </p>
          <div className='mt-5 flex flex-col gap-5'>
            <h2 className='text-lg sm:text-xl mt-3 font-medium'>What is the destination of choice?</h2>
            <div className='drop-shadow-sm'>
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  place,
                  onChange: (v) => { setPlace(v); handleInputChange('location', v); },
                }}
              />
            </div>
          </div>
          <div className='mt-10'>
            <h2 className='text-lg sm:text-xl my-3 font-medium'>How many days are you planning to visit?</h2>
            <Input className='shadow-sm' placeholder={'Ex.3'} type="number"
              onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
          </div>
          <hr/>
          <div>
            <h2 className='text-lg sm:text-xl mt-10 font-medium'>What is Your budget? The budget exclusively allocated for activities and dining purposes</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('budget', item.title)}
                  className={`p-4 border rounded-lg drop-shadow-md hover:shadow-lg cursor-pointer
                    ${formData?.budget === item.title && 'shadow-xl border-black'}
                  `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className='text-lg sm:text-xl my-3 font-medium'>Who do you plan to travel with on your next adventure?</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
              {SelectTravelsList.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('traveler', item.people)}
                  className={`p-4 border rounded-lg drop-shadow-md hover:shadow-lg cursor-pointer
                    ${formData?.traveler === item.people && 'shadow-xl border-black'}
                  `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className='text-lg sm:text-xl my-3 font-medium'>What activities are you interested in?</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
              {SelectActivities.map((item, index) => (
                <div key={index}
                  onClick={() => toggleActivity(item.title)}
                  className={`p-4 border rounded-lg drop-shadow-md hover:shadow-lg cursor-pointer
                    ${formData?.activities.includes(item.title) && 'shadow-xl border-black'}
                  `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-10 flex justify-end'>
            <Button className='font-bold text-lg sm:text-[20px] hover:scale-105 transition-all'
              disabled={loading}
              onClick={onGenerateTrip}>
              {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
            </Button>
          </div>
          <Dialog open={openDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  <img src="/logo.svg" alt="Logo" />
                  <h2 className='font-bold text-lg text-black mt-7'>Sign-in with Google</h2>
                  <h2>Sign-in to the App with Google authentication securely.</h2>
                  <Button
                    disabled={loading}
                    onClick={login}
                    className='w-full mt-5 flex gap-4 items-center'>
                    <FcGoogle className='h-7 w-7' />
                    Sign-in with Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default CreateTrip;
