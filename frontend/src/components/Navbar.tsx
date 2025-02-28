import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "./dashboard/ProfileMenu";

import AuthButtons from "./dashboard/AuthButtons";
import ToggleMode from "./ToggleMode";
import LogoutIconButton from "./LogoutIconButton";
import NavList from "./dashboard/NavList";
import {
  menuIconVariants,
  navVariants,
  sidebarVariants,
  logoVariants,
  navItemsVariants,
} from "@/animations/navbarAnimations";

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

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className={`container ${
        dashboard && "lg:hidden"
      } pt-1 fixed w-full right-0 top-0 left-0 z-50`}
    >
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navItemsVariants}
        className={`flex bg-foreground flex-wrap items-center justify-between py-1 border border-muted rounded-xl`}
      >
        <div className="flex items-center justify-between w-full px-3">
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
          <motion.div
            variants={navItemsVariants}
            className="flex justify-center items-center gap-4 p-1"
          >
            <motion.div
              variants={navItemsVariants}
              className="flex justify-center items-center gap-3"
            >
              <motion.div variants={navItemsVariants}>
                <LogoutIconButton />
              </motion.div>
              <motion.div variants={navItemsVariants}>
                <ProfileMenu />
              </motion.div>
              <motion.div variants={navItemsVariants}>
                <ToggleMode />
              </motion.div>
            </motion.div>
            <motion.div variants={logoVariants} className="w-14">
              <Link to={"/"}>
                <motion.img
                  src={"/logo.svg"}
                  alt="logo"
                  variants={logoVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full h-full cursor-pointer"
                />
              </Link>
            </motion.div>
          </motion.div>
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
              className="w-full overflow-hidden py-3"
            >
              <motion.div
                variants={navItemsVariants}
                className="w-full mx-auto max-h-[80vh] overflow-y-scroll custom-scrollbar px-3 py-2"
              >
                <NavList links={links} />
              </motion.div>
              <AuthButtons />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
};

export default Navbar;
