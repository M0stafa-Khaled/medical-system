import { LogoutButton } from "@/features/auth";
import { ILink } from "@/shared/types";
import truncateText from "@/shared/utils/truncateText";
import { Separator } from "@/shared/components/ui/separator";
import { useNavigate } from "react-router";
import NavList from "@/shared/components/navigation/navbar/NavList";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { useAppSelector } from "@/app/store";

interface IProps {
  links: ILink[];
}

const Sidebar = ({ links }: IProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  return (
    <aside className="fixed inset-y-0 right-0 hidden h-full lg:block">
      <div className="flex h-screen max-w-87.5 min-w-67.5 flex-col">
        <div className="flex items-center gap-2 px-4 py-2">
          <img src="/images/logo.svg" alt="logo" className="w-9" />
          <div>
            <h2 className="text-lg font-semibold">
              {import.meta.env.VITE_WEB_NAME}
            </h2>
            <p className="text-muted-foreground text-sm">لوحة التحكم</p>
          </div>
        </div>
        <Separator />

        <nav className="flex-1 overflow-hidden">
          <NavList links={links} sidebar />
        </nav>
        <Separator />
        <div className="flex w-full flex-col items-center justify-center gap-2 p-2">
          <div
            onClick={() => navigate("/profile")}
            className="hover:bg-primary/15 flex w-full cursor-pointer gap-2 rounded-sm px-2 py-2 transition-colors duration-200"
          >
            <Avatar>
              <AvatarImage src="" />

              <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-center">
              <h3>{truncateText(user?.name || "", 15)}</h3>
              <p className="text-muted-foreground text-xs">
                {user?.user?.email}
              </p>
            </div>
          </div>

          <LogoutButton
            icon={false}
            className="btn-destructive w-full rounded-sm py-3.5"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
