import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { linkVariants, navItemsVariants } from "@/animations/navbarAnimations";
import { ILink } from "@/interfaces";

interface IProps {
  links: ILink[];
  sidebar?: boolean;
}

const NavList = ({ links, sidebar }: IProps) => {
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
                className={`select-none w-full px-3 cursor-pointer py-2.5 text-[15px] text-black dark:text-white transition-all duration-300 rounded-lg ${
                  sidebar ? "border border-muted" : ""
                } flex items-center justify-between gap-2 hover:bg-dark/10 dark:hover:bg-dark/50`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleLinkExpansion(link.name);
                }}
              >
                <span className="flex-grow flex items-center gap-2">
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
              <motion.div variants={navItemsVariants} className="w-full">
                <NavLink
                  to={link.path || "#"}
                  className={`w-full ${
                    isChildLink ? "mt-2" : ""
                  } py-2.5 px-3 text-black dark:text-white transition-all duration-300 rounded-lg ${
                    sidebar ? "border border-muted" : ""
                  } flex items-center justify-between gap-2 text-[15px] ${
                    activeLink
                      ? "bg-background dark:bg-dark"
                      : "hover:bg-background dark:hover:bg-dark/50"
                  }`}
                >
                  <span className="flex-grow flex items-center gap-2">
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
      className={`w-full h-full flex flex-col gap-2 justify-start max-h-full overflow-y-auto custom-scrollbar ${
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
