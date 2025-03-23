"use client";

import { createContext, useState } from "react";

interface PageContextType {
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

export const PageContext = createContext<PageContextType>({
    page: 'Home', // Initial page value
    setPage: () => {}, // Initial setPage function (no-op)
});

export default function Context({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [page, setPage] = useState('Home');

    return (
        <PageContext.Provider value={{page, setPage}}>
            {children}
        </PageContext.Provider>
    );
}