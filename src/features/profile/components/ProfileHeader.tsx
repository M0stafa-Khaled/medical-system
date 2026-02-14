import { motion } from "framer-motion";
import { type TRole } from "@/shared/types";
import { ChangePassword } from "./ChangePassword";
import { UpdateDoctorProfile } from "./UpdateDoctorProfile";
import { UpdatePatientProfile } from "./UpdatePatientProfile";
interface IProps {
  image: string;
  name: string;
  role: TRole;
  firstPhone: string;
}

export const ProfileHeader = ({ image, name, role, firstPhone }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="dark:bg-dark overflow-hidden rounded-2xl bg-white shadow-md"
    >
      {/* Cover */}
      <div className="h-40 w-full bg-linear-to-tr from-[#9FD8EC] to-[#019DCB] text-black md:h-56 dark:from-[#487687] dark:to-[#025B75]" />
      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="relative h-20"
      >
        <div className="dark:border-dark absolute -top-20 right-1/2 flex h-40 w-40 translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-white md:right-10 md:translate-x-0">
          <img
            src={image || "/images/avatar.svg"}
            alt="logo"
            className="object-cover"
          />
        </div>
      </motion.div>
      <div className="mt-2 flex flex-col items-center gap-x-8 gap-y-2 pb-4 md:flex-row md:items-start md:pr-16">
        {/* Name & Role */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="min-w-37.5 space-y-2"
        >
          <div className="space-y-1">
            <h1 className="text-center text-xl font-semibold md:text-start">
              {name}
            </h1>
            <p className="text-muted-foreground text-center text-sm md:text-start">
              {role === "employee"
                ? "موظف"
                : role === "admin"
                  ? "مسؤول"
                  : role === "doctor"
                    ? "طبيب"
                    : "مستخدم"}
            </p>
          </div>
          <p className="text-center md:text-start">{firstPhone}</p>
        </motion.div>
        <div className="flex flex-col gap-x-3 gap-y-2 md:flex-row">
          {role === "doctor" && <UpdateDoctorProfile />}
          {role === "patient" && <UpdatePatientProfile />}
          <ChangePassword />
        </div>
      </div>
    </motion.div>
  );
};
