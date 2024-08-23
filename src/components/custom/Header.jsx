import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigation } from 'react-router-dom';


function Header() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [openDialog, setOpenDialogue] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  }
  )

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
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    console.log(user)
  }, [])
  return (
    <div className=" w-full py-3 px-3 shadow-lg flex justify-between item-center mt-0 sticky top-0 z-20 bg-white">
      <img src='logo.svg' />
      <div className='flex flex-col-2 gap-7 mt-1'>
        <h2 className='font-semibold text-2xl md:text-xl lg:text-2xl'><a href="/">Home</a></h2>
        <h2 className='font-semibold text-2xl md:text-xl lg:text-2xl'><a href="/create-trip">Plan a Trip</a></h2>
        <h2 className='font-semibold text-2xl md:text-xl lg:text-2xl'><a>Blog</a></h2>
      </div>
      <div>
        {user ?
          <div className='flex items-center gap-3'>
           <a href='/create-trip'>
           <Button variant="outline" 
           className="rounded-full">+ Create Trip</Button></a>
           <a href='/my-trips'>
           <Button variant="outline" 
           className="rounded-full">My trips</Button></a>

            <Popover className='justify-center'>
              <PopoverTrigger><img src={user?.picture} className='h-[50px] w-[50px] rounded-full' /></PopoverTrigger>
              <PopoverContent><h2 className='cursor-pointer' onClick={() => {
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}><a href="/">Logout</a></h2></PopoverContent>
            </Popover>
          </div> : <Button onClick={() => setOpenDialogue(true)}>Sign in</Button>
        }
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

export default Header
