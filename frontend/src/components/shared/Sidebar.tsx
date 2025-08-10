import ProfileMenu from "../profile/ProfileMenu";
import LogoutButton from "./LogoutButton";
import NavList from "./navbar/NavList";
import { motion } from "framer-motion";
import {
  logoVariants,
  navItemsVariants,
  sidebarVariants,
} from "@/animations/navbarAnimations";
import { memo } from "react";
import { ILink } from "@/interfaces";
import cookieServices from "@/utils/cookieServices";
import truncateText from "@/utils/truncateText";
import NotificationsMenu from "../notifications/NotificationsMenu";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import ToggleMode from "./ToggleMode";

interface IProps {
  links: ILink[];
}

const Sidebar = ({ links }: IProps) => {
  const user = cookieServices.getUser();
  const canReceiveNotifications = useHasPermission(
    PERMISSIONS.RECEIVE_NOTIFICATIONS
  );
  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="hidden lg:block h-full bg-foreground fixed inset-y-0 right-0"
    >
      <div className="min-w-[270px] max-w-[350px] h-screen px-4 flex flex-col gap-y-3">
        {/* Fixed section - Logo */}
        <motion.div
          variants={logoVariants}
          className="flex justify-center items-center p-3"
        >
          <motion.img
            src={"/images/logo.svg"}
            alt="logo"
            initial="hidden"
            animate="visible"
            variants={logoVariants}
            className="max-w-24 flex justify-center items-center"
          />
        </motion.div>

        {/* Profile Menu & Toggle Mode */}
        <motion.div
          variants={navItemsVariants}
          className="flex justify-center items-center gap-4"
        >
          <motion.div variants={navItemsVariants}>
            <LogoutButton />
          </motion.div>

          {user?.role !== "doctor" && canReceiveNotifications && (
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
        {(user?.role === "admin" || user?.role === "employee") && (
          <motion.h3
            variants={navItemsVariants}
            className="text-lg text-center font-semibold text-dark dark:text-white"
          >
            {truncateText(user?.name || "", 15)}
          </motion.h3>
        )}

        {/* Scrollable section - Links */}
        <motion.nav
          variants={navItemsVariants}
          className="flex-1 overflow-hidden"
        >
          <NavList links={links} sidebar />
        </motion.nav>
      </div>
    </motion.aside>
  );
};

export default memo(Sidebar);
