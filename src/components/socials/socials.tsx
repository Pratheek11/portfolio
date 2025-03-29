import { Tooltip } from 'primereact/tooltip';

export default function Socials() {
    return (
        <div className="flex flex-row pt-1.5 justify-around items-center h-10 w-full">
            <span className='transform transition duration-250 hover:scale-120'>
                <a href="https://github.com/Pratheek11" target="#">
                    <i className="pi pi-github"></i>
                </a>
            </span>
            <span className='transform transition duration-250 hover:scale-120'>
                <a href="https://www.linkedin.com/in/pratheek-achar-9a290a1b1" target="#">
                    <i className="pi pi-linkedin"></i>
                </a>
            </span>
            <span className='transform transition duration-250 hover:scale-120'>
                <a href="mailto:pratheek1101@gmail.com" target="#">
                    <i className="pi pi-inbox"></i>
                </a>
            </span>
            <span className='transform transition duration-250 hover:scale-120'>
                <Tooltip target=".tooltip" />
                <a href="/PratheekFSDevops.pdf" data-pr-tooltip="Resume"  download target="#" className="tooltip">
                    <i className="pi pi-file"></i>
                </a>
            </span>
        </div>
    )
}