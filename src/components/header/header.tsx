"use client";

import Link from "next/link";
import codelottie from "./../../../public/lottie/code.lottie/animations/code.json";
import Lottie from "lottie-react";
import Image from "next/image";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useState } from "react";
import { useRouter } from 'next/navigation';

const style = {
    height: 80,
    width: 80
}

const pages = [
    "Home",
    "Skills",
    "Experience"
]

export default function Header() {
    const router = useRouter();
    const [selectedCity, setSelectedCity] = useState('Home');

    const onSelectionChange = (e: DropdownChangeEvent) => {
        setSelectedCity(e.value);
        if(e.value == 'Home') router.push('/');
        else router.push(e.value.toLowerCase());
    }

    return (
        <div className="flex flex-row justify-center items-center h-20 w-full">
            <div className="flex flex-row items-center justify-around w-1/2">
                <div className="flex items-center  rounded-md bg-gray-200 w-full p-2 text-black">
                    <i className="pi pi-dollar" style={{scale: 1.2}}></i> 
                    &nbsp;
                    <p>helm install</p> 
                    &nbsp;
                    <Dropdown 
                        value={selectedCity}
                        onChange={(e) => onSelectionChange(e)}
                        options={pages}
                        placeholder="Select a page"
                        className="p-inputtext-sm"
                    />
                    &nbsp;
                    <p>-n pratheek</p> 
                </div>
            </div>
        </div>
    )
}