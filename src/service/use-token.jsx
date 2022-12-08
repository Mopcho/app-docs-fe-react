import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const useToken = () => {
    const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect, user } = useAuth0();
    let [token, setToken] = useState(null)

    useEffect(() => {
        if (!isLoading && isAuthenticated && !token) {
            getAccessTokenSilently().then(t => {
                setToken(t)
            })
        } else if (!isLoading && !isAuthenticated && !token) {
            loginWithRedirect()
        }
    }, [isAuthenticated, isLoading])

    return token;
}

export default useToken; 