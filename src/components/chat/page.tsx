"use client";

import { createContext, Suspense, use, useContext, useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { useSearchParams } from "next/navigation";
import { PageContext } from "@/app/pageContext";
import ChatUtil from "@/utils/ChatUtil";
import InfoUtil from "@/utils/InfoUtil";
        
type Chat = {
    from: string;
    message: string;
}

function ChatContent() {
    const chatUtil = useRef(new ChatUtil()).current;
    const infoUtil = useRef(new InfoUtil()).current;
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [typingMessage, setTypingMessage] = useState("");
    let {page, ids, messages, setState} = useContext(PageContext);
    const [currentMessages, setCurrentMessages] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    }, [id]);

    const handleSendMessage = () => {
        if(typingMessage.trim() === "") return;
        
        let updatedMessages: Chat[] = [];
        const userMessage = {from: 'user', message: typingMessage};
        const botMessage = {from: 'bot', message: "..."};
        
        if(!id) {
            const newId = crypto.randomUUID();
            updatedMessages = [userMessage, botMessage];
            setState('ids', [...ids, newId]);
            setState('messages', new Map(messages.set(newId, updatedMessages)));
            setCurrentMessages(updatedMessages);
            const url = new URL(window.location.href);
            url.searchParams.set('id', newId);
            window.history.pushState({}, '', url.toString());
        } else {
            updatedMessages = [...currentMessages, userMessage, botMessage];
            setCurrentMessages(updatedMessages);
            setState('messages', new Map(messages.set(id, updatedMessages)));
        }
        
        setTypingMessage("");
        botResponse(updatedMessages);
    }

    const botResponse = async (updatedMessages: Chat[]) => {
        setLoading(true);
        let vec = await chatUtil.vectorizeMessage(typingMessage.toLowerCase());
        console.log("Message Vector: " + vec);
        let str: any = "";
        try {
            str = await chatUtil.similaritySearch(vec);
            console.log("Bot Response: " + str);
        } catch (error) {
            console.log("Bot Response Error:", error);
            str = error as string;
        }
        if(str === chatUtil.GREET) {
            str = chatUtil.greetBack[Math.floor(Math.random() * chatUtil.greetBack.length)];
        }
        if(str === chatUtil.ABOUT) {
            str = <div dangerouslySetInnerHTML={{ __html: infoUtil.getAbout() }} />;
        }
        if(str === chatUtil.CONTACT) {
            str = <div dangerouslySetInnerHTML={{ __html: infoUtil.getContact() }} />;
        }
        if(str === chatUtil.TRAINED) {
            str = <div dangerouslySetInnerHTML={{ __html: infoUtil.getTrainedInfo() }} />;
        }
        if(str === chatUtil.SKILLS) {
            str = <div dangerouslySetInnerHTML={{ __html: infoUtil.getSkills() }} />;
        }
        if(str === chatUtil.EXPERIENCE) {
            str = <div dangerouslySetInnerHTML={{ __html: infoUtil.getExperience() }} />;
        }
        if(str === chatUtil.PROJECTS) {
            str = <div dangerouslySetInnerHTML={{ __html: infoUtil.getProjects() }} />;
        }
        setTimeout(() => {
            updatedMessages.pop();
            const updatedList = [...updatedMessages, {from: 'bot', message: str || "Hello! 😀"}]
            setCurrentMessages(updatedList);
            setState('messages', new Map(messages.set(id!, updatedList)));
            setTypingMessage("");
            setLoading(false);
        }, 2000);
    }

    return (
        <div className="h-full flex flex-col gap-4 items-center justify-center">
            <div className={`w-full ${(id && currentMessages.length > 0) ? 'h-[calc(100%-96px)]' : 'h-10'} flex flex-col gap-6 items-center overflow-auto`}>
                {
                    currentMessages.map((chat, index) => {
                        return (
                            <div key={index} className="w-[80%]">
                                {chat.from === 'user' ? (
                                    <div className="bg-black text-white p-2 rounded-lg w-max max-w-1/2 break-words justify-self-end animate-slide-right">
                                        {chat.message}
                                    </div>
                                ) : (
                                    <div className={`bg-[#f1f1f1] text-black p-2 rounded-lg w-max max-w-2/3 break-words animate-slide-left 
                                        ${typeof chat.message === "string" && chat.message.includes("I am not capable") ? 'bg-[#fe4747]' : ''}`}>
                                        {typeof chat.message === "string" && chat.message.toLowerCase().includes("resume") ? 
                                            <div className="flex items-center gap-2 ml-1">
                                                <h4>Resume</h4>
                                                <Button icon="pi pi-download" rounded text aria-label="Download Resume" onClick={() => window.open('/PratheekBJ.pdf', '_blank')} />
                                            </div>
                                            : 
                                            chat.message
                                        }
                                    </div>
                                )}
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-full flex self-end items-center justify-center h-24">
                <div className="border rounded-2xl flex items-center w-1/2 h-20 p-2">
                    <InputTextarea placeholder="Type a message..." disabled={loading} value={typingMessage} onChange={(e) => setTypingMessage(e.target.value)} className="w-full resize-none" style={{border: 'none', boxShadow: 'none', outline: 'none'}} />
                    <Button icon="pi pi-arrow-up" onClick={handleSendMessage} disabled={loading} rounded aria-label="Send" size="small" style={{backgroundColor: 'black', outline: 'none', border: 'none', boxShadow: 'none'}}/>
                </div>
            </div>
        </div>
    );
}

export default function Chat() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChatContent />
        </Suspense>
    );
}