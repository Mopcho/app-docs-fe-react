import service from "./service";
import useToken from "./use-token";
import { useEffect, useState } from "react";
import { createContext, useContext } from 'react';
const ServiceContext = createContext('ServiceContext');


export function ServiceProvider({children}){

    let token = useToken();
    let [_service, setService] = useState(null)
    
    useEffect(()=>{
        if(token && !_service){
            setService(service(token))
        }
    }, [token])
    
    return (
        <ServiceContext.Provider value={{service: _service, isLoading: _service ? false : true }}>
            {children}
        </ServiceContext.Provider>
    );
}


export default function useService(){
    return useContext(ServiceContext);
}

