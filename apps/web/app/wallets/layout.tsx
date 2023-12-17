'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WalletsLayout({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState();
    const router = useRouter();


    return (
        <>
            <h1>Layout wallet</h1>
            <section>
                {children}
            </section>
        </>)
}