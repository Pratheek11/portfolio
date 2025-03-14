"use client";

import Header from "@/components/header/header";
import Loading from "@/components/loader/loading";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  },  [])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {
        loading ? 
          <Loading/> 
        :
          <p>Experience</p>
      }
    </div>
  );
}
