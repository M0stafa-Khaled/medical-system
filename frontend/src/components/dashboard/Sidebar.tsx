import ProfileMenu from "./ProfileMenu";
import ToggleMode from "../ToggleMode";
import LogoutIconButton from "../LogoutIconButton";
import NavList, { ILink } from "./NavList";
import { motion } from "framer-motion";
import {
  logoVariants,
  navItemsVariants,
  sidebarVariants,
} from "@/animations/navbarAnimatons";

interface IProps {
  links: ILink[];
}

const Sidebar = ({ links }: IProps) => {
  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="hidden lg:block h-full overflow-hidden bg-foreground border-l border-muted"
    >
      <div className="h-full min-w-[270px] max-w-[350px] overflow-y-auto custom-scrollbar pb-3 px-4 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            className="flex justify-center items-center"
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
              <LogoutIconButton />
            </motion.div>
            <motion.div variants={navItemsVariants}>
              <ProfileMenu />
            </motion.div>
            <motion.div variants={navItemsVariants}>
              <ToggleMode />
            </motion.div>
          </motion.div>

          {/* Links */}
          <motion.nav variants={navItemsVariants}>
            <NavList links={links} sidebar />
          </motion.nav>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
