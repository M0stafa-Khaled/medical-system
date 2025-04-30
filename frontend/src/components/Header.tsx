import { useEffect, useState, lazy } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

import {
  menuIconVariants,
  navVariants,
  sidebarVariants,
  logoVariants,
  navItemsVariants,
} from "@/animations/navbarAnimations";
import { ILink } from "@/interfaces";
import cookieServices from "@/utils/cookieServices";
import {} from "react";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

const NotificationsMenu = lazy(
  () => import("./notifications/NotificationsMenu")
);
const ProfileMenu = lazy(() => import("./profile/ProfileMenu"));
const AuthButtons = lazy(() => import("./dashboard/AuthButtons"));
const ToggleMode = lazy(() => import("./ToggleMode"));
const LogoutButton = lazy(() => import("./LogoutButton"));
const NavList = lazy(() => import("./NavList"));

interface IProps {
  links: ILink[];
  dashboard?: boolean;
}

const Header = ({ links, dashboard = false }: IProps) => {
  const [openNav, setOpenNav] = useState(false);
  const role = cookieServices.getUser()?.role;
  const canReceiveNotifications = useHasPermission(
    PERMISSIONS.RECEIVE_NOTIFICATIONS
  );
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
      } pt-1 fixed w-full inset-x-0 top-1  z-50`}
    >
      <div className="xl:container">
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={navItemsVariants}
          className={`flex bg-[#fff] dark:bg-foreground flex-wrap items-center justify-between py-2 border border-primary/20 dark:border-primary/30 rounded-xl`}
        >
          <div className="flex items-center justify-between w-full px-3">
            <div className={`hidden lg:flex gap-3 items-center w-full`}>
              <AuthButtons />
              <NavList links={links} />
            </div>
            <button
              type="button"
              name="menu-button"
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
              className="flex justify-center items-center gap-3 p-1"
            >
              <motion.div
                variants={navItemsVariants}
                className="flex justify-center items-center gap-2"
              >
                <motion.div variants={navItemsVariants}>
                  <LogoutButton />
                </motion.div>
                {role !== "doctor" && canReceiveNotifications && (
                  <motion.div variants={navItemsVariants}>
                    <NotificationsMenu />
                  </motion.div>
                )}

                <motion.div variants={navItemsVariants}>
                  <ProfileMenu />
                </motion.div>
                <motion.div variants={navItemsVariants}>
                  <ToggleMode />
                </motion.div>
              </motion.div>
              <motion.div variants={logoVariants} className="w-12">
                <Link to={"/"}>
                  <motion.img
                    src={"/images/logo.svg"}
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
                  <NavList links={links} setOpenNav={setOpenNav} />
                </motion.div>
                <AuthButtons />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;
