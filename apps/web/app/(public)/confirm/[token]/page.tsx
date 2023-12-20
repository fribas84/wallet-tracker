"use client";
import { useState, useEffect } from 'react'
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import { axiosClient }  from '@/config/axiosClient';

import Alert from '@/components/Alert';
import axios from 'axios';

export default function Page({ params }: { params: { token: string } }) {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>('');
    const [alertError, setAlertError] = useState<boolean>(false);

    const router = useRouter();    
    const [email, setEmail] = useState<string>('');
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(params.token)
        if(email.length <6) {
            setAlertError(true);
            setAlertMsg('Email is required');
            setShowAlert(true);
            return
        } 
        try {
            const url = `/users/confirm/${params.token}`;
            console.log(url);
            const response = await axiosClient.post(url, {email});
            const data = response.data;
            setAlertError(false);
            setAlertMsg('Account confirmed successfully');
            setShowAlert(true);
            router.push('/login');
        } catch (error) {
            console.log(error);
            setAlertError(true);
            setAlertMsg(error?.response.data.message || 'Error occured while confirming your account');
            setShowAlert(true);
        }

    }
    return (
        <div className="flex flex-col items-center justify-center mt-16">
            <div className="w-2/3 p-8 bg-white rounded shadow-md">
                {showAlert && <Alert error={alertError} msg={alertMsg} />}
                <h1 className='font-bold text-black text-center text-2xl'> Enter your Email to confirm your account</h1>
                <form className="mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-teal-400 rounded hover:bg-teal-500 focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link className="mx-5 inline-block text-sm font-bold text-teal-500 align-baseline hover:text-teal-800" href="/signup">
                        Sign up
                    </Link>
                    <Link className="mx-5 inline-block ml-2 text-sm font-bold text-teal-500 align-baseline hover:text-teal-800" href="/forgot-password">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    )
    
    
}