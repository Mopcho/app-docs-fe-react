import useService, { ServiceProvider } from "./use-service"
import { helpers } from "./service";

export { ServiceProvider, helpers };

export function WaitForAuthorizedService({ children }) {
  let { service, isLoading } = useService();
  if (isLoading) return null;
  return children;
}

export default useService;
