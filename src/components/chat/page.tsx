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
    const open = typingMessage.startsWith("/");

    useEffect(() => {
    }, [id]);

    const handleSendMessage = (message?: string) => {

        const messageToSend = message ?? typingMessage;

        console.log("Sending Message: " + messageToSend);

        if(messageToSend.trim() === "") return;
        
        let updatedMessages: Chat[] = [];
        const userMessage = {from: 'user', message: messageToSend};
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
        botResponse(updatedMessages, messageToSend);
    }

    const getResponseMessage = (response: string): string => {
        let str: any = "";
        if(response === chatUtil.GREET) {
            str = chatUtil.greetBack[Math.floor(Math.random() * chatUtil.greetBack.length)];
        }
        if(response === chatUtil.ABOUT) {
            str = <div dangerouslySetInnerHTML={{ __html: infoUtil.getAbout() }} />;
        }
        if(response === chatUtil.CONTACT) {
            str = <div dangerouslySetInnerHTML={{ __html: infoUtil.getContact() }} />;
        }
        if(response === chatUtil.TRAINED) {
            str = <div dangerouslySetInnerHTML={{ __html: infoUtil.getTrainedInfo() }} />;
        }
        if(response === chatUtil.SKILLS) {
            str = <div dangerouslySetInnerHTML={{ __html: infoUtil.getSkills() }} />;
        }
        if(response === chatUtil.EXPERIENCE) {
            str = <div dangerouslySetInnerHTML={{ __html: infoUtil.getExperience() }} />;
        }
        if(response === chatUtil.PROJECTS) {
            str = <div dangerouslySetInnerHTML={{ __html: infoUtil.getProjects() }} />;
        }
        return str;
    }

    const handleShortcutClick = (shortcut: string) => {
        setTypingMessage(shortcut);
        handleSendMessage(shortcut);
    }

    const botResponse = async (updatedMessages: Chat[], message: string) => {
        setLoading(true);
        let vec = await chatUtil.vectorizeMessage(message.toLowerCase());
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
        <div className="h-full flex flex-col gap-4 items-center justify-center relative">
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
            <div className={`
                    w-full relative flex justify-center h-24
                    transition-all duration-300 ease-in-out
                    ${currentMessages.length > 0 ? "translate-y-0" : "-translate-y-[50%]"}
                    `}
            >
                    <div
                        className={`
                            absolute bottom-full w-1/2
                            flex justify-center
                            transition-all duration-150 ease-out
                            ${open 
                                ? "translate-y-0 opacity-100" 
                                : "translate-y-2 opacity-0 pointer-events-none"}
                        `}
                    >
                        <div className="w-[95%] bg-[#fff] rounded-2xl flex flex-col items-center max-h-50 overflow-auto" style={{border: '1px solid black', borderBottom: 0, borderRadius: '1rem 1rem 0 0'}}>
                            <div className="w-full">
                                <Button onClick={() => handleShortcutClick('About')} label="/about" style={{background: 'transparent', width: '100%', border: 0, color: 'black', textAlign: 'left', borderBottom: '1px solid #ccc', borderRadius: 0, outline: 'none', boxShadow: 'none'}} />
                            </div>
                            <div className="w-full">
                                <Button onClick={() => handleShortcutClick('Experience')} label="/experience" style={{background: 'transparent', width: '100%', border: 0, color: 'black', textAlign: 'left', borderBottom: '1px solid #ccc', borderRadius: 0, outline: 'none', boxShadow: 'none'}} />
                            </div>
                            <div className="w-full">
                                <Button onClick={() => handleShortcutClick('Projects')} label="/projects" style={{background: 'transparent', width: '100%', border: 0, color: 'black', textAlign: 'left', borderBottom: '1px solid #ccc', borderRadius: 0, outline: 'none', boxShadow: 'none'}} />
                            </div>
                            <div className="w-full">
                                <Button onClick={() => handleShortcutClick('Skills')} label="/skills" style={{background: 'transparent', width: '100%', border: 0, color: 'black', textAlign: 'left', borderBottom: '1px solid #ccc', borderRadius: 0, outline: 'none', boxShadow: 'none'}} />
                            </div>
                            <div className="w-full">
                                <Button onClick={() => handleShortcutClick('Contact')} label="/contact" style={{background: 'transparent', width: '100%', border: 0, color: 'black', textAlign: 'left', borderBottom: '1px solid #ccc', borderRadius: 0, outline: 'none', boxShadow: 'none'}} />
                            </div>
                            <div className="w-full">
                                <Button onClick={() => handleShortcutClick('Get me Resume')} label="/resume" style={{background: 'transparent', width: '100%', border: 0, color: 'black', textAlign: 'left', borderBottom: '1px solid #ccc', borderRadius: 0, outline: 'none', boxShadow: 'none'}} />
                            </div>
                            <div className="w-full">
                                <Button onClick={() => handleShortcutClick('How are you Trained ?')} label="/trained" style={{background: 'transparent', width: '100%', border: 0, color: 'black', textAlign: 'left', borderBottom: '1px solid #ccc', borderRadius: 0, outline: 'none', boxShadow: 'none'}} />
                            </div>
                        </div>
                    </div>
                <div
                    className="w-1/2 border rounded-2xl flex items-center h-20 p-2 bg-white"
                >
                    <InputTextarea placeholder="Type a message or /" disabled={loading} value={typingMessage} onChange={(e) => setTypingMessage(e.target.value)} className="w-full resize-none" style={{border: 'none', boxShadow: 'none', outline: 'none'}} />
                    <Button icon="pi pi-arrow-up" onClick={() => handleSendMessage()} disabled={loading} rounded aria-label="Send" size="small" style={{backgroundColor: 'black', outline: 'none', border: 'none', boxShadow: 'none'}}/>
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