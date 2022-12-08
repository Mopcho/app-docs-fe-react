import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton({ onClick, ...props }) {
    const { loginWithRedirect } = useAuth0();

  return (
    <button  onClick={(e) => {
        loginWithRedirect();
        onClick && onClick(e);
      }}
      {...props} className="btn btn-sm btn-primary w-24 mr-1 mb-2">Login</button>
  )
}
