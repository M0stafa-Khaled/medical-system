import { Dispatch, SetStateAction, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ChevronDown, ChevronRight, Dot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { linkVariants } from "@/shared/animations";
import { ILink } from "@/shared/types";

interface IProps {
  links: ILink[];
  sidebar?: boolean;
  setOpenNav?: Dispatch<SetStateAction<boolean>>;
}

const NavList = ({ links, sidebar, setOpenNav }: IProps) => {
  const [expandedLinks, setExpandedLinks] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleLinkExpansion = (linkName: string) => {
    setExpandedLinks((prev) => {
      return {
        ...prev,
        [linkName]: !prev[linkName],
      };
    });
  };
  const pathname = useLocation().pathname;

  const renderLinks = (links: ILink[], level = 0) => {
    return links.map((link, idx) => {
      const hasChildren = link.children && link.children.length > 0;
      const isExpanded = hasChildren && (expandedLinks[link.name] || false);
      const isChildLink = level > 0;

      const activeLink = link.path === pathname && link.path !== "/";
      return (
        <motion.li
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            {hasChildren ? (
              <div
                className={`hover:bg-primary/15 hover:text-primary flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-3 text-sm transition-all duration-300 select-none`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleLinkExpansion(link.name);
                }}
              >
                <span className="flex grow items-center gap-2">
                  {link.icon}
                  {link.name}
                </span>
                <motion.button
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer"
                >
                  {isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </motion.button>
              </div>
            ) : (
              <div
                className="w-full"
                onClick={() => setOpenNav && setOpenNav(false)}
              >
                <NavLink
                  to={link.path || "#"}
                  className={`${
                    isChildLink ? "pr-5" : ""
                  } hover:bg-primary/15 hover:text-primary flex w-full items-center justify-between gap-3 rounded-md px-4 py-3 text-sm transition-all duration-300 ${
                    activeLink
                      ? "bg-primary dark:bg-primary hover:bg-primary! shadow-primary text-white shadow-sm hover:text-white"
                      : ""
                  }`}
                >
                  {isChildLink && <Dot />}
                  <span className="flex grow items-center gap-1">
                    {link.icon}
                    {link.name}
                  </span>
                </NavLink>
              </div>
            )}
          </div>
          <AnimatePresence>
            {hasChildren && isExpanded && (
              <motion.ul
                className={`pl-${level * 4} flex flex-col gap-y-2`}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {renderLinks(link.children!, level + 1)}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.li>
      );
    });
  };

  return (
    <ul
      className={`custom-scrollbar flex h-full max-h-full w-full flex-col justify-start gap-y-2 overflow-y-auto px-2 ${
        sidebar ? "py-2" : "lg:flex-row"
      }`}
    >
      {renderLinks(links)}
    </ul>
  );
};

export default NavList;
