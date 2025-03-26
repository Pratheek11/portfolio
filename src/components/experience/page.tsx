"use client";

import Loading from "@/components/loader/loading";
import Image from "next/image";
import { useEffect, useState } from "react";
import experience from '../../data/experience.json';

export default function Experience() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  },  [])

  return (
    <div className="w-full h-full flex overflow-auto pt-2 mb-2">
      {
        loading ? 
          <Loading/> 
        :
          <div className="w-4/5 m-auto h-auto flex flex-col gap-10 relative before:absolute before:w-0.5 before:h-full before:left-5/10 before:-z-50 before:bg-blue-400">
            {experience.map(el => {
              return (
                <div key={el.role} className={` relative z-50 bg-background w-full h-auto p-2 rounded-md shadow-sm ml-auto ${el.active ? 'activeExp' : 'notActiveExp'} transform transition duration-250 hover:scale-110 `}>
                  {el.active ? 
                    <div className="absolute -left-7 rounded-4xl h-6 w-6 bg-background flex items-center justify-center">
                      <Image 
                        alt="dp"
                        src="/docker.svg"
                        height={100}
                        width={100}
                      />
                    </div>
                    :
                    <></>
                    // <div className="absolute -left-7 rounded-4xl h-6 w-6 bg-gray-400 flex items-center justify-center">
                    // </div>
                  }
                  <p className="absolute -top-3 right-2 bg-background p-0.5">{el.fromTo}</p>
                  <div className="flex items-center">
                    <h3>{el.company} &nbsp; : &nbsp; {el.role}</h3>
                  </div>
                  <br/>
                  <div>
                    {el.description.map(p => <p key={p}>· {p}</p>)}
                  </div>
                  <p>{el.techUsed}</p>
                </div>
              )
            })}
          </div>
      }
    </div>
  );
}
