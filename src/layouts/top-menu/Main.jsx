import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { helper as $h } from "@/utils";
import { topMenu as useTopMenuStore } from "@/stores/top-menu";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import { useRecoilValue } from "recoil";
import { linkTo, nestedMenu } from "@/layouts/side-menu";
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
import logoUrl from "@/assets/images/logo.svg";
import classnames from "classnames";
import MobileMenu from "@/components/mobile-menu/Main";
import MainColorSwitcher from "@/components/main-color-switcher/Main";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import useService from "../../service";

function Main() {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState([]);
  const topMenuStore = useRecoilValue(useTopMenuStore);
  const topMenu = () => nestedMenu($h.toRaw(topMenuStore.menu), location);
  // --- //
  const {logout} = useAuth0();
  let {service} = useService();

  const {status, data, error, isLoading} = useQuery(['user'],() => {
    return service.find("users/by-token")
  });

  useEffect(() => {
    dom("body").removeClass("error-page").removeClass("login").addClass("main");
    setFormattedMenu(topMenu());
  }, [topMenuStore, location.pathname]);

  return (
    <div className="py-2">
      <DarkModeSwitcher />
      <MainColorSwitcher />
      <MobileMenu />
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
                  <div className="font-medium">{isLoading ? 'Loading...' : data.username}</div>
                  <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                    {isLoading ? 'Loading...' : data.email}
                  </div>
                </DropdownHeader>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
                </DropdownItem>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5" onClick={() => logout({returnTo: window.location.origin})}>
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
