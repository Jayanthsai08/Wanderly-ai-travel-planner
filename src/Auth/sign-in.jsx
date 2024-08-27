import React, { useState } from 'react';
import { auth } from '@/service/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState(null);

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
            setOpenDialog(false);
            window.location.href = '/'; // Redirect to home page
            window.location.reload(); 
            window.location.href = '/'; // Reload the page
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email }));

            window.location.href = '/'; // Redirect to home page
            window.location.reload(); // Reload the page
        } catch (err) {
            console.error('Error signing in:', err);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black to bg-slate-400 shadow-xl">
            <div className='flex w-full max-w-3xl shadow-lg bg-white rounded-3xl'>
                <form onSubmit={handleSubmit} className="w-1/2 p-10 space-y-6 bg-white rounded-3xl">
                    <h2 className="text-3xl font-bold mb-8 text-left">Sign In</h2>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-14 rounded-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Your email"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-14 rounded-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Your password"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full h-14 px-8 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                        >
                            Sign In
                        </button>
                        <a href="/sign-up" className="block text-center text-gray-600 mt-4">Don't have an account? Sign Up</a>
                    </div>
                </form>
                <div className="w-1/2 bg-cover bg-center text-white flex items-center justify-center rounded-r-lg">
                    <div className='bg-[url("/sign.jpg")] h-full w-full bg-cover rounded-r-3xl'>
                        <div className='mt-8'>
                            <span className="text-[40px] font-bold">Welcome back!</span>
                        </div>
                        <div className='mt-20 mx-14 rounded-full flex flex-col items-center justify-center p-4'>
                            <a href="#" className='text-lg text-center mb-2'>Sign-in with Google</a>
                            <Button onClick={() => setOpenDialog(true)} className='bg-white rounded-full p-2'>
                                <FcGoogle className='text-2xl' />
                            </Button>
                        </div>
                        <Dialog open={openDialog} onOpenChange={setOpenDialog} >
                            <DialogContent className='w-[400px]  '>
                                <DialogHeader>
                                    <DialogTitle className='font-bold mb-4'>Sign-in </DialogTitle>
                                    <DialogDescription>
                                        <img src="/logo.png" className='lg:h-[80px] lg:w-[100px]' alt="Logo" />
                                        <h2 className='font-medium text-lg text-black mt-4'>Sign-in with Google</h2>
                                        <p>Sign-in to the App with Google authentication securely.</p>
                                        <Button
                                            onClick={() => {
                                                login();
                                                setOpenDialog(false);
                                            }}
                                            className='w-full mt-5 flex gap-4 items-center hover:scale-105'
                                        >
                                            <FcGoogle className='h-7 w-7' />
                                            Sign-in with Google
                                        </Button>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
