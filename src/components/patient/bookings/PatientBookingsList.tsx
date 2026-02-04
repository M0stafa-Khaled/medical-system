import { containerVariants, itemVariants } from "@/animations";
import { motion } from "framer-motion";
import PatientBookingCard from "./PatientBookingCard";
import { IPatientBooking } from "@/interfaces/patient/patientBookings";

interface IProps {
  bookings: IPatientBooking[];
}
const PatientBookingsList = ({ bookings }: IProps) => {
  return (
    <>
      {!bookings?.length ? (
        <h2 className="text-xl text-muted-foreground text-center font-medium my-8">
          لا يوجد حجوزات
        </h2>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mt-8"
        >
          {bookings.map((booking, idx) => (
            <motion.div variants={itemVariants} key={booking.id} custom={idx}>
              <PatientBookingCard booking={booking} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default PatientBookingsList;
