"use client"
import Link from 'next/link';
import { use, useEffect, useState } from 'react'
import Alert from '@/components/Alert';
import { useRouter } from 'next/navigation';
import { axiosClient } from '@/config/axiosClient';
import { Bars } from 'react-loader-spinner'; 


type Props = {}

const Signup = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 6000); // 5000 milliseconds = 5 seconds
    }

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === '' || password === '' || password2 === '') {
      setAlertMsg('Please fill out all fields');
      setAlert(true);
      setShowAlert(true);
      return
    }
    if (password !== password2) {
      setAlertMsg('Passwords do not match');
      setAlert(true);
      setShowAlert(true);
      return
    }
    if (password.length < 6) {
      setAlertMsg('Password must be at least 6 characters');
      setAlert(true);
      setShowAlert(true);
      return
    }
    if (!email.includes('@')) {
      setAlertMsg('Please enter a valid email');
      setAlert(true);
      setShowAlert(true);
      return
    }
    try {
      setLoading(true);
      const url: string = '/users/signup'
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      console.log({ email, password });
      const response = await axiosClient.post(url, { email, password }, config);
      setLoading(false);
      console.log(response);
      setAlertMsg('Check your email to activate your account');
      setAlert(false);
      setShowAlert(true)
      router.push('/login');
     
    } catch (error) {
      setAlertMsg((error as any).response.data.message || 'Something went wrong');
      setAlert(true);
      setShowAlert(true)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="w-2/3 p-8 bg-white rounded shadow-md">
        {showAlert && <Alert error={alert} msg={alertMsg} />}
        <h1 className='font-bold text-xl text-center'>Sign up</h1>

        {loading &&
          <>
            <div className="flex flex-col items-center justify-center mt-16">
              <h1 className='text-3xl'> Registering user  </h1>
              <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}

              />
            </div>
          </>
        }
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
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="new-password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="new-password"
              type="password"
              autoComplete='new-password'
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password2">
              Repeat Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password2"
              type="password"
              autoComplete='new-password'
              placeholder="******************"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-teal-400 rounded hover:bg-teal-500 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link className="mx-5 inline-block text-sm font-bold text-teal-500 align-baseline hover:text-teal-800" href="/login">
            Login
          </Link>
          <Link className="mx-5 inline-block ml-2 text-sm font-bold text-teal-500 align-baseline hover:text-teal-800" href="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Signup