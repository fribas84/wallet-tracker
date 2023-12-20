import React, { useEffect, useState } from 'react'
import Alert from '../Alert'
import { axiosClient } from '@/config/axiosClient'

interface Props {
  balance: number
  usd: number
  eur: number
}

const FiatCard = ({ balance, usd, eur }: Props) => {
  const [usdUnit, setUsdUnit] = useState<boolean>(true);
  const [valueInFiat,setValueInFiat] = useState<number>(0);
  const [rateEditable, setRateEditable] = useState<boolean>(false);
  const [currentRate, setCurrentRate] = useState<number>(0);
  const [alert, setAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
  
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showAlert]);

  useEffect(() => {
    if (usdUnit) {
      setCurrentRate(usd);
    }
    else {
      setCurrentRate(eur);
    }
  }, [usdUnit,usd,eur])

  useEffect(() => {
    setValueInFiat(balance * currentRate);

  }, [currentRate,balance])

  const reset = () => {
    setRateEditable(false);
    setUsdUnit(true);
    setCurrentRate(usd);
  }

  const handleSave = async () => {
    if(currentRate === 0){
      setAlert(true);
      setAlertMsg('Rate cannot be 0');
      setShowAlert(true);
      return;
    }
    try {
      let body = {};
      if (usdUnit) {
        body = { usd: currentRate };
      }
      else {
        body = { eur: currentRate };
      }
      const url = '/wallets/rates'
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
      const response = await axiosClient.post(url, body, config);
      setAlert(false);
      setAlertMsg('Rate updated');
      setShowAlert(true);

    }
     
    catch (error) {
      setAlert(true);
      setAlertMsg(error.response.data.message ||  'Error updating rate');
      setShowAlert(true);
    }
  }

  return (
    <div className='w-full  bg-white shadow-xl rounded-lg'>
      {showAlert && <Alert error={alert} msg={alertMsg} />}
      <div className='flex justify-between border-b-2'>
        <h1 className='text-2xl font-bold mx-5 my-2'>To Fiat</h1>
        <div>
         
          <button
            className='my-2 bg-blue-500 text-white text-xl py-2 px-4 leading-none rounded hover:bg-blue-600 mx-2'
            onClick={() => setUsdUnit(!usdUnit)}
          >
            {usd ? 'usd' : 'eur'}
          </button>
          <button
            className='my-2 bg-gray-500 text-white text-xl py-2  px-4 leading-none rounded hover:bg-gray-600 mx-2'
            onClick={() => setRateEditable(!rateEditable)}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end mr-10 my-4">
        <div className='mb-4 w-full text-right'>
          <label htmlFor='rate' className="text-lg font-bold text-gray-700 mr-2">Rate</label>
          <input
            id="rate"
            type='number'
            value={currentRate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentRate(Number(e.target.value))}
            disabled={!rateEditable}
            className={`p-2 border w-1/2 text-lg text-left ${rateEditable ? 'border-teal-500' : 'border-gray-300'} rounded-l`}
          />
          <span className={`font-bold text-white  bg-teal-500 text-lg border py-3 px-4 first-letter:${rateEditable ? 'border-teal-500' : 'border-gray-300'} rounded-l w-1/5`}>
            {usdUnit ? 'usd' : 'eur'}
          </span>
        </div>
        <div className='mb-4 w-full text-right'>
          <label htmlFor='balanceInFiat' className="text-lg font-bold text-gray-700 mr-2">Balance in { usdUnit? 'usd': 'eur' }</label>
          <input
            id="balanceInFiat"
            type='number'
            value={valueInFiat}
            disabled={true}
            className='p-2 w-1/2 border text-lg text-left border-gray-300 rounded-l'
          />
          <span className='font-bold text-white  bg-teal-500 text-lg border py-3 px-4 border-gray-300 rounded-l w-1/5'>
            {usdUnit ? 'usd' : 'eur'}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        <button
          className="bg-yellow-500 text-white hover:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={reset}
        >
          reset
        </button>
        <button
          className="bg-emerald-500 text-white hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={handleSave}

        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default FiatCard