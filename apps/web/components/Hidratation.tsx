'use client';

import React, { useState, useEffect } from 'react';

/// Component to fix hidratation issues with NextJS
export const Hidratation = ({ children }: { children: React.ReactNode }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, [])

    if (!hasMounted) return null;

    return (
        <div>
            {children}
        </div>
    );

};