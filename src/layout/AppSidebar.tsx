import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  ChevronDownIcon,
  ListIcon,
  PlayersIcon,
  CashiersIcon,
  DocsIcon,
  GamesIcon,
  JackpotIcon
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { useSelector } from "react-redux";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  roles?: string[];
  subItems?: { name: string; path: string; roles?: string[]; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <CashiersIcon />,
    name: "Dashboard",
    path: "/dashboard",
    roles: ["admin"]
  },
  {
    name: "Summary",
    icon: <DocsIcon />,
    subItems: [
      { name: "Summary", path: "/summary", roles: ["admin", "superagent", "agent"] },
      { name: "Game", path: "/report-game", roles: ["admin", "superagent", "agent"] },
      { name: "User", path: "/report-user", roles: ["admin", "superagent", "agent"] },
      { name: "Payments", path: "/report-payments", roles: ["admin", "superagent", "agent"] }
    ],
  },
  {
    name: "Report",
    icon: <DocsIcon />,
    subItems: [
      { name: "Financial", path: "/financial", roles: ["admin", "superagent", "agent"] },
      { name: "History", path: "/history", roles: ["admin", "superagent", "agent"] },
      { name: "Cash", path: "/report-cash", roles: ["admin", "superagent", "agent"] }
    ],
  },
  {
    icon: <PlayersIcon />,
    name: "Members",
    subItems: [
      {
        name: "Super Agents",
        path: "/superagent",
        roles: ["admin"]
      },
      {
        name: "Agents",
        path: "/agent",
        roles: ["admin", "superagent"]
      },
      {
        name: "Cashiers",
        path: "/cashier",
        roles: ["admin", "superagent", "agent"]
      },
      {
        name: "Players",
        path: "/player",
        roles: ["admin", "superagent", "agent"]
      },
    ]
  },

  {
    icon: <GamesIcon />,
    name: "Game List",
    path: "/games",
    roles: ["admin"]
  },
  {
    icon: <ListIcon />,
    name: "Provider List",
    path: "/provider",
    roles: ["admin"]
  },
  {
    icon: <JackpotIcon />,
    name: "Jackpot",
    path: "/jackpot",
    roles: ["admin", "superagent", "agent"]
  },

];

const othersItems: NavItem[] = [];

const supportItems: NavItem[] = [];

const AppSidebar: React.FC = () => {
  const auth = useSelector((state: any) => state.auth);
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, setIsMobileOpen } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "support" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "support", "others"].forEach((menuType) => {
      const items =
        menuType === "main"
          ? navItems
          : menuType === "support"
            ? supportItems
            : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "support" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "support" | "others"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const filterMenuItemsByRole = (items: NavItem[]) => {
    return items.filter(item => {
      if (!item.roles) {
        if (item.subItems) {
          // Filter subItems and only keep the item if it has visible subItems
          const filteredSubItems = item.subItems.filter(subItem =>
            !subItem.roles || subItem.roles.includes(auth?.userData?.permission?.title)
          );
          return filteredSubItems.length > 0;
        }
        return true;
      }
      return item.roles.includes(auth?.userData?.permission?.title);
    });
  };

  const renderMenuItems = (
    items: NavItem[],
    menuType: "main" | "support" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {filterMenuItemsByRole(items).map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => {
                handleSubmenuToggle(index, menuType);
              }}
              className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index
                ? "menu-item-active"
                : "menu-item-inactive"
                } cursor-pointer ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
                }`}
            >
              <span
                className={`menu-item-icon-size  ${openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                    ? "rotate-180 text-brand-500"
                    : ""
                    }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
              >
                <span
                  className={`menu-item-icon-size ${isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems
                  .filter(subItem => !subItem.roles || subItem.roles.includes(auth?.userData?.permission?.title))
                  .map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`menu-dropdown-item ${isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                          }`}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </li>
      ))
      }
    </ul >
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 overflow-y-auto pb-35
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-4 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
          }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="lg:block hidden"
                src="/images/logo/logo.png"
                alt="Logo"
                width={100}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex items-center gap-2 text-center justify-center text-2xl font-bold dark:text-white text-black">

        {auth.isAuth && (
          auth?.userData?.role === 'admin' ? "" : (auth?.userData?.balance)?.toFixed(2)
        )}

      </div>
      <div className="flex flex-col duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
