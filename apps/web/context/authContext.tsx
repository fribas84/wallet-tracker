'use client'

import { ReactNode, SetStateAction, createContext, useContext, useEffect, useState, Dispatch } from "react";


import { useRouter } from 'next/navigation'
import { IUserProfile } from "@/types/UserProfile";
import { axiosClient } from "@/config/axiosClient";


type authContextType = {
    user: IUserProfile;
    setUser: Dispatch<SetStateAction<IUserProfile>>;
    loading: boolean;
    logout: () => void;
    login: (email: string, password: string) => Promise<void>;
}


const authContextDefaultValues: authContextType = {
    user: { id: '', email: '' },
    setUser: () => { },
    loading: true,
    logout: () => { },
    login: async (email: string, password: string) => { }
}

const AuthContext = createContext<authContextType>(authContextDefaultValues);



interface Props {
    children: ReactNode;
};

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<IUserProfile>({ id: '', email: '' });
    const [loading, setLoading] = useState<boolean>(true);
    const [accessToken, setAccessToken] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        const fecthProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
            try {
                const url = `/users`
                const response = await axiosClient.get(url, config);
                const profileData = response.data;
                setUser(profileData);
            } catch (error) {
                setUser({ id: '', email: '' });
            }
            setLoading(false);
        }
        fecthProfile();
    }, [accessToken])

    const login = async (email: string, password: string) => {
        console.log('login')
        try {
            const url = `/auth/login`;
            const data = { email, password };
            const response = await axiosClient.post(url, data);
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);
            setAccessToken(access_token);
            router.push("/wallets");
        }
        catch (error) {
            throw (error.response.data);
        }
    }
    const logout = () => {
        localStorage.removeItem('token');
        setUser({ id: '', email: '' });
        router.push('/');
    }

    const value = {
        user,
        setUser,
        loading,
        logout,
        login
    }
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}