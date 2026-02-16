import { Helmet } from "react-helmet-async";
import { EmployeesTable } from "../components/EmployeesTable";
import { motion } from "framer-motion";
import EmployeesHeader from "../components/EmployeesHeader";

const Employees = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | الموظفين</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <EmployeesHeader />
        <EmployeesTable />
      </motion.section>
    </>
  );
};

export default Employees;
