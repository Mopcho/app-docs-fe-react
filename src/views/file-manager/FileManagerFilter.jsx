import {
    Lucide,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownContent,
    DropdownItem,
} from "@/base-components";
import { useQuery } from "@tanstack/react-query";

export default function FileManagerFilter({ onSearchChange, search, setAddModal}) {
    return (
        <div className="intro-y flex flex-col-reverse sm:flex-row items-center">
            <div className="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
                <Lucide
                    icon="Search"
                    className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"
                />
                <input
                    type="text"
                    className="form-control w-full sm:w-64 box px-10"
                    placeholder="Search files"
                    onChange={onSearchChange}
                    value={search}
                />
            </div>
            <div className="w-full sm:w-auto flex">
                <button
                    className="btn btn-primary shadow-md mr-2"
                    onClick={() => setAddModal(true)}
                >
                    Upload New Files
                </button>
                <Dropdown>
                    <DropdownToggle className="btn px-2 box">
                        <span className="w-5 h-5 flex items-center justify-center">
                            <Lucide icon="Plus" className="w-4 h-4" />
                        </span>
                    </DropdownToggle>
                    <DropdownMenu className="w-40">
                        <DropdownContent>
                            <DropdownItem>
                                <Lucide icon="File" className="w-4 h-4 mr-2" /> Share
                                Files
                            </DropdownItem>
                            <DropdownItem>
                                <Lucide icon="Settings" className="w-4 h-4 mr-2" />{" "}
                                Settings
                            </DropdownItem>
                        </DropdownContent>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
}
