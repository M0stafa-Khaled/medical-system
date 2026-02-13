import { Dispatch, SetStateAction, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ChevronDown, ChevronRight, Dot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { linkVariants, navItemsVariants } from "@/animations/navbarAnimations";
import { ILink } from "@/interfaces";

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
              <motion.div
                variants={navItemsVariants}
                className={`w-full cursor-pointer rounded-lg px-3 py-2.5 text-[15px] text-black transition-all duration-300 select-none dark:text-white ${
                  sidebar ? "border-muted border" : ""
                } hover:bg-dark/10 dark:hover:bg-dark/50 flex items-center justify-between gap-2`}
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
                >
                  {isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                variants={navItemsVariants}
                className="w-full"
                onClick={() => setOpenNav && setOpenNav(false)}
              >
                <NavLink
                  to={link.path || "#"}
                  className={`${
                    isChildLink ? "mt-2 pr-4" : ""
                  } w-full rounded-lg px-2 py-2.5 text-[15px] text-black transition-all duration-300 dark:text-white ${
                    sidebar ? "border-muted border" : ""
                  } flex items-center justify-between gap-2 ${
                    activeLink
                      ? "bg-background dark:bg-dark"
                      : "hover:bg-background dark:hover:bg-dark/50"
                  }`}
                >
                  {isChildLink && <Dot />}
                  <span className="flex grow items-center gap-1">
                    {link.icon}
                    {link.name}
                  </span>
                </NavLink>
              </motion.div>
            )}
          </div>
          <AnimatePresence>
            {hasChildren && isExpanded && (
              <motion.ul
                className={`pl-${level * 4}`}
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
    <motion.ul
      className={`custom-scrollbar flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto ${
        sidebar ? "pb-3" : "lg:flex-row"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderLinks(links)}
    </motion.ul>
  );
};

export default NavList;
