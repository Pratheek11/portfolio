import Header from "@/components/header/header";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full flex items-center justify-center">
      <Image
        alt="loading..."
        src="/kubernetes.svg"
        height={200}
        width={200}
        style={{animation: 'rotate 3s linear infinite'}}
      />
      {/* <Image
        alt="loading..."
        src="/docker.svg"
        height={200}
        width={200}
        style={{animation: 'init 2s ease-in-out'}}
      /> */}
    </div>
  );
}
