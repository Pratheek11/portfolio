"use client";

import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useContext, useEffect, useState } from "react";
import { PageContext } from '@/app/pageContext';

const style = {
    height: 80,
    width: 80
}

const pages = [
    "Home",
    "Experience",
    "Projects",
]

export default function Header() {
    let timer: NodeJS.Timeout;
    const [sudoMsg, setSudoMsg] = useState("");
    let {page, setPage} = useContext(PageContext);

    const onSelectionChange = (e: DropdownChangeEvent) => {
        setPage(e.value);
    }

    const handleSudoMsg = () => {
        clearTimeout(timer);
        setSudoMsg("Sorry, user is not allowed to perform these actions!")
        timer =  setTimeout(() => {
            setSudoMsg("");
        }, 3000);
    }

    useEffect(() => {
        
        () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <div className="flex flex-row items-center justify-center h-40 w-full">
            <div className="flex flex-col justify-center items-center w-4/5">
                <div className="flex items-center rounded-t-md bg-gray-500 w-full text-black">
                    <i onClick={handleSudoMsg} className="pi pi-times scale-50 bg-red-600 rounded-xl p-1 cursor-pointer transform transition duration-250 hover:scale-65"></i>
                    <i onClick={handleSudoMsg} className="pi pi-minus scale-50 bg-yellow-400 rounded-xl p-1 cursor-pointer transform transition duration-250 hover:scale-65"></i>
                    <i onClick={handleSudoMsg} className="pi pi-arrow-up-right-and-arrow-down-left-from-center scale-50 bg-green-500 rounded-xl p-1 cursor-pointer transform transition duration-250 hover:scale-65"></i>
                </div>
                <div className="flex flex-col items-start  rounded-b-md bg-gray-200 w-full p-2 text-black">
                    <div className="flex items-center flex-wrap">
                        <i className="pi pi-dollar" style={{scale: 1.2}}></i> 
                        &nbsp;
                        <p>helm install</p> 
                        &nbsp;
                        <Dropdown 
                            value={page}
                            onChange={(e) => onSelectionChange(e)}
                            options={pages}
                            placeholder="Select a page"
                            className="p-inputtext-sm"
                            />
                        &nbsp;
                        <p>-n pratheek</p> 
                        &nbsp;
                        <span className="animate-ping">|</span>
                    </div>
                    <div>
                        <span className="text-red-500 text-sm animate-pulse">{sudoMsg}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}