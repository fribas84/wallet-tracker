import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Alert from "../Alert";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>
    id: number,
    name: string,
    deleteWallet: (id: number) => void
}

export default function ModalNewWallet({ showModal, setShowModal, id, name, deleteWallet }: Props) {
    const [alert, setAlert] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>('');

    const router = useRouter();
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showAlert) {
            timer = setTimeout(() => {
                setShowAlert(false);
                setShowModal(false)
            }, 3000); 
        }
        return () => clearTimeout(timer);
    }, [showAlert, setShowModal]);

    const handleDelete = async ()=>{
        try {
            const url = `http://localhost:4000/api/v1/wallets/${id}`
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
            const response = await axios.delete(url, config);

            setShowAlert(true);
            setAlert(false);
            setAlertMsg('Wallet removed');
            setShowModal(false);
            deleteWallet(id);

        } catch (error) {
            setShowAlert(true);
            setAlert(true);
            setAlertMsg(error.response.data.error || 'Error deleting wallet');
        }

    }
    const handleClose = () => {
  
        setAlert(false);
        setShowAlert(false);
        setAlertMsg('');
        setShowModal(false);
    }

    return (
        <>

            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                        <div className="relative my-6 mx-auto max-w-3xl w-3/4">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                {showAlert && <Alert error={alert} msg={alertMsg} />}

                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Remove Confirmation
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="flex flex-col items-center justify-center my-5">
                                    <h1 className="font-bold text-2xl "> Do you want to remove wallet id: {id} - {name} ?</h1>

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
