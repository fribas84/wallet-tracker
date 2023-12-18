import React, { useEffect, useState } from 'react'

interface Props {
    balance: number
    setBalance: React.Dispatch<React.SetStateAction<number>>
}

const BalanceCard = ({ balance, setBalance }: Props) => {
    const [wei, setWei] = useState<boolean>(true);
    const [balanceEditable, setBalanceEditable] = useState<boolean>(false);
    const [displayedBalance, setDisplayedBalance] = useState<number>(0);

    useEffect(() => {
        const ethToWei = (eth: number) => {
            return eth * 1e18;
        }
        if (!wei) {
            console.log("balance in eth", balance)
            setDisplayedBalance(balance);
        } else {
            console.log("ethtowei(balance)", ethToWei(balance));
            setDisplayedBalance(ethToWei(balance));
        }

    }, [balance, wei])
    return (
        <div className='mr-2 w-1/2 bg-white shadow-xl rounded-lg items-center p-5'>
            <div className='flex justify-between border-b-2'>
                <h1 className='text-2xl font-bold mx-5'>Balance</h1>
                <div>
                    <button
                        className='my-2 bg-teal-500 text-white text-xl py-2 px-4 leading-none rounded hover:bg-teal-600 mx-2'
                        onClick={() => setWei(!wei)}
                    >
                        {wei ? 'eth' : 'wei'}
                    </button>
                    <button
                        className='my-2 bg-teal-500 text-white text-xl py-2  px-4 leading-none rounded hover:bg-teal-600 mx-2'
                        onClick={() => setBalanceEditable(!balanceEditable)}
                    >
                        Edit
                    </button>
                </div>
            </div>
            <div className="flex items-center my-5 mx-10">
                <input
                    type='number'
                    pattern="([0-9]{1,3}).([0-9]{1,3})"
                    value={displayedBalance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    disabled={!balanceEditable}
                    className={`p-2 border text-lg text-left ${balanceEditable ? 'border-teal-500' : 'border-gray-300'} rounded-l w-3/4`}
                />
                <span className={`font-bold text-white  bg-teal-500 text-lg border py-2 px-4 first-letter:${balanceEditable ? 'border-teal-500' : 'border-gray-300'} rounded-l w-1/5`}>
                    {wei ? 'wei' : 'eth'}
                </span>

            </div>
        </div>
    )
}

export default BalanceCard