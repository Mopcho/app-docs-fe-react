import {
    Lucide,
} from "@/base-components";
import { NavLink } from "react-router-dom";


export default function FileManagerMenu() {
    const activeClasses = 'flex items-center px-3 py-2 rounded-md bg-primary text-white font-medium';
    const inactiveClasses = 'flex items-center px-3 py-2 mt-2 rounded-md';

    return (
        <div className="intro-y box p-5 mt-6">
            <div className="mt-1">
                <NavLink
                    className={({isActive})=> {
                        return isActive ? activeClasses : inactiveClasses
                    }}
                    to="/active/image"
                >
                    <Lucide icon="Image" className="w-4 h-4 mr-2"/> Images
                </NavLink>
                <NavLink
                    className={({isActive})=> {
                        return isActive ? activeClasses : inactiveClasses
                    }}
                    to="/active/video"
                >
                    <Lucide icon="Video" className="w-4 h-4 mr-2" /> Videos
                </NavLink>
                <NavLink
                    className={({isActive})=> {
                        return isActive ? activeClasses : inactiveClasses
                    }}
                    to="/active/text"
                >
                    <Lucide icon="File" className="w-4 h-4 mr-2" /> Documents
                </NavLink>
                <NavLink
                    href=""
                    className={({isActive})=> {
                        return isActive ? activeClasses : inactiveClasses
                    }}
                    to="/deleted/all"
                >
                    <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Trash
                </NavLink>
            </div>
        </div>
    );
}