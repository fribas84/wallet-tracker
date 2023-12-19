import React, { useEffect, useState } from 'react'

interface Props {
    balance: number
    setBalance: React.Dispatch<React.SetStateAction<number>>
}

const BalanceCard = ({ balance, setBalance }: Props) => {
    const [wei, setWei] = useState<boolean>(true);
    const [displayedBalance, setDisplayedBalance] = useState<number>(0);

    useEffect(() => {
        const ethToWei = (eth: number) => {
            return eth * 1e18;
        }
        if (!wei) {
            setDisplayedBalance(balance);
        } else {
            setDisplayedBalance(ethToWei(balance));
        }

    }, [balance, wei])
    return (
        <div className='w-full bg-white shadow-xl rounded-lg'>
            <div className='flex justify-between border-b-2'>
                <h1 className='text-2xl font-bold mx-5 my-2'>Balance</h1>
                <div>
                    <button
                        className='my-2 bg-teal-500 text-white text-xl py-2 px-4 leading-none rounded hover:bg-teal-600 mx-2'
                        onClick={() => setWei(!wei)}
                    >
                        {wei ? 'eth' : 'wei'}
                    </button>
                    
                </div>
            </div>
            <div className="flex items-center my-10 mx-10">
                <label htmlFor='balance' className="text-lg font-bold text-gray-700 mr-2">Balance</label>
                <input
                    id="balance"
                    type='number'
                    pattern="([0-9]{1,3}).([0-9]{1,3})"
                    value={displayedBalance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    disabled={true}
                    className='p-2 border text-lg text-left border-teal-500  rounded-l w-3/4'
                />
                <span className='font-bold text-white  bg-teal-500 text-lg border py-2 px-4 border-teal-500 rounded-l w-1/5'>
                    {wei ? 'wei' : 'eth'}
                </span>

            </div>
        </div>
    )
}

export default BalanceCard