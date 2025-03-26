"use client";

import Experience from "@/components/experience/page";
import Header from "@/components/header/header";
import Home from "@/components/home/page";
import Socials from "@/components/socials/socials";
import { createContext, useContext, useState } from "react";
import Context, { PageContext } from "./pageContext";

export default function Page() {
    let {page} = useContext(PageContext);

    return (
        <div className="overflow-hidden">
            <Socials/>
            <Header/>
            <div className="bodyContent">
                {page == 'Home' ?  <Home/> : <Experience/>}
            </div>
        </div>
    );
}