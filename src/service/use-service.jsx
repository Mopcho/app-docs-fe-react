import { useState } from "react";
import { createContext, useContext } from 'react';
import service from "./service";
const ServiceContext = createContext('ServiceContext');


export function ServiceProvider({children}){

    let [_service, setService] = useState(service);
    
    return (
        <ServiceContext.Provider value={{service: _service, isLoading: _service ? false : true }}>
            {children}
        </ServiceContext.Provider>
    );
}


export default function useService(){
    return useContext(ServiceContext);
}

