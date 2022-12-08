import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
// import Router from "./router";
import { ServiceProvider } from "./service";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from './views/login/Main'
import ErrorPage from './views/error-page/Main';
import { WaitForAuthorizedService } from './service';
import TopMenu from "./layouts/top-menu/Main";
import FileManager from "./views/file-manager";

// App
function App() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          audience={import.meta.env.VITE_AUTH0_AUDIENCE}
          redirectUri={window.location.origin}
          connection="app-docs"
        >
          <QueryClientProvider client={queryClient}>
            <ServiceProvider>
              <WaitForAuthorizedService>
                <Routes>
                  <Route path="/" element={<Navigate to={'/active/image'}></Navigate>}></Route>
                  <Route path="/:status/:contentType" element={<TopMenu />}>
                    <Route path="/:status/:contentType" element={<FileManager />}></Route>
                  </Route>
                  <Route path="/login" element={<Login></Login>}></Route>
                  <Route path="/error-page" element={<ErrorPage />}></Route>
                  <Route path="/*" element={<ErrorPage />}></Route>
                </Routes>
                <ScrollToTop />
              </WaitForAuthorizedService>
            </ServiceProvider>
          </QueryClientProvider>
        </Auth0Provider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
