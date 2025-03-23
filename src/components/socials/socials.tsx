import { Tooltip } from 'primereact/tooltip';

export default function Socials() {
    return (
        <div className="flex flex-row pt-1.5 justify-around items-center h-10 w-full">
            <span>
                <a href="https://github.com/Pratheek11" target="#">
                    <i className="pi pi-github"></i>
                </a>
            </span>
            <span>
                <a href="https://www.linkedin.com/in/pratheek-achar-9a290a1b1" target="#">
                    <i className="pi pi-linkedin"></i>
                </a>
            </span>
            <span>
                <a href="mailto:pratheek1101@gmail.com" target="#">
                    <i className="pi pi-inbox"></i>
                </a>
            </span>
            <span>
                <Tooltip target=".tooltip" />
                <a href="/PratheekFSDevops.pdf" className='tooltip' data-pr-tooltip="Resume"  download target="#">
                    <i className="pi pi-file"></i>
                </a>
            </span>
        </div>
    )
}