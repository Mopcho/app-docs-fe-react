import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ServiceProvider } from "./service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Login} from './views/login/Login'
import ErrorPage from './views/error-page/Main';
import { WaitForAuthorizedService } from './service';
import TopMenu from "./layouts/top-menu/Main";
import FileManager from "./views/file-manager";
import { Register } from "./views/register/Register";
import { ProfilePage } from "./views/ProfilePage/Profile";


function App() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <ServiceProvider>
              <WaitForAuthorizedService>
                <Routes>
                  <Route path="/" element={<Navigate to={'/active/image'}></Navigate>}></Route>
                  <Route path="/" element={<TopMenu />}>
                    <Route path="/:status/:contentType" element={<FileManager />}></Route>
                    <Route path="/profile" element={<ProfilePage />}></Route>
                  </Route>
                  <Route path="/login" element={<Login></Login>}></Route>
                  <Route path="/register" element={<Register></Register>}></Route>
                  <Route path="/error-page" element={<ErrorPage />}></Route>
                  <Route path="/*" element={<ErrorPage />}></Route>
                </Routes>
                <ScrollToTop />
              </WaitForAuthorizedService>
            </ServiceProvider>
          </QueryClientProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
