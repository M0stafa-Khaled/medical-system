import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "./dashboard/ProfileMenu";
import NavList from "./NavList";

import AuthButtons from "./dashboard/AuthButtons";
import ToggleMode from "./ToggleMode";
import LogoutIconButton from "./LogoutIconButton";

interface IProps {
  links: {
    name: string;
    path: string;
  }[];
  dashboard?: boolean;
}

const Navbar = ({ links, dashboard = false }: IProps) => {
  const [openNav, setOpenNav] = useState(false);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const menuIconVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <header
      className={`container ${
        dashboard ? "lg:hidden" : ""
      } pt-1 fixed w-full right-0 top-0 left-0 z-50`}
    >
      <nav
        className={`flex  container bg-foreground flex-wrap items-center justify-between px-3 py-1 border border-muted rounded-2xl`}
      >
        <div className="flex items-center justify-between w-full">
          <div className={`hidden lg:flex gap-3 items-center w-full`}>
            <AuthButtons />
            <NavList links={links} />
          </div>
          <button
            className="flex justify-center items-center lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            <AnimatePresence mode="wait">
              {openNav ? (
                <motion.span
                  key="close-icon"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuIconVariants}
                >
                  <IoClose size={36} className="text-black dark:text-white" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu-icon"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuIconVariants}
                >
                  <IoMenu size={36} className="text-black dark:text-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          {/* Toggle Mode */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex justify-center items-center gap-3">
              <LogoutIconButton />
              <ProfileMenu />
              <ToggleMode />
            </div>
            <Link
              to={links[0].path}
              className="text-white cursor-pointer font-medium text-2xl w-14"
            >
              <img src={"/logo.svg"} alt="logo" className="w-full h-full" />
            </Link>
          </div>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {openNav && (
            <motion.div
              key="mobile-nav"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navVariants}
              className="w-full overflow-hidden"
            >
              <div className="w-full mx-auto">
                <NavList links={links} />
              </div>
              <AuthButtons />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
