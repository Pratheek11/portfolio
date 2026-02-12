import Image from 'next/image';
import { Tooltip } from 'primereact/tooltip';

export default function Socials() {
    return (
        <div className="flex flex-row justify-around items-center h-full w-full">
            <div className='flex items-center gap-2'>
                <Image 
                    src="/dp.jpg" 
                    alt="DP" 
                    width={40} 
                    height={40} 
                    className="rounded-full object-cover h-10"
                />
               <h1 className="text-2xl font-bold">Pratheek</h1>
            </div>
        </div>
    )
}