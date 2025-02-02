import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { Button, useDisclosure } from "@chakra-ui/react";
import Modal from "../shared/Modal";
import { useDispatch } from "react-redux";
import { logout } from "../../app/features/auth/authSlice";

interface IProps {
  links: {
    name: string;
    path: string;
  }[];
}

const Sidebar = ({ links }: IProps) => {
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const activeLink = useLocation().pathname.split("/")[2];

  const logoutFromDashboard = () => {
    dispatch(logout());
    onClose();
    navigate("/login");
  };

  return (
    <aside className="hidden lg:block h-full overflow-hidden bg-foreground border-l border-muted">
      <div className="h-full min-w-[300px] overflow-y-auto custom-scrollbar pb-6 px-4 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex justify-center items-center">
            <img
              src={"/logo.svg"}
              alt="logo"
              className="max-w-40 flex justify-center items-center"
            />
          </div>
          {/* Toggle Mode */}
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
          {/* Links */}
          <nav>
            <ul className="w-full">
              {links.map((link, idx) => {
                return (
                  <li key={idx} className="w-full">
                    <NavLink
                      to={link.path}
                      className={`block mt-4 w-full text-center py-3 text-black dark:text-white transition-all duration-300 rounded-lg border border-muted ${
                        activeLink === link.path.split("/")[2]
                          ? "bg-[#B9B9B9] dark:bg-[#322C3A]"
                          : "bg-white dark:bg-[#646464]/10"
                      }`}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          {/* Logout */}
        </div>
        <div className="flex justify-center items-center">
          <Button
            onClick={onOpen}
            variant={"outline"}
            className="py-6 flex items-center justify-center gap-2 border !border-danger w-full !text-danger rounded-lg hover:!text-white hover:!bg-danger !text-xs lg:!text-base"
          >
            تسجيل الخروج
            <FiLogOut size={24} />
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        title="تسجيل الخروج"
        description="هل انت متأكد من تسجيل الخروج؟"
      >
        <Button onClick={onClose} className="!bg-primary !text-white !text-sm">
          إلغاء
        </Button>
        <Button
          onClick={logoutFromDashboard}
          className="!bg-danger !text-white !text-sm"
          mr={3}
        >
          تسجيل الخروج
        </Button>
      </Modal>
    </aside>
  );
};

export default Sidebar;
