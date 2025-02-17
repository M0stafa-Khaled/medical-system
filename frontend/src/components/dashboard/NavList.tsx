import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { GoDot } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { linkVariants } from "@/animations/navbarAnimatons";

export interface ILink {
  name: string;
  path?: string;
  children?: ILink[];
}

interface IProps {
  links: ILink[];
  sidebar?: boolean;
}

const NavList = ({ links, sidebar }: IProps) => {
  const [expandedLinks, setExpandedLinks] = useState<{
    [key: string]: boolean;
  }>({});

  const activeLink = useLocation().pathname.split("/")[2];

  const toggleLinkExpansion = (linkName: string) => {
    setExpandedLinks((prev) => ({
      ...prev,
      [linkName]: !prev[linkName],
    }));
  };

  const renderLinks = (links: ILink[], level = 0) => {
    return links.map((link, idx) => {
      const hasChildren = link.children && link.children.length > 0;
      const isExpanded = hasChildren && (expandedLinks[link.name] || false);
      const isChildLink = level > 0;

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
                className={`select-none w-full px-4 cursor-pointer py-2 text-black dark:text-white transition-all duration-300 rounded-lg border border-muted flex items-center justify-between gap-2 hover:bg-dark/10 dark:hover:bg-dark/50`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleLinkExpansion(link.name);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex-grow">{link.name}</span>
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
              <NavLink
                to={link.path || "#"}
                className={`w-full mt-2 ${
                  sidebar ? "" : "lg:w-fit lg:mt-0"
                }  py-2 px-4 mt-2 text-black dark:text-white transition-all duration-300 rounded-lg border border-muted flex items-center justify-between gap-2 ${
                  activeLink === (link.path ? link.path.split("/")[2] : "")
                    ? "bg-dark/20 dark:bg-dark"
                    : "hover:bg-dark/10 dark:hover:bg-dark/50"
                }`}
              >
                {isChildLink && <GoDot size={16} />}
                <span className="flex-grow">{link.name}</span>
              </NavLink>
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
      className={`w-full ${
        sidebar ? "mt-4" : ""
      } flex flex-col gap-2 justify-start ${sidebar ? "" : "lg:flex-row"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderLinks(links)}
    </motion.ul>
  );
};

export default NavList;
