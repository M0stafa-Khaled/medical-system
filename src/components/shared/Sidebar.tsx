import { ProfileMenu } from "@/features/profile";
import { LogoutButton } from "@/features/auth";
import NavList from "./navbar/NavList";
import { motion } from "framer-motion";
import {
  logoVariants,
  navItemsVariants,
  sidebarVariants,
} from "@/animations/navbarAnimations";
import { ILink } from "@/interfaces";
import cookieServices from "@/utils/cookieServices";
import truncateText from "@/utils/truncateText";
import NotificationsMenu from "../notifications/NotificationsMenu";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import ToggleTheme from "./ToggleTheme";

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
      className="fixed inset-y-0 right-0 hidden h-full lg:block"
    >
      <div className="flex h-screen max-w-87.5 min-w-67.5 flex-col gap-y-3 px-4">
        {/* Fixed section - Logo */}
        <motion.div
          variants={logoVariants}
          className="flex items-center justify-center p-3"
        >
          <motion.img
            src={"/images/logo.svg"}
            alt="logo"
            initial="hidden"
            animate="visible"
            variants={logoVariants}
            className="flex w-full max-w-10 items-center justify-center"
          />
        </motion.div>

        {/* Profile Menu & Toggle Mode */}
        <motion.div
          variants={navItemsVariants}
          className="flex items-center justify-center gap-4"
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
            <ToggleTheme />
          </motion.div>
        </motion.div>
        {(user?.role === "admin" || user?.role === "employee") && (
          <motion.h3
            variants={navItemsVariants}
            className="text-dark text-center text-lg font-semibold dark:text-white"
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

export default Sidebar;
