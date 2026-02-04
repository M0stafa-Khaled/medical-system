import { motion } from "framer-motion";
import { TRole } from "@/types";
import ChangePassword from "./ChangePassword";
import UpdateDoctorProfile from "./UpdateDoctorProfile";
import UpdatePatientProfile from "./UpdatePatientProfile";
interface IProps {
  image: string;
  name: string;
  role: TRole;
  firstPhone: string;
}

const ProfileHeader = ({ image, name, role, firstPhone }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-[#fff] dark:bg-dark rounded-2xl overflow-hidden shadow-md"
    >
      {/* Cover */}
      <div className="w-full h-40 md:h-56 text-black bg-linear-to-tr from-[#9FD8EC] to-[#019DCB] dark:from-[#487687] dark:to-[#025B75]" />
      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="relative h-20"
      >
        <div className="w-40 h-40 absolute -top-20 right-1/2 translate-x-1/2 md:translate-x-0 md:right-10 bg-white border-[5px] border-[#fff] dark:border-dark rounded-full overflow-hidden flex justify-center items-center">
          <img
            src={image || "/images/avatar.svg"}
            alt="logo"
            className="object-cover"
          />
        </div>
      </motion.div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-x-8 gap-y-2 mt-2 md:pr-16 pb-4">
        {/* Name & Role */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-2 min-w-[150px]"
        >
          <div className="space-y-1">
            <h1 className="text-center md:text-start text-xl font-semibold">
              {name}
            </h1>
            <p className="text-sm text-muted-foreground text-center md:text-start">
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
        <div className="flex flex-col md:flex-row gap-x-3 gap-y-2">
          {role === "doctor" && <UpdateDoctorProfile />}
          {role === "patient" && <UpdatePatientProfile />}
          <ChangePassword />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
