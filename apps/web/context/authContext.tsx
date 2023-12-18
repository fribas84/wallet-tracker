'use client'

import { ReactNode, SetStateAction, createContext, useContext, useEffect, useState, Dispatch } from "react";


import { useRouter } from 'next/navigation'
import axios from "axios";
import { UserProfile } from "@/types/UserProfile";


type authContextType = {
    user: UserProfile;
    setUser: Dispatch<SetStateAction<UserProfile>>;
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
    const [user, setUser] = useState<UserProfile>({ id: '', email: '' });
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
                const url = `http://localhost:4000/api/v1/users`
                const response = await axios.get(url, config);
                const profileData = response.data;
                console.log("try ", profileData);
                setUser(profileData);
            } catch (error) {
                setUser({ id: '', email: '' });
            }
            setLoading(false);
        }
        fecthProfile();
    }, [accessToken])

    const login = async (email: string, password: string) => {
        try {
            const url = `http://localhost:4000/api/v1/auth/login`;
            const data = { email, password };
            const response = await axios.post(url, data);
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);
            setAccessToken(access_token);
            router.push("/wallets");
        }
        catch (err) {
            throw new Error(err.response.data.message);
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
    console.log("auth context: ",user);
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}