import { ProfileMenu } from "@/features/profile";
import { LogoutButton } from "@/features/auth";
import { motion } from "framer-motion";
import {
  logoVariants,
  navItemsVariants,
  sidebarVariants,
} from "@/shared/animations/navbarAnimations";
import { ILink } from "@/shared/types";
import cookieServices from "@/shared/utils/cookieServices";
import truncateText from "@/shared/utils/truncateText";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { NotificationsMenu } from "@/features/notifications";
import { Separator } from "@/shared/components/ui/separator";
import { useNavigate } from "react-router";
import ToggleTheme from "@/shared/components/ToggleTheme";
import NavList from "@/features/dashboard/components/navbar/NavList";

interface IProps {
  links: ILink[];
}

const Sidebar = ({ links }: IProps) => {
  const user = cookieServices.getUser();
  const canReceiveNotifications = useHasPermission(
    PERMISSIONS.RECEIVE_NOTIFICATIONS
  );

  const navigate = useNavigate();
  console.log(user);
  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="fixed inset-y-0 right-0 hidden h-full lg:block"
    >
      <div className="flex h-screen max-w-87.5 min-w-67.5 flex-col">
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

        {/* Buttons*/}
        <motion.div
          variants={navItemsVariants}
          className="flex items-center justify-center gap-4 pt-2 pb-4"
        >
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
        <Separator className="pb-0" />

        {/* Scrollable section - Links */}
        <motion.nav
          variants={navItemsVariants}
          className="flex-1 overflow-hidden"
        >
          <NavList links={links} sidebar />
        </motion.nav>
        <Separator />
        <div className="flex w-full flex-col items-center justify-center gap-2 p-2">
          <div
            onClick={() => navigate("/profile")}
            className="hover:bg-primary/15 flex w-full cursor-pointer flex-col justify-center rounded-sm px-4 py-2 transition-colors duration-200"
          >
            <h3>{truncateText(user?.name || "", 15)}</h3>
            <p className="text-muted-foreground text-xs"> {"test@gmail.com"}</p>
          </div>

          <LogoutButton
            icon={false}
            className="btn-destructive w-full rounded-md py-3.5"
          />
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
