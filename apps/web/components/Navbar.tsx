'use client'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { UserProfile } from '@/types/UserProfile';
import { useAuth } from '@/context/authContext';

interface Props {

}

const Navbar = ({ }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loaded,setLoaded] = useState(false);
    const { user, logout, loading } = useAuth();
    const router = useRouter();
    
    console.log("navbar", user);
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 rounded shadow-2xl m-5">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link href="/"><span className="font-semibold text-xl tracking-tight">Wallet Tracker</span></Link>
            </div>
            <div className="block lg:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? '' : 'hidden'}`}>
                <div className="text-sm lg:flex-grow">
                    <Link href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Docs
                    </Link>
                    <Link href="/wallets" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Wallets</Link>
                </div>
                {user.email}
                {(user.email.length === 0) && <>
                    <div>
                        <Link href="/login" className="mx-2 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</Link>
                    </div>
                    <div>
                        <Link href="/signup" className="mx-2 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign up</Link>
                    </div>
                </>}
                {(user.email.length>0)  && <div>
                    <button onClick={logout} className="mx-2 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logoff</button>
                </div>}

            </div>
        </nav>
    )
}

export default Navbar