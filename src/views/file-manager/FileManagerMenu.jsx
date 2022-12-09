import {
    Lucide,
} from "@/base-components";
import { NavLink } from "react-router-dom";
import usePagination from "../../contexts/PaginationContext";


export default function FileManagerMenu() {
    const {setCurrentPage} = usePagination();
    const activeClasses = 'flex items-center px-3 py-2 rounded-md bg-primary text-white font-medium';
    const inactiveClasses = 'flex items-center px-3 py-2 mt-2 rounded-md';

    return (
        <div className="intro-y box p-5 mt-6">
            <div className="mt-1">
                <NavLink
                    className={({isActive})=> {
                        return isActive ? activeClasses : inactiveClasses
                    }}
                    onClick={() => setCurrentPage(0)}
                    to="/active/image"
                >
                    <Lucide icon="Image" className="w-4 h-4 mr-2"/> Images
                </NavLink>
                <NavLink
                    className={({isActive})=> {
                        return isActive ? activeClasses : inactiveClasses
                    }}
                    onClick={() => setCurrentPage(0)}
                    to="/active/video"
                >
                    <Lucide icon="Video" className="w-4 h-4 mr-2" /> Videos
                </NavLink>
                <NavLink
                    className={({isActive})=> {
                        return isActive ? activeClasses : inactiveClasses
                    }}
                    onClick={() => setCurrentPage(0)}
                    to="/active/text"
                >
                    <Lucide icon="File" className="w-4 h-4 mr-2" /> Documents
                </NavLink>
                <NavLink
                    href=""
                    className={({isActive})=> {
                        return isActive ? activeClasses : inactiveClasses
                    }}
                    onClick={() => setCurrentPage(0)}
                    to="/deleted/all"
                >
                    <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Trash
                </NavLink>
            </div>
        </div>
    );
}