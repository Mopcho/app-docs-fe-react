import { useContext, useState } from "react";
import { createContext } from 'react';
import React from 'react';
const PaginationContext = createContext('PaginationContext');


export function PaginationProvider({children}){
    let [currentPage, setCurrentPage] = useState(0);
    let [itemsPerPage, setItemsPerPage] = useState(10);
    return (
        //@ts-ignore
        <PaginationContext.Provider value={{currentPage,setCurrentPage,itemsPerPage,setItemsPerPage}}>
            {children}
        </PaginationContext.Provider>
    );
}

export default function usePagination(){
    return useContext(PaginationContext);
}
