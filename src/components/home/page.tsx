"use client";

import Loading from "@/components/loader/loading";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skills from "../skills/page";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])

  return (
    <div className="w-full h-full flex overflow-auto mb-2">
      {
        loading ?
          <Loading />
          :
          <div className="w-4/5 flex flex-col gap-5 self-center m-auto">
            <div className="w-full flex">
              <div className="w-1/4 overflow-hidden">
                <Image
                  alt="dp"
                  src="/profile.png"
                  height={100}
                  width={300}
                  style={{ borderRadius: '50%' }}
                />
              </div>
              <div className="w-3/4 flex flex-col items-start justify-center gap-2.5">
                <div>
                  <h1>Hey, I'm Pratheek  <span className="hover:animate-pulse hover:cursor-grab">👋</span></h1>
                </div>
                <div>
                  <p>Software Engineer with 1+ years of experience in developing Web Applications, Micro-services and Kubernetes deployments.</p>
                </div>
                <div>
                  <p className="text-xs">
                    <i className="pi pi-map-marker"></i>
                    &nbsp;
                    Bangalore, India
                  </p>
                </div>
              </div>
            </div>
            <Skills />
          </div>
      }
    </div>
  );
}
