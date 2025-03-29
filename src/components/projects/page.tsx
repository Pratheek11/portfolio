"use client";

import Loading from "@/components/loader/loading";
import Image from "next/image";
import { useEffect, useState } from "react";
import projects from '../../data/projects.json';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
        
export default function Projects() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  },  [])

  return (
    <div className="w-full h-full flex overflow-auto pt-5 mb-2">
      {
        loading ? 
          <Loading/> 
        :
          <div className="w-4/5 m-auto h-auto flex flex-col gap-5">
            {projects.map(el => {return(
              <div className="relative z-50 flex max-[380px]:flex-col max-[380px]:items-center max-[380px]:h-auto w-full h-25 border-[0.5px] border-gray-500 rounded-md p-1 m-0" key={el.title}>
                <div className="absolute -top-5 -right-5 z-10 scale-80 transform transition duration-250 hover:scale-90">
                  <Button icon="pi pi-code" onClick={() =>  window.open(el.repo, '_blank')} rounded severity="secondary" aria-label="Filter" size="small"/>
                </div>
                <div className="flex flex-col items-center justify-center w-[45%] max-[380px]:w-4/5">
                  <h2>{el.title}</h2>
                  <div className="flex gap-0.5">
                    <p className="text-gray-500 text-xs md:text-lg">{el.tech.toString()}</p>
                  </div>
                </div>
                <div className="w-[45%] max-[380px]:w-4/5 flex items-center text-center">
                  <p className="text-xs md:text-sm">{el.description}</p>
                </div>
              </div>
            )})}
          </div>
      }
    </div>
  );
}
