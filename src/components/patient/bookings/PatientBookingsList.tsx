import { containerVariants, itemVariants } from "@/shared/animations";
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
        <h2 className="text-muted-foreground my-8 text-center text-xl font-medium">
          لا يوجد حجوزات
        </h2>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3"
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
