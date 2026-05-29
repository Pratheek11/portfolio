"use client";

import { createContext, Suspense, use, useContext, useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { useSearchParams } from "next/navigation";
import { PageContext } from "@/app/pageContext";
import ChatUtil from "@/utils/ChatUtil";
import InfoUtil from "@/utils/InfoUtil";
import ReactMarkdown from 'react-markdown';
import useBatchedTyping from '@/hooks/useBatchedTyping';
        
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
    const [/*typingResponse*/, /*setTypingResponse*/] = useState("");
    const typingIntervalRef = useRef<number | null>(null); // left for compatibility if needed
    const { displayed: typingDisplayed, isTyping, start: startTyping, stop: stopTyping } = useBatchedTyping();
    const TYPING_BATCH_SIZE = 2;
    const TYPING_DELAY = 120;
    const [typingTargetIndex, setTypingTargetIndex] = useState<number | null>(null);
    const [typingFinalText, setTypingFinalText] = useState<string | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        return () => {
            if (typingIntervalRef.current !== null) {
                window.clearInterval(typingIntervalRef.current);
            }
            stopTyping();
        };
    }, []);

    // keep container scrolled when size changes
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container || typeof ResizeObserver === 'undefined') return;
        const ro = new ResizeObserver(() => scrollToBottom(true));
        ro.observe(container);
        return () => ro.disconnect();
    }, [messagesContainerRef.current]);

    const scrollToBottom = (smooth = true) => {
        const container = messagesContainerRef.current;
        if (container) {
            // prefer scrolling the container to avoid scrolling the whole page
            try {
                container.scrollTo({ top: container.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
            } catch (e) {
                container.scrollTop = container.scrollHeight;
            }
            return;
        }
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'end' });
        }
    };


    const handleSendMessage = (message?: string) => {

        const messageToSend = message ?? typingMessage;

        console.log("Sending Message: " + messageToSend);

        if(messageToSend.trim() === "") return;
        
        let updatedMessages: Chat[] = [];
        const userMessage = {from: 'user', message: messageToSend};
        const botMessage = {from: 'bot', message: "..."};
        // setTypingResponse("...");
        
        if(!id) {
            const newId = crypto.randomUUID();
            updatedMessages = [userMessage, botMessage];
            setState('ids', [...ids, newId]);
            const newMap = new Map(messages);
            newMap.set(newId, updatedMessages);
            setState('messages', newMap);
            setCurrentMessages(updatedMessages);
            const url = new URL(window.location.href);
            url.searchParams.set('id', newId);
            window.history.pushState({}, '', url.toString());
        } else {
            updatedMessages = [...currentMessages, userMessage, botMessage];
            setCurrentMessages(updatedMessages);
            const newMap = new Map(messages);
            newMap.set(id!, updatedMessages);
            setState('messages', newMap);
        }
        
        setTypingMessage("");
        // ensure scroll to new message
        // stop any ongoing typing bound to previous message
        stopTyping();
        setTypingTargetIndex(null);
        setTimeout(() => scrollToBottom(false), 0);
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
            str = infoUtil.getAbout();
        }
        if(str === chatUtil.CONTACT) {
            str = infoUtil.getContact();
        }
        if(str === chatUtil.TRAINED) {
            str = infoUtil.getTrainedInfo();
        }
        if(str === chatUtil.SKILLS) {
            str = infoUtil.getSkills();
        }
        if(str === chatUtil.EXPERIENCE) {
            str = infoUtil.getExperience();
        }
        if(str === chatUtil.PROJECTS) {
            str = infoUtil.getProjects();
        }
        setTimeout(() => {
            updatedMessages.pop();
            // insert placeholder bot message; the real text will be applied when typing finishes
            const updatedList = [...updatedMessages, {from: 'bot', message: '...'}]
            setCurrentMessages(updatedList);
            // update stored messages immutably
            const newMap = new Map(messages);
            newMap.set(id!, updatedList);
            setState('messages', newMap);
            // scroll then start typing effect
            setTimeout(() => scrollToBottom(true), 0);
            // mark which message index will receive the typing overlay and save final text
            const targetIndex = updatedList.length - 1;
            setTypingTargetIndex(targetIndex);
            setTypingFinalText(String(str ?? ""));
            startTyping(String(str ?? ""), TYPING_BATCH_SIZE, TYPING_DELAY);
            setTypingMessage("");
        }, 2000);
    }
    // typingEffect removed in favor of `useBatchedTyping` hook
    useEffect(() => {
        // When displayed typing changes, ensure scrolling keeps up
        scrollToBottom(true);
        if (!isTyping) {
            setLoading(false);
            // typing finished: apply final text (if available) to the target message, then clear target
            if (typingTargetIndex !== null && typingFinalText !== null) {
                const updated = [...currentMessages];
                if (updated[typingTargetIndex]) {
                    updated[typingTargetIndex] = { ...updated[typingTargetIndex], message: typingFinalText };
                    setCurrentMessages(updated);
                    const newMap = new Map(messages);
                    newMap.set(id!, updated);
                    setState('messages', newMap);
                }
                setTypingFinalText(null);
                setTypingTargetIndex(null);
            } else {
                setTypingTargetIndex(null);
            }
        }
    }, [typingDisplayed, isTyping]);

    return (
        <div className="h-full flex flex-col items-center justify-center relative">
            <div ref={messagesContainerRef} className={`${(id && currentMessages.length > 0) ? 'h-full' : 'h-10'} overflow-auto w-full flex justify-center`}>
            <div className="w-[80%] flex flex-col gap-6 md:w-[64%]">
                {
                    currentMessages.map((chat, index) => {
                        return (
                            <div key={index} className="w-full">
                                {chat.from === 'user' ? (
                                    <div className="flex flex-col justify-end bg-black text-white p-2 rounded-lg w-max break-words justify-self-end animate-slide-right">
                                        <p>{chat.message}</p>
                                    </div>
                                ) : (
                                    <div className={` text-black p-2 rounded-lg w-full break-words justify-self-start animate-slide-left 
                                        ${typeof chat.message === "string" && chat.message.includes("I am not capable") ? 'bg-[#fe4747]' : ''}`}>
                                        {typeof chat.message === "string" && chat.message.toLowerCase().includes("resume") ? 
                                            <div className="flex items-center gap-2 ml-1">
                                                <h4>Resume</h4>
                                                <Button icon="pi pi-download" rounded text aria-label="Download Resume" onClick={() => window.open('/PratheekBJ.pdf', '_blank')} />
                                            </div>
                                            : 
                                            typeof chat.message === "string" ? (
                                                <div className="prose prose-sm max-w-none text-black">
                                                    <ReactMarkdown 
                                                        components={{
                                                            h1: ({node, ...props}) => <h1 className="text-lg font-bold my-2" {...props} />,
                                                            h2: ({node, ...props}) => <h2 className="text-base font-bold my-2" {...props} />,
                                                            h3: ({node, ...props}) => <h3 className="text-sm font-bold my-1" {...props} />,
                                                            ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2" {...props} />,
                                                            ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2" {...props} />,
                                                            li: ({node, ...props}) => <li className="my-1" {...props} />,
                                                            a: ({node, ...props}) => <a className="text-blue-500 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                                            p: ({node, ...props}) => <p className="my-2" {...props} />,
                                                            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                                                            em: ({node, ...props}) => <em className="italic" {...props} />,
                                                        }}
                                                    >
                                                        {typingTargetIndex !== null && index === typingTargetIndex ? (typingDisplayed || chat.message) : chat.message}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                chat.message
                                            )
                                        }
                                    </div>
                                )}
                                { (index === currentMessages.length - 1) ?
                                    <div className="w-full h-26">
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        )
                    })
                }
            </div>
                    <div role="status" aria-live="polite" className="sr-only">{typingDisplayed}</div>
                    <div ref={messagesEndRef} />
            </div>
            <div className={`
                    w-full fixed flex justify-center h-24
                    transition-all duration-300 ease-in-out
                    ${currentMessages.length > 0 ? "bottom-0" : "bottom-[50%]"}
                    `}
            >
                    <div
                        className={`
                            absolute bottom-full w-[80%] md:w-[64%]
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
                    className="w-[80%] md:w-[64%] border rounded-2xl flex items-center h-20 p-2 bg-white"
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