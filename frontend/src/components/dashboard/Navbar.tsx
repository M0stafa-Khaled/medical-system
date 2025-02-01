import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { Button, useDisclosure } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import Modal from "../shared/Modal";

interface IProps {
  links: {
    name: string;
    path: string;
  }[];
}

const Navbar = ({ links }: IProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { theme, setTheme } = useTheme();
  const activeLink = useLocation().pathname.split("/")[2];

  const [openNav, setOpenNav] = useState(false);

  const navVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const menuIconVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <header className="container pt-1 fixed w-full right-0 top-0 left-0 z-50">
      <nav className="flex lg:hidden container bg-foreground flex-wrap items-center justify-between px-3 py-1 border border-muted rounded-2xl">
        <div className="flex items-center justify-between w-full">
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
          <div className="flex justify-center items-center gap-4">
            <div className="flex justify-center">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="bg-[#1D1B20]/40 px-3 py-2 rounded-md hover:bg-[#1D1B20]/50 dark:hover:bg-[#1D1B20]/90 transition-all duration-300"
              >
                {theme === "dark" ? (
                  <IoIosSunny size={24} className="text-amber-400" />
                ) : (
                  <IoIosMoon size={24} className="text-black" />
                )}
              </button>
            </div>
            <Link
              to={links[0].path}
              className="text-white cursor-pointer font-medium text-2xl"
            >
              <img src={"/logo.svg"} alt="logo" className="w-full h-12" />
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
              className="w-full overflow-hidden py-2"
            >
              <div className="mx-auto">
                <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                  {links.map((link) => (
                    <li
                      key={link.name}
                      className="rounded-lg hover:bg-dark-blue lg:hover:bg-transparent transition-all duration-300 ease-in-out"
                    >
                      <NavLink
                        to={link.path}
                        className={`block w-full text-center py-3 text-black dark:text-white transition-all duration-300 rounded-lg border border-muted ${
                          activeLink === link.path.split("/")[2]
                            ? "bg-[#B9B9B9] dark:bg-[#322C3A]"
                            : "bg-white dark:bg-[#646464]"
                        }`}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={onOpen}
                  variant={"outline"}
                  className="py-6 flex items-center justify-center gap-2 border !border-danger w-full text-xl !text-danger rounded-lg hover:!text-white hover:!bg-danger"
                >
                  تسجيل الخروج
                  <FiLogOut size={24} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        title="تسجيل الخروج"
        description="هل انت متأكد من تسجيل الخروج؟"
      >
        <Button onClick={onClose} className="!bg-primary !text-white">
          إلغاء
        </Button>
        <Button className="!bg-danger !text-white" mr={3}>
          تسجيل الخروج
        </Button>
      </Modal>
    </header>
  );
};

export default Navbar;
