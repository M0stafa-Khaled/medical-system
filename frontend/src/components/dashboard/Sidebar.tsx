import ProfileMenu from "./ProfileMenu";
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

interface IProps {
  links: ILink[];
}

const Sidebar = ({ links }: IProps) => {
  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="hidden lg:block h-full bg-foreground border-l border-muted"
    >
      <div className="min-w-[270px] max-w-[350px] h-screen px-4 flex flex-col">
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

        {/* Fixed section - Profile Menu & Toggle Mode */}
        <motion.div
          variants={navItemsVariants}
          className="flex justify-center items-center gap-4 mb-4"
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
