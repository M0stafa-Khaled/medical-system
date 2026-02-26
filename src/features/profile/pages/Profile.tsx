import DataLoader from "@/shared/components/ui/DataLoader";
import { IPatient } from "@/features/dashboard/patients/types";
import { format } from "date-fns";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import ImageModal from "@/shared/components/ImageModal";
import { Button } from "@/shared/components/ui/button";
import { TRole } from "@/shared/types";
import { useGetUserProfile } from "@/features/profile/queriesAndMutations";
import { IEmployee } from "@/features/dashboard/employees/types";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileInfoField } from "../components/ProfileInfoField";
import { EmployeePermissions } from "../components/EmployeePermissions";
import { DoctorClinics } from "../components/DoctorClinics";
import { IDoctor } from "@/features/dashboard/doctors/types";

const Profile = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading, isError } = useGetUserProfile();

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

  if (isLoading)
    return (
      <div className="container py-10">
        <DataLoader />
      </div>
    );

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
        : "/images/avatar.svg";

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-20 pb-10"
    >
      <div className="container max-w-7xl space-y-4">
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
          className="bg-background overflow-hidden rounded-2xl p-4 shadow-md"
        >
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2"
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
                  className="flex flex-col items-center justify-center gap-2 md:flex-row md:justify-start"
                >
                  <h5 className="text-muted-foreground font-medium text-nowrap">
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
                    <p className="text-lg font-medium text-wrap">لا يوجد</p>
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
