import DoctorClinics from "@/components/profile/DoctorClinics";
import EmployeePermissions from "@/components/profile/EmployeePermissions";
import ProfileInfoField from "@/components/profile/ProfileInfoField";
import DataLoader from "@/components/ui/DataLoader";
import { IDoctor } from "@/interfaces/dashboard/doctors/doctor";
import { IEmployee } from "@/interfaces/dashboard/employee";
import { IPatient } from "@/interfaces/dashboard/patient";
import { useGetUserProfile } from "@/lib/react-query/profile/profile";
import cookieServices from "@/utils/cookieServices";
import { format } from "date-fns";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import ImageModal from "@/components/shared/ImageModal";
import { Button } from "@/components/ui/button";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { TRole } from "@/types";

const Profile = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken();
  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserProfile(token as string);

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الملف الشخصى");
      navigate("/dashboard/employees");
      return;
    }

    if (!userData?.status && userData?.message) {
      toast.error(userData?.message);
      navigate("/dashboard/employees");
      return;
    }
  }, [userData, isError, navigate]);

  if (isLoading) return <DataLoader />;

  // Extract common properties from user data
  const {
    name,
    first_phone,
    second_phone,
    personal_id,
    gender,
    created_at,
    user,
  } = userData?.data || {};

  let patientData: Partial<IPatient> = {};
  let doctorData: Partial<IDoctor> = {};
  let employeeData: Partial<IEmployee> = {};

  if (user?.role === "patient") {
    const { another_name } = (userData?.data as IPatient) || {};

    patientData = {
      another_name,
    };
  } else if (user?.role === "doctor") {
    const { commission, signature, register_id, clinics, image } =
      (userData?.data as IDoctor) || {};
    doctorData = { commission, signature, register_id, clinics, image };
  } else {
    const { job, salary, permissions, treasury, image } =
      (userData?.data as IEmployee) || {};
    employeeData = { job, salary, permissions, treasury, image };
  }

  const image =
    user?.role === "admin" || user?.role === "employee"
      ? employeeData.image
      : user?.role === "doctor"
      ? doctorData.image
      : "/avatar.svg";

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-[#e8f2fc] dark:bg-background text-white pt-20 pb-10 min-h-screen"
    >
      <div className="container text-black dark:text-white max-w-7xl space-y-4">
        {/* Header */}
        <ProfileHeader
          name={name!}
          role={user?.role as TRole}
          firstPhone={first_phone!}
          image={image!}
        />
        {/* information */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-[#fff] dark:bg-dark rounded-2xl overflow-hidden shadow-md p-4"
        >
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Patient Info */}
            {user?.role === "patient" && (
              <ProfileInfoField
                label="اسم احد الاقارب"
                value={patientData.another_name!}
              />
            )}

            {/* Global Info */}

            <ProfileInfoField label="رقم الهاتف الثاني" value={second_phone!} />
            <ProfileInfoField
              label="البريد الإلكتروني"
              value={user?.email as string}
              sm
            />
            <ProfileInfoField label="رقم الهوية" value={personal_id!} />
            <ProfileInfoField
              label="الجنس"
              value={
                gender === "Male" ? "ذكر" : gender === "Female" ? "انثى" : ""
              }
            />

            {/* Employee Info */}
            {(user?.role === "admin" || user?.role === "employee") && (
              <>
                <ProfileInfoField label="الوظيفة" value={employeeData.job!} />
                <ProfileInfoField label="الراتب" value={employeeData.salary!} />
                <ProfileInfoField
                  label="الخزينة"
                  value={employeeData.treasury?.name as string}
                />
              </>
            )}

            {/* Doctor Info */}
            {user?.role === "doctor" && (
              <>
                <ProfileInfoField
                  label="رقم القيد"
                  value={doctorData.register_id!}
                />
                <ProfileInfoField
                  label="العمولة"
                  value={doctorData.commission!}
                />
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2"
                >
                  <h5 className="text-muted-foreground text-nowrap font-medium">
                    التوقيع:
                  </h5>
                  {doctorData.signature ? (
                    <ImageModal
                      src={doctorData.signature}
                      alt="Signature"
                      showThumbnail={false}
                      trigger={<Button>عرض الصورة</Button>}
                    />
                  ) : (
                    <p className="font-medium text-wrap text-lg">لا يوجد</p>
                  )}
                </motion.div>
              </>
            )}

            <ProfileInfoField
              label="تاريخ التسجيل"
              value={format(created_at!, "dd / MM / yyyy")}
            />
          </motion.div>
        </motion.div>
        {/* Employee Permissions */}
        {user?.role === "employee" && (
          <EmployeePermissions permissions={employeeData.permissions || []} />
        )}
        {/* Doctor Clinics */}
        {user?.role === "doctor" && (
          <DoctorClinics clinics={doctorData?.clinics || []} />
        )}
      </div>
    </motion.section>
  );
};

export default Profile;
