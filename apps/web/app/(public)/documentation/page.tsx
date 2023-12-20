import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div className="flex flex-col items-center justify-center mt-16">
            <div className="w-2/3 p-8 bg-white rounded shadow-md">
                <h1 className='font-bold text-xl text-center'> Documentation </h1>
                <ul>
                    <li>  <div>
                        <a href="https://nest-js-server-production.up.railway.app/api">Swagger Specification</a>
                    </div></li>
                </ul>
            </div>
        </div>
    )
}

export default page