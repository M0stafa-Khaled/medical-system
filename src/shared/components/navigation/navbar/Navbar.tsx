import { useEffect, useState } from "react";
import { Link } from "react-router";
import { IoClose, IoMenu } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

import {
  menuIconVariants,
  navVariants,
} from "@/shared/animations/navbarAnimations";
import { ILink } from "@/shared/types";
import cookieServices from "@/shared/utils/cookieServices";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { LogoutButton } from "@/features/auth";
import NavList from "./NavList";
import { NotificationsMenu } from "@/features/notifications";
import { ProfileMenu } from "@/features/profile";
import ToggleTheme from "@/shared/components/ToggleTheme";

interface IProps {
  links: ILink[];
  dashboard?: boolean;
}

const Navbar = ({ links, dashboard = false }: IProps) => {
  const [openNav, setOpenNav] = useState(false);
  const role = cookieServices.getUser()?.role;
  const canReceiveNotifications = useHasPermission(
    PERMISSIONS.RECEIVE_NOTIFICATIONS
  );
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full lg:hidden ${!dashboard && "lg:block!"}`}
    >
      <div className="backdrop-blur-xl">
        <nav
          className={`border-border mx-auto flex flex-wrap items-center justify-between border-b py-2`}
        >
          <div
            className={`container flex w-full items-center justify-between px-4 ${!dashboard && "max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24"}`}
          >
            <div className={`hidden w-full items-center gap-3 lg:flex`}>
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
                    className="cursor-pointer"
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
                    className="cursor-pointer"
                  >
                    <IoMenu size={36} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            {/* Toggle Mode */}
            <div className="flex items-center justify-center gap-3 p-1">
              <div className="flex items-center justify-center gap-2">
                <LogoutButton />
                {role !== "doctor" && canReceiveNotifications && (
                  <NotificationsMenu />
                )}

                <ProfileMenu />
                <ToggleTheme />
              </div>
              <Link to={"/"} className="flex w-8">
                <img
                  src={"/images/logo.svg"}
                  alt="logo"
                  className="h-full w-full cursor-pointer"
                />
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
                <div className="custom-scrollbar container mx-auto max-h-[80vh] w-full overflow-y-scroll py-2">
                  <NavList links={links} setOpenNav={setOpenNav} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
