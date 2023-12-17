'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Profile {
    id: string,
    email: string
}

export default function WalletsLayout({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState<Profile>();
    const router = useRouter();

    useEffect(() => {
        const fecthProfile = async () => {
            try {
                const url = `http://localhost:4000/api/v1/users`
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.get(url, config);
                console.log(response.data)
                const profileData = response.data;
                console.log(profileData);
                setProfile(profileData);
            } catch (error) {
                console.log(error);
            }
        }
        fecthProfile();

    },[router]);

    return (
        <>
            {/* <h1>Layout wallet Loged IN: {profile?.email} </h1> */}
            <section>
                {children}
            </section>
        </>)
}


