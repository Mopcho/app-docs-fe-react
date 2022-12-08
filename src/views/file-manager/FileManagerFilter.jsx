import {
    Lucide,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownContent,
    DropdownItem,
} from "@/base-components";

export default function FileManagerFilter({ onSearchChange, search, setAddModal }) {
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
                <Dropdown
                    className="inbox-filter absolute inset-y-0 mr-3 right-0 flex items-center"
                    placement="bottom-start"
                >
                    <DropdownToggle
                        tag="a"
                        role="button"
                        className="w-4 h-4 block"
                        href="#"
                    >
                        <Lucide
                            icon="ChevronDown"
                            className="w-4 h-4 cursor-pointer text-slate-500"
                        />
                    </DropdownToggle>
                    <DropdownMenu className="inbox-filter__dropdown-menu pt-2">
                        <DropdownContent tag="div">
                            <div className="grid grid-cols-12 gap-4 gap-y-3 p-3">
                                <div className="col-span-6">
                                    <label
                                        htmlFor="input-filter-1"
                                        className="form-label text-xs"
                                    >
                                        File Name
                                    </label>
                                    <input
                                        id="input-filter-1"
                                        type="text"
                                        className="form-control flex-1"
                                        placeholder="Type the file name"
                                    />
                                </div>
                                <div className="col-span-6">
                                    <label
                                        htmlFor="input-filter-2"
                                        className="form-label text-xs"
                                    >
                                        Shared With
                                    </label>
                                    <input
                                        id="input-filter-2"
                                        type="text"
                                        className="form-control flex-1"
                                        placeholder="example@gmail.com"
                                    />
                                </div>
                                <div className="col-span-6">
                                    <label
                                        htmlFor="input-filter-3"
                                        className="form-label text-xs"
                                    >
                                        Created At
                                    </label>
                                    <input
                                        id="input-filter-3"
                                        type="text"
                                        className="form-control flex-1"
                                        placeholder="Important Meeting"
                                    />
                                </div>
                                <div className="col-span-6">
                                    <label
                                        htmlFor="input-filter-4"
                                        className="form-label text-xs"
                                    >
                                        Size
                                    </label>
                                    <select
                                        id="input-filter-4"
                                        className="form-select flex-1"
                                    >
                                        <option>10</option>
                                        <option>25</option>
                                        <option>35</option>
                                        <option>50</option>
                                    </select>
                                </div>
                                <div className="col-span-12 flex items-center mt-3">
                                    <button className="btn btn-secondary w-32 ml-auto">
                                        Create Filter
                                    </button>
                                    <button className="btn btn-primary w-32 ml-2">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </DropdownContent>
                    </DropdownMenu>
                </Dropdown>
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
