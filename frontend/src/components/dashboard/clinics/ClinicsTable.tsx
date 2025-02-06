import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllClinics } from "@/lib/react-query/clinics";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "@/app/features/auth/authSlice";
import { useEffect, useState } from "react";
import SkeletonClinicsList from "./SkeletonClinicsList";
import { IClinic } from "@/interfaces";
import SearchClinic from "../SearchInput";
import AddClinicModalButton from "./AddClinicModalButton";
import searchClinic from "@/utils/searchClinic";
import ClinicsList from "./ClinicsList";

const ClinicsTable = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IClinic[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: clinics, isLoading, failureReason } = useGetAllClinics();
  const failureReasonObj = failureReason as unknown as {
    status: number;
  };

  useEffect(() => {
    if (failureReasonObj?.status === 401) {
      dispatch(logout());
      navigate("/login");
      toast.warn(" تم تسجيل الخروج يرجى تسجيل الدخول مرة اخرى");
    }
    search(clinics?.data ?? [], searchKeyword);
  }, [failureReasonObj, dispatch, navigate, searchKeyword, clinics?.data]);

  const search = (clinics: IClinic[], name: string) => {
    if (!name) return setSearchResults(clinics);

    const results = searchClinic(clinics, name);
    setSearchResults(results);
  };

  if (isLoading) {
    return <SkeletonClinicsList length={8} />;
  }

  return (
    <>
      <div className="my-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <AddClinicModalButton />
        <SearchClinic
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          placeholder="ابحث عن عيادة"
        />
      </div>
      <Table className="border dark:border-muted !rounded-lg overflow-hidden">
        <TableCaption className="mt-0 py-4 dark:border-muted bg-white/80 dark:bg-dark/70">
          العيادات المتاحة
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-white/80 dark:bg-dark/70 dark:border-muted hover:bg-white/80 dark:hover:bg-dark/70">
            <TableHead className=" py-4 !text-sm text-center">
              اسم العيادة
            </TableHead>
            <TableHead className="text-center">الحالة</TableHead>
            <TableHead className="py-4 text-sm text-center">
              الإجراءات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ClinicsList clinics={searchResults} />
        </TableBody>
      </Table>
    </>
  );
};

export default ClinicsTable;
