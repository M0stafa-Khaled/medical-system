import { Button } from "@chakra-ui/react";
import ClinicList from "../../../components/dashboard/clinics/ClinicsList";
import { FiPlus } from "react-icons/fi";

const Home = () => {
  return (
    <div className="mt-6">
      <div className="mb-8">
        <Button
          size={"sm"}
          variant={"outline"}
          className="gap-2 !text-primary hover:!bg-primary hover:!text-white !border-primary py-6 !rounded-lg !text-xs lg:!text-sm"
        >
          إضافة عيادة جديدة
          <FiPlus size={20} />
        </Button>
      </div>
      <ClinicList />
    </div>
  );
};

export default Home;
