import axios from 'axios';
import React, { Dispatch, SetStateAction, use, useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';

interface Props {
    name: string,
    id: number
    showModalDetails: boolean,
    setShowModalDetails: Dispatch<SetStateAction<boolean>>

}

const ModalDetails = ({ name, id, showModalDetails, setShowModalDetails }: Props) => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>('');
    const [isOld, setIsOld] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    const handleClose = () => {
        setShowModalDetails(false);
    }

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
            const response = await axios.get(url, config);
            console.log("response", response);
            setLoading(false);
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
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                {showAlert && <Alert error={alert} msg={alertMsg} />}

                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Details of Wallet - {name}
                                    </h3>
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

                                {
                                    loading &&
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
                                {!loading && <>

                                    <div className="flex items-center justify-between mt-16">
                                        <div className='bg-teal-200 w-1/2 mx-2'>
                                            <h1 className='text-3xl font-bold'>Balance</h1>
                                        </div>
                                        <div className='bg-yellow-200 w-1/2 mx-2'>
                                            <h2 className='text-2xl font-bold'> other data</h2>
                                      </div>

                                    </div>
                                </>}


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