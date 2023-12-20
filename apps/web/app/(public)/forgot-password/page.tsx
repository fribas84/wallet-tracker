"use client"
import Alert from '@/components/Alert';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { axiosClient } from '@/config/axiosClient';

type Props = {}

const Recover = (props: Props) => {
    const [email, setEmail] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>('');
    const [aletError, setAlertError] = useState<boolean>(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showAlert) {
            timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000); // 5000 milliseconds = 5 seconds
        }

        // Cleanup function to clear the timer if the component unmounts
        return () => clearTimeout(timer);
    }, [showAlert]); 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(email.length < 6) {
            setAlertMsg('Invalid email');
            setAlertError(true);
            setShowAlert(true);
            return
        }
        try{
            const url: string = '/users/recover/'
            const response = await axiosClient.post(url, {email})
            setAlertMsg("Check your Email for the recovery link");
            setAlertError(false);
            setShowAlert(true);
            setEmail('');

        }catch(error){
            setAlertMsg(error.response.data.message);
            setAlertError(true);
            setShowAlert(true);
        }

       
    };

    return (
        <div className="flex flex-col items-center justify-center mt-16">
            <div className="w-2/3 p-8 bg-white rounded shadow-md">
                {showAlert && <Alert error={aletError} msg={alertMsg} />}
                <h1 className='font-bold text-xl text-center'>Password Recovery</h1>
                <h2 className='text-l text-center'>Enter Email to request a password reset</h2>
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
                            Recover Password
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link className="mx-5 inline-block text-sm font-bold text-teal-500 align-baseline hover:text-teal-800" href="/login">
                        Login
                    </Link>
                    <Link className="mx-5 inline-block ml-2 text-sm font-bold text-teal-500 align-baseline hover:text-teal-800" href="/signup">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Recover