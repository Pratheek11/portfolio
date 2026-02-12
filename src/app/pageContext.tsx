"use client";

import { createContext, useState } from "react";

interface PageContextType {
    page: string;
    ids: string[];
    messages: Map<string, Chat[]>;
    setState: (key: 'page' | 'ids' | 'messages', value: any) => void;
}

type Chat = {
    from: string;
    message: string;
}

export const PageContext = createContext<PageContextType>({
    page: 'Home',
    ids: [],
    messages: new Map<string, Chat[]>(),
    setState: () => {},
});

export default function Context({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [page, setPage] = useState('Home');
    const [ids, setIds] = useState<string[]>([]);
    const [messages, setMessages] = useState<Map<string, Chat[]>>(new Map<string, Chat[]>());

    const setState = (key: 'page' | 'ids' | 'messages', value: any) => {
        if (key === 'page') setPage(value);
        else if (key === 'ids') setIds(value);
        else if (key === 'messages') {

        }
    };

    return (
        <PageContext.Provider value={{page, ids, messages, setState}}>
            {children}
        </PageContext.Provider>
    );
}