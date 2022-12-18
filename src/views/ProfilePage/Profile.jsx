import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useService from "../../service";

export const ProfilePage = () => {
    const {service} = useService();
    const navigate = useNavigate();
    const {data, isLoading} = useQuery(['user'],async() => {
        const response = await service.find("auth/me");
    
        if(response.status === 403) {
          navigate('/login');
        }
    
        return response.data;
      });
    return (
        <section>
            <h1 className="text-4xl text-center my-10">Under Construction...</h1>
        </section>
    )
}