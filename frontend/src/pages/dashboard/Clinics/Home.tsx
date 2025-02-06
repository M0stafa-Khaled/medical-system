import ClinicsList from "@/components/dashboard/clinics/ClinicsList";
import AddClinicModalButton from "@/components/dashboard/clinics/AddClinicModalButton";

const Home = () => {
  return (
    <>
      <div className="mt-6">
        <AddClinicModalButton />
        <ClinicsList />
      </div>
    </>
  );
};

export default Home;
