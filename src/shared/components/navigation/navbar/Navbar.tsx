import { useState } from "react";
import { Link } from "react-router";
import { IoClose, IoMenu } from "react-icons/io5";

import { ILink } from "@/shared/types";
import cookieServices from "@/shared/utils/cookieServices";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { LogoutButton } from "@/features/auth";
import NavList from "./NavList";
import { NotificationsMenu } from "@/features/notifications";
import { ProfileMenu } from "@/features/profile";
import ToggleTheme from "@/shared/components/ToggleTheme";
import { Separator } from "@/shared/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/shared/components/ui/sheet";

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full lg:hidden ${!dashboard && "lg:block!"}`}
    >
      <div className="backdrop-blur-xl">
        <nav className="border-border mx-auto flex flex-wrap items-center justify-between border-b py-2">
          <Sheet open={openNav} onOpenChange={setOpenNav}>
            <div
              className={`container flex w-full items-center justify-between px-4 ${!dashboard && "max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24"}`}
            >
              <div className="hidden w-full items-center gap-3 lg:flex">
                <NavList links={links} />
              </div>
              <SheetTrigger asChild>
                <button
                  type="button"
                  name="menu-button"
                  className="flex cursor-pointer items-center justify-center lg:hidden"
                >
                  {openNav ? <IoClose size={36} /> : <IoMenu size={36} />}
                </button>
              </SheetTrigger>
              <div className="flex items-center justify-center gap-3 p-1">
                <div className="flex items-center justify-center gap-2">
                  <LogoutButton />
                  {role !== "doctor" && canReceiveNotifications && (
                    <NotificationsMenu />
                  )}
                  <ProfileMenu />
                  <ToggleTheme />
                </div>
                <Link to="/" className="flex w-8">
                  <img
                    src="/images/logo.svg"
                    alt="logo"
                    className="h-full w-full cursor-pointer"
                  />
                </Link>
              </div>
            </div>

            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-75 p-0 sm:max-w-75 lg:hidden"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between gap-2 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <img src="/images/logo.svg" alt="logo" className="w-9" />
                    <SheetHeader className="p-0">
                      <SheetTitle className="text-lg font-semibold">
                        {import.meta.env.VITE_WEB_NAME}
                      </SheetTitle>
                      <SheetDescription className="text-muted-foreground text-sm">
                        لوحة التحكم
                      </SheetDescription>
                    </SheetHeader>
                  </div>
                  <SheetClose asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="bg-background ring-offset-background text-foreground hover:bg-accent focus:ring-ring inline-flex size-9 items-center justify-center rounded-md border shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
                    >
                      <IoClose size={18} />
                    </button>
                  </SheetClose>
                </div>
                <Separator />

                <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto py-2">
                  <NavList links={links} setOpenNav={setOpenNav} sidebar />
                </div>

                <Separator />
                <div className="p-2">
                  <LogoutButton
                    icon={false}
                    className="btn-destructive w-full rounded-sm py-3.5"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
