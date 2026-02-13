import { useEffect, useState } from "react";
import { Link } from "react-router";
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
import { AuthButtons, LogoutButton } from "@/features/auth";
import NavList from "./NavList";
import NotificationsMenu from "@/components/notifications/NotificationsMenu";
import { ProfileMenu } from "@/features/profile";
import ToggleTheme from "../ToggleTheme";

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
      className={`z-50 container ${
        dashboard && "lg:hidden"
      } fixed inset-x-0 top-1 w-full pt-1`}
    >
      <div className="">
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={navItemsVariants}
          className={`bg-background border-border flex flex-wrap items-center justify-between rounded-xl border py-2`}
        >
          <div className="flex w-full items-center justify-between px-3">
            <div className={`hidden w-full items-center gap-3 lg:flex`}>
              <AuthButtons />
              <NavList links={links} />
            </div>
            <button
              type="button"
              name="menu-button"
              className="flex items-center justify-center lg:hidden"
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
                    <IoClose size={36} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu-icon"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={menuIconVariants}
                  >
                    <IoMenu size={36} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            {/* Toggle Mode */}
            <motion.div
              variants={navItemsVariants}
              className="flex items-center justify-center gap-3 p-1"
            >
              <motion.div
                variants={navItemsVariants}
                className="flex items-center justify-center gap-2"
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
                  <ToggleTheme />
                </motion.div>
              </motion.div>
              <motion.div variants={logoVariants} className="w-8">
                <Link to={"/"}>
                  <motion.img
                    src={"/images/logo.svg"}
                    alt="logo"
                    variants={logoVariants}
                    initial="hidden"
                    animate="visible"
                    className="h-full w-full cursor-pointer"
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
                  className="custom-scrollbar mx-auto max-h-[80vh] w-full overflow-y-scroll px-3 py-2"
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
