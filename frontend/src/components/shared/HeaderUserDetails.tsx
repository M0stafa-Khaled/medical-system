import ImageModal from "./ImageModal";
import { ReactNode } from "react";

interface IProps {
  image?: string;
  name: string;
  role: string;
  actionButtons: ReactNode;
}
const HeaderUserDetails = ({ image, name, role, actionButtons }: IProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-x-6 gap-y-3 pb-2">
      <div className="w-36 h-36 overflow-hidden">
        {image ? (
          <ImageModal src={image} alt={name} className="!rounded-full" />
        ) : (
          <img
            src={"/images/avatar.svg"}
            alt={name}
            className="w-full h-full rounded-full object-contain border border-muted"
          />
        )}
      </div>
      <div className="space-y-1">
        <div>
          <h3 className="text-center sm:text-start flex items-center justify-center sm:justify-start gap-2 leading-relaxed">
            {name}
          </h3>
          <p className="capitalize text-muted-foreground text-center text-xs leading-relaxed sm:text-start">
            {role === "employee"
              ? "موظف"
              : role === "admin"
              ? "مسؤول"
              : role === "doctor"
              ? "دكتور"
              : "مريض"}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-3 my-2">
            {actionButtons}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderUserDetails;
