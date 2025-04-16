import ProfileMenu from "../ProfileMenu";
import ToggleMode from "../ToggleMode";
import LogoutButton from "../LogoutButton";
import NavList from "../NavList";
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

interface IProps {
  links: ILink[];
}

const Sidebar = ({ links }: IProps) => {
  const name = cookieServices.getUser()?.name;
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
            src={"/logo.svg"}
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
          <motion.div variants={navItemsVariants}>
            <ProfileMenu />
          </motion.div>
          <motion.div variants={navItemsVariants}>
            <ToggleMode />
          </motion.div>
        </motion.div>
        <motion.h3
          variants={navItemsVariants}
          className="text-lg text-center font-semibold text-dark dark:text-white"
        >
          {truncateText(name!, 18)}
        </motion.h3>

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
