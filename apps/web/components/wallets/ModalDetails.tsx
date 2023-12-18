import axios from 'axios';
import React, { Dispatch, SetStateAction, use, useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import Alert from '../Alert';
import BalanceCard from './BalanceCard';

interface Props {
    name: string,
    id: number
    showModalDetails: boolean,
    setShowModalDetails: Dispatch<SetStateAction<boolean>>

}

const ModalDetails = ({ name, id, showModalDetails, setShowModalDetails }: Props) => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>('');
    const [alertError, setAlertError] = useState<boolean>(false);
    const [isOld, setIsOld] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [realBalance, setRealBalance] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);
    const [eur, setEur] = useState<number>(0);
    const [usd, setUsd] = useState<number>(0);
    const [rateEuro, setRateEuro] = useState<number>(0);
    const [rateUsd, setRateUsd] = useState<number>(0)
    const [balanceEditable, setBalanceEditable] = useState<boolean>(false);
    const [wei, setWei] = useState<boolean>(true);


    const handleClose = () => {
        setShowAlert(false);
        setAlertError(false);
        setAlertMsg('');
        setShowModalDetails(false);
    }
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

    useEffect(() => {
        const fecthWalletDetails = async () => {
            setLoading(true);
            const url = `http://localhost:4000/api/v1/wallets/balance/${id}`
            const token = localStorage.getItem('token');
            if (!token) {
                return
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
            try {
                const response = await axios.get(url, config);
                console.log("response", response);
                const balanceData = response.data;
                console.log(balanceData);
                setRealBalance(balanceData.balance);
                setBalance(balanceData.balance);
                setEur(balanceData.eur);
                setUsd(balanceData.usd);
                setRateEuro(balanceData.rateEuro);
                setRateUsd(balanceData.rateUsd);
                setIsOld(balanceData.isOld);
                setLoading(false);
                setAlertError(false);
            } catch (error) {
                setLoading(false);
                setAlertError(true);
                setShowAlert(true);
                setAlertMsg(error?.response?.data.message || 'Something went wrong');
            }
        }
        console.log(id, showModalDetails)
        if (showModalDetails) {
            fecthWalletDetails();
        }
    }, [id, showModalDetails])

    return (
        <>
            {showModalDetails && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                        <div className="relative my-6 mx-auto w-3/4">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline-none focus:outline-none">
                                {/*header*/}
                                {showAlert && <Alert error={alertError} msg={alertMsg} />}

                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Details of Wallet - {name}
                                    </h3>
                                    {isOld && <span className='border border-red-600 bg-red-200 my-2 mx-5 font-bold py-1 px-5'> Old wallet</span>}
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModalDetails(false)}
                                    >
                                        <span className="bg-transparent text-black text-2xl block font-bold">
                                            X
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}

                                {loading &&
                                    <>
                                        <div className="flex flex-col items-center justify-center mt-16">
                                            <h1 className='text-3xl'> Fetching data</h1>
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
                                {!loading &&
                                    <div className='flex justify-between items-center m-5'>
                                        {/* <div className='mr-2 w-1/2 bg-white shadow-xl rounded-lg'>
                                            <div className='flex justify-between'>
                                                <h1 className='text-2xl font-bold mx-5'>Balance</h1>
                                                <div className='flex justify-between'>
                                                    <button className='my-2 bg-teal-500 text-white text-xl py-2 px-4 leading-none rounded hover:bg-teal-600 mx-2'>
                                                        wei
                                                    </button>
                                                    <button className='my-2 bg-teal-500 text-white text-xl py-2  px-4 leading-none rounded hover:bg-teal-600 mx-2'>
                                                        Edit
                                                    </button>
                                                </div>

                                            </div>
                                        </div> */}
                                        <BalanceCard balance={balance} setBalance={setBalance} />
                                            <div className='ml-2 w-1/2 bg-white shadow-xl rounded-lg'>
                                                <h1 className='text-2xl font-bold mx-5'>fiat Placeholder</h1>
                                            </div>
                                       
                                    </div>
                                    }


                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"

                                            >
                                                Save Changes
                                            </button>
                                        </div>

                                    </div>
                        </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
            )}
                </>
            )
            }

            export default ModalDetails