import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialogue] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      });
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialogue(false);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className="w-full py-3 px-3 shadow-lg flex flex-col md:flex-row justify-between items-center mt-0 sticky top-0 z-20 backdrop-filter backdrop-blur-sm md:backdrop-blur-lg">
      <div className='flex items-center mb-4 md:mb-0 rounded-full shadow-xl bg-black pr-4 '>
        <img src='/logo.png' className='ml-3 h-10 w-14 my-1' />
        <h2 className='font-extrabold text-[20px] text-white ml-2'>Wanderly.ai</h2>
      </div>

      <div className='flex-grow flex items-center justify-center mt-4 md:mt-0 '>
        <div className='flex flex-col md:flex-row gap-4 md:gap-6 items-center'>
          <h2 className='font-semibold text-xl md:text-2xl hover:scale-110'><a href="/">Home</a></h2>
          <h2 className='hidden sm:block text-[20px] text-gray-300'>|</h2>
          <h2 className='font-semibold text-xl md:text-2xl hover:scale-110'><a href="/create-trip">Plan a Trip</a></h2>
          <h2 className='hidden sm:block text-[20px] text-gray-300'>|</h2>
          <h2 className='font-semibold text-xl md:text-2xl hover:scale-110'><a href="#">Blog</a></h2>
        </div>
      </div>

      <div className='flex items-center mt-4 md:mt-0'>
        {user ? (
          <div className='flex flex-col md:flex-row gap-3 items-center'>
            <a href='/create-trip'>
              <Button variant="outline" className="rounded-full text-xs md:text-sm">+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
              <Button variant="outline" className="rounded-full text-xs md:text-sm">My trips</Button>
            </a>

            <Popover className='justify-center'>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[40px] w-[40px] md:h-[50px] md:w-[50px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>
                  <a href="/">Logout</a>
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialogue(true)} className="text-xs md:text-sm mx-6">Sign in</Button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className='font-bold text-lg text-black mt-7'>Sign-in with Google</h2>
              <h2>Sign-in to the App with Google authentication securely.</h2>
              <Button onClick={login} className='w-full mt-5 flex gap-4 items-center'>
                <FcGoogle className='h-7 w-7' />
                Sign-in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
