import axios from 'axios';
import React, { Dispatch, SetStateAction, use, useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import Alert from '../Alert';
import BalanceCard from './BalanceCard';
import FiatCard from './FiatCard';

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
    const [balance, setBalance] = useState<number>(0);
    const [eur, setEur] = useState<number>(0);
    const [usd, setUsd] = useState<number>(0);



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
                const balanceData = response.data;
                setBalance(balanceData.balance);
                setIsOld(balanceData.isOld);
                setAlertError(false);
            } catch (error) {
                setLoading(false);
                setAlertError(true);
                setShowAlert(true);
                setAlertMsg(error.response.data.error || 'Something went wrong');
            }
        }
        const fetchRates = async () => {
            const url = `http://localhost:4000/api/v1/wallets/rates`;
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
                const rates = response.data;
                setEur(rates.eur);
                setUsd(rates.usd);
                setAlertError(false);
            } catch (error) {
                setLoading(false);
                setAlertError(true);
                setShowAlert(true);
                setAlertMsg(error?.response?.data.message || 'Something went wrong');
            }
        }

        const fetchData = async () => {
            setLoading(true);

            try {
                await fecthWalletDetails();
                await fetchRates();
            } catch (error) {
                setLoading(false);
                setAlertError(true);
                setShowAlert(true);
                setAlertMsg(error?.response?.data.message || 'Something went wrong');
            }

            setLoading(false);
        };

        if (showModalDetails) {
            fetchData();
        }
    }, [id, showModalDetails, setLoading])

    return (
        <>
            {showModalDetails && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                        <div className="my-6 mx-auto w-3/4">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg  flex flex-col w-full bg-gray-100 outline-none focus:outline-none">
                                {/*header*/}
                                {showAlert && <Alert error={alertError} msg={alertMsg} />}

                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Details of Wallet - {name}
                                    </h3>
                                    {isOld && <span className='border border-red-600 bg-red-200 my-2 mx-5 font-bold py-1 px-5'> Old wallet</span>}
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
                                    <div className='grid grid-cols-2 gap-4 mx-4 my-4'>

                                        <BalanceCard balance={balance} setBalance={setBalance} />
                                        <FiatCard balance={balance} usd={usd} eur={eur} />

                                    </div>
                                }


                                {/*footer*/}
                                <div className="grid mx-3 mb-2">
                                    <button
                                        className="text-white bg-red-500 rounded-lg  hover:bg-red-700 background-transparent font-bold uppercase px-6 py-4 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Close
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