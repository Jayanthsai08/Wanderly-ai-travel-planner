import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { chatSession } from '@/service/AIModal'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios, { isCancel, AxiosError } from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '@/service/firebaseConfig';
import {  useNavigate  } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialogue] = useState(false);
  const navigate=useNavigate();
  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])


  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  }
  )


  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialogue(true)
      return;
    }




    if (formData?.noOfDays > 10 && !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAITrip(result?.response?.text())

  }
  const SaveAITrip = async (TripData) => {

    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userselection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId

    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  }


  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      });
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDialogue(false);
      onGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className='sm:px-10 md:px-21 lg:px-56 xl:px-10 px-5 mt-10 mx-56'>
      <h2 className='font-bold text-3xl'>
        Tell us your travel prefrences 🗺️📍
      </h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide us with some basic information, and ur trip planner will generate a customized itinerery based on your preferences.</p>
      <div>
        <div className='mt-10  flex flex-col gap-10'>
          <h2 className='text-xl my-3 font-medium'>What is the destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }
            }}
          />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium '>How many days are you planning to visit?</h2>
          <Input placeholder={'Ex.3'} type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>What is Your budget? The budget exclusively allocated fro activities and dining purposes</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
        ${formData?.budget == item.title && 'shadow-xl border-black'}
        `}>

              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          )
          )}
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan to travel with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelsList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer *
      ${formData?.traveler == item.people && 'shadow-xl border-black'}
      `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          )
          )}
        </div>
      </div>
      <div className='my-10 justify-end flex'>
        <Button
          disabled={loading}
          onClick={onGenerateTrip}>
          {
            loading ?
              <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
          }

          </Button>
      </div>
      <Dialog open={openDialog}>

        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className='font-bold text-lg text-black mt-7'>Sign-in with Google</h2>
              <h2>Sign-in to the App with Google aunthetication securely.</h2>
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
  )
}

export default CreateTrip