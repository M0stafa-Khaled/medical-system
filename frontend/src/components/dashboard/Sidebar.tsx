import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";
import ProfileMenu from "./ProfileMenu";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from "react";
import ToggleMode from "../ToggleMode";
import { useDispatch } from "react-redux";
import { logout } from "@/app/features/auth/authSlice";
import LogoutIconButton from "../LogoutIconButton";

interface IProps {
  links: {
    name: string;
    path: string;
  }[];
}

const Sidebar = ({ links }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState<boolean>(false);
  const activeLink = useLocation().pathname.split("/")[2];

  const logoutFromDashboard = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="hidden lg:block h-full overflow-hidden bg-foreground border-l border-muted">
      <div className="h-full min-w-[270px] max-w-[350px] overflow-y-auto custom-scrollbar pb-3 px-4 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex justify-center items-center">
            <img
              src={"/logo.svg"}
              alt="logo"
              className="max-w-24 flex justify-center items-center"
            />
          </div>
          {/* Profile Menu & Toggle Mode */}
          <div className="flex justify-center items-center gap-4">
            <LogoutIconButton />
            <ProfileMenu />
            <ToggleMode />
          </div>
          {/* Links */}
          <nav>
            <ul className="w-full mt-4">
              {links.map((link, idx) => {
                return (
                  <li key={idx} className="w-full">
                    <NavLink
                      to={link.path}
                      className={`block mt-2 w-full text-center py-3 text-black dark:text-white transition-all duration-300 rounded-lg border border-muted ${
                        activeLink === link.path.split("/")[2]
                          ? "bg-dark/20 dark:bg-dark"
                          : "hover:bg-dark/10 dark:hover:bg-dark/50"
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
        <div className="flex flex-col justify-center items-center gap-2">
          {/* <Button
            onClick={() => setIsOpenLogoutModal(true)}
            variant={"destructive"}
            className="h-auto py-3 items-center justify-center gap-2 w-full !text-base !font-normal"
          >
            تسجيل الخروج
            <FiLogOut size={20} />
          </Button> */}
        </div>
      </div>

      <AlertDialog
        open={isOpenLogoutModal}
        onOpenChange={() => setIsOpenLogoutModal((prev) => !prev)}
      >
        <AlertDialogContent className="border-muted">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black dark:text-white text-start">
              تسجيل الخروج
            </AlertDialogTitle>
            <AlertDialogDescription className="text-start !my-3">
              هل انت متاكد من{" "}
              <span className="font-medium text-black dark:text-white">
                تسجيل الخروج
              </span>
              ؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="text-start !justify-start gap-2">
            <AlertDialogCancel className="bg-primary hover:bg-primary/90 hover:text-white text-white dark:text-black">
              إلغاء
            </AlertDialogCancel>
            <Button onClick={logoutFromDashboard} variant={"destructive"}>
              تسجيل الخروج
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  );
};

export default Sidebar;
