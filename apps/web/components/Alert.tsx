import React from 'react'

interface Props  {
    error: boolean;
    msg: string;
}

const Alert = ({error, msg}: Props) => {
  return (
   
        <div className={`${error ? 'from-red-400 to-red-600' : 'from-teal-400 to-teal-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white m-10`}>
            {msg}
        </div>
   
  )
}

export default Alert