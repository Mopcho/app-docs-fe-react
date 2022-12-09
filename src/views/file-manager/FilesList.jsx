import {
    Lucide,
} from "@/base-components";
import SingleFile from "./SingleFile";
import { useQuery } from '@tanstack/react-query'
import useService from "../../service";
import { useState } from "react";
import { checkExtension } from "../../utils/mimeTypes";


export default function FilesList({ search, setFileToDelete, setFileToEdit , contentType, status }) {
    // pagination
    let [currentPage, setCurrentPage] = useState(0);
    let [itemsPerPage, setItemsPerPage] = useState(10);

    // get documents
    let { service } = useService();
    let { isLoading: loadingDocuments, data: documents } = useQuery(
        [contentType === 'all' ? 'all' : contentType.includes('video') ? 'media' : 'documents', {
            limit: itemsPerPage,
            offset: currentPage + itemsPerPage,
            contentType,
            status
        }],
        () => {
            return service.find(contentType === 'all' ? 'all' : contentType.includes('video') ? 'media' : 'documents', {
                pageSize: itemsPerPage,
                page: currentPage + 1,
                contentType,
                status,
                ...(search ? { name: search } : {})

            })
        }
    );

    // helpers
    const items = (documents && documents.data) ? documents.data : [];
    const total = (documents && documents.data) ? documents.total : 0;

    return (
        <>
            <div className="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5">
                {items.map((item, i) => (
                    <SingleFile
                        file={item}
                        checked={false}
                        onChange={() => { }}
                        edit={() => {
                            setFileToEdit(item.key);
                        }}
                        del={() => { setFileToDelete(item) }}
                        key={i}
                    />
                ))}
            </div>
            <Pagination
                total={total}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage} />
        </>

    );
}

export function Pagination({ total, setCurrentPage, currentPage, itemsPerPage, setItemsPerPage }) {

    const totalPages = Math.ceil(total / itemsPerPage)

    const pagesArr = [];
    for (let i = 0; i < totalPages; i++) {
        pagesArr.push("")
    }


    const showLeftDots = currentPage >= 2 && 2 < totalPages - 1;
    const showRightDots = currentPage <= totalPages - 3 && totalPages - 3 > 0;
    const itemIsVisible = (i) => {
        let show = false;

        if (currentPage === i) {
            show = true;
        } else if (currentPage > i) {
            if (currentPage === totalPages - 1) {
                if (i + 2 >= currentPage) {
                    show = true;
                }
            } else {
                if (i + 1 >= currentPage) {
                    show = true;
                }
            }

        } else if (currentPage < i) {
            if (currentPage === 0) {
                if (i - 2 <= currentPage) {
                    show = true;
                }
            } else {
                if (i - 1 <= currentPage) {
                    show = true;
                }
            }
        }
        return show;
    }

    return (
        <div className="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-6">
            {totalPages > 0 && (
                <nav className="w-full sm:w-auto sm:mr-auto">
                    <ul className="pagination">
                        <li className="page-item" onClick={() => setCurrentPage(0) }>
                            <a className="page-link" href="#" onClick={e => e.preventDefault()}>
                                <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                            </a>
                        </li>
                        <li className="page-item" onClick={() => { setCurrentPage(currentPage >= 1 ? currentPage - 1 : 0) }}>
                            <a className="page-link" href="#" onClick={e => e.preventDefault()}>
                                <Lucide icon="ChevronLeft" className="w-4 h-4" />
                            </a>
                        </li>
                        {
                            showLeftDots && (
                                <li className="page-item">
                                    <a className="page-link" href="#" onClick={e => e.preventDefault()}>
                                        ...
                                    </a>
                                </li>
                            )
                        }

                        {pagesArr.map((_, i) => {
                            let active = currentPage === i
                            return itemIsVisible(i) && (
                                <li className={`page-item ${active ? "active" : ""}`} onClick={() =>setCurrentPage(i)} key={i}>
                                    <a className="page-link" href="#" onClick={e => e.preventDefault()}>
                                        {i + 1}
                                    </a>
                                </li>
                            );
                        })}
                        {
                            showRightDots && (
                                <li className="page-item">
                                    <a className="page-link" href="#" onClick={e => e.preventDefault()}>
                                        ...
                                    </a>
                                </li>
                            )
                        }
                        <li className="page-item" onClick={() => { setCurrentPage(((currentPage + 1) < totalPages) ? (currentPage + 1) : (totalPages - 1)) }}>
                            <a className="page-link" href="#" onClick={e => e.preventDefault()}>
                                <Lucide icon="ChevronRight" className="w-4 h-4" />
                            </a>
                        </li>
                        <li className="page-item" onClick={() => { setCurrentPage(totalPages - 1) }}>
                            <a className="page-link" href="#" onClick={e => e.preventDefault()}>
                                <Lucide icon="ChevronsRight" className="w-4 h-4" />
                            </a>
                        </li>
                    </ul>
                </nav>
            )}

            <select className="w-20 form-select box mt-3 sm:mt-0" value={itemsPerPage} onChange={(e) => {
                setCurrentPage(0)
                setItemsPerPage(e.target.value)
            }
            }>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={35}>35</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
}
