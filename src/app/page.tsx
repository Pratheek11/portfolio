"use client";

import Experience from "@/components/experience/page";
import Header from "@/components/header/header";
import Home from "@/components/home/page";
import Socials from "@/components/socials/socials";
import { createContext, useContext, useState } from "react";
import Context, { PageContext } from "./pageContext";
import Projects from "@/components/projects/page";
import Custom404 from "./pages/404";
import Chat from "@/components/chat/page";

export default function Page() {
    let { page } = useContext(PageContext);

    return (
        <div className="overflow-hidden h-full">
            <div className="w-full h-[10%]">
                <Socials />
            </div>
            {/* <Socials />
            <Header />
            <div className="bodyContent">
                {page == 'Home' ? <Home /> : page == 'Experience' ? <Experience /> :  page == 'Projects' ? <Projects /> : <Custom404 />}
            </div> */}
            <div className="w-full h-[90%]">
                <Chat/>
            </div>
        </div>
    );
}