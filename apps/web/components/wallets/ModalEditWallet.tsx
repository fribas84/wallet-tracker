import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Alert from "../Alert";
import { isValidEthereumAddress } from "@/helpers/isValidEthereumAddress";
import { IWallet } from "@/types/Wallet";
import { axiosClient } from "@/config/axiosClient";

interface Props {
  wallet: IWallet;
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>
  updateWallet: (newWallet: IWallet) => void
}

export default function ModalEditWallet({wallet, showModal, setShowModal, updateWallet }: Props) {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>('');

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

  const handleClose = () => {

    setName('');
    setAddress('');
    setAlert(false);
    setShowAlert(false);
    setAlertMsg('');
    setShowModal(false);
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '') {
      setShowAlert(true);
      setAlert(true);
      setAlertMsg('Invalid name');
      return;
    }
    if (!isValidEthereumAddress(address)) {
      setShowAlert(true);
      setAlert(true);
      setAlertMsg('Invalid address');
      return;
    }
    setShowAlert(false);
    setAlert(false);
    setAlertMsg('');
    try {

      const url = `/wallets`
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
      const body = { name: name, address: address };
      const response = await axiosClient.post(url, body, config);
      setName('');
      setAddress('');
      updateWallet(response.data);
      setShowModal(false);

    }
    catch (error) {
      setShowAlert(true);
      setAlert(true);
      setAlertMsg(error.response.data.error || 'Error creating user');;
    }
  };
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
                <form onSubmit={handleSubmit} >
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      New Wallet to track
                    </h3>

                  </div>
                  {/*body*/}
                  <div className="flex flex-col items-center justify-center mt-16">
                    <div className="mb-4 w-3/4">
                      <label className="block mb-2 text-xl font-bold text-gray-700" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-6 w-3/4">
                      <label className="block mb-2 text-xl font-bold text-gray-700" htmlFor="address">
                        Address
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        placeholder="Ethereum wallet address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>


                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 focus:border focus:border-red-600"
                      type="button"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 focus:bg-emerald-100"
                      type="submit"

                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
