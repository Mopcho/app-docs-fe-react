import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { topMenu as useTopMenuStore } from "@/stores/top-menu";
import { faker as $f } from "@/utils";
import { useRecoilValue } from "recoil";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "@/base-components";
import classnames from "classnames";
import MainColorSwitcher from "@/components/main-color-switcher/Main";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useService from "../../service";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState([]);
  const topMenuStore = useRecoilValue(useTopMenuStore);

  const queryClient = useQueryClient();
  // --- //
  let {service} = useService();

  const {data, isLoading} = useQuery(['user'],async() => {
    const response = await service.find("auth/me");

    if(response.status === 403) {
      navigate('/login');
    }

    return response.data;
  });

  const logout = async () => {
    await service.delete('auth/logout', null);

    navigate('/login');
  }

  const {mutate} = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
    onError: async() => {
      await queryClient.invalidateQueries();
    }
  }) 

  useEffect(() => {
    dom("body").removeClass("error-page").removeClass("login").addClass("main");
  }, [topMenuStore, location.pathname]);

  return (
    <div className="py-2">
      <DarkModeSwitcher />
      <MainColorSwitcher />
      {/* BEGIN: Top Bar */}
      <div className="border-b border-white/[0.08] mt-[2.2rem] md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 pt-3 md:pt-0 mb-10">
        <div className="top-bar-boxed flex items-center">
          {/* BEGIN: Logo */}
          <Link
            to="/top-menu/dashboard-overview-1"
            className="-intro-x hidden md:flex"
          >
            <span className="text-white text-lg ml-3"> MopDocs </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <nav aria-label="breadcrumb" className="-intro-x h-full mr-auto">
            <ol className="breadcrumb breadcrumb-light">
              <li className="breadcrumb-item">
                <a href="#">Application</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
          {/* END: Breadcrumb */}
          {/* BEGIN: Account Menu */}
          <Dropdown className="intro-x w-8 h-8">
            <DropdownToggle
              tag="div"
              role="button"
              className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
            >
              <img
                alt="Midone Tailwind HTML Admin Template"
                src={$f()[9].photos[0]}
              />
            </DropdownToggle>
            <DropdownMenu className="w-56">
              <DropdownContent className="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                <DropdownHeader tag="div" className="!font-normal">
                  <div className="font-medium">{isLoading ? 'Loading...' : data.email}</div>
                  <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                    {isLoading ? 'Loading...' : data.username}
                  </div>
                </DropdownHeader>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
                </DropdownItem>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5" onClick={() => mutate()}>
                  <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
      {/* BEGIN: Top Menu */}
      <nav className="top-nav">
        <ul>
          {formattedMenu.map((menu, menuKey) => (
            <li key={menuKey}>
              <a
                href={menu.subMenu ? "#" : menu.pathname}
                className={classnames({
                  "top-menu": true,
                  "top-menu--active": menu.active,
                })}
                onClick={(event) => {
                  event.preventDefault();
                  linkTo(menu, navigate);
                }}
              >
                <div className="top-menu__icon">
                  <Lucide icon={menu.icon} />
                </div>
                <div className="top-menu__title">
                  {menu.title}
                  {menu.subMenu && (
                    <Lucide icon="ChevronDown" className="top-menu__sub-icon" />
                  )}
                </div>
              </a>
              {/* BEGIN: Second Child */}
              {menu.subMenu && (
                <ul>
                  {menu.subMenu.map((subMenu, subMenuKey) => (
                    <li key={subMenuKey}>
                      <a
                        href={subMenu.subMenu ? "#" : subMenu.pathname}
                        className="top-menu"
                        onClick={(event) => {
                          event.preventDefault();
                          linkTo(subMenu, navigate);
                        }}
                      >
                        <div className="top-menu__icon">
                          <Lucide icon="Activity" />
                        </div>
                        <div className="top-menu__title">
                          {subMenu.title}
                          {subMenu.subMenu && (
                            <Lucide
                              icon="ChevronDown"
                              className="top-menu__sub-icon"
                            />
                          )}
                        </div>
                      </a>
                      {/* BEGIN: Third Child */}
                      {subMenu.subMenu && (
                        <ul>
                          {subMenu.subMenu.map(
                            (lastSubMenu, lastSubMenuKey) => (
                              <li key={lastSubMenuKey}>
                                <a
                                  href={
                                    lastSubMenu.subMenu
                                      ? "#"
                                      : lastSubMenu.pathname
                                  }
                                  className="top-menu"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    linkTo(lastSubMenu, navigate);
                                  }}
                                >
                                  <div className="top-menu__icon">
                                    <Lucide icon="Zap" />
                                  </div>
                                  <div className="top-menu__title">
                                    {lastSubMenu.title}
                                  </div>
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                      {/* END: Third Child */}
                    </li>
                  ))}
                </ul>
              )}
              {/* END: Second Child */}
            </li>
          ))}
        </ul>
      </nav>
      {/* END: Top Menu */}
      {/* BEGIN: Content */}
      <div className="content">
        <Outlet />
      </div>
      {/* END: Content */}
    </div>
  );
}

export default Main;
