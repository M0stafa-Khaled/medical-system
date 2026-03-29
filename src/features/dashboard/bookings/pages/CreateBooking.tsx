import { BookingForm } from "../components/BookingForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import { createBookingSchema } from "../schema";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const CreateBooking = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | إضافة حجز</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pb-10"
      >
        <Card className="border-muted mt-5">
          <div className="space-y-1.5 p-6">
            <h1 className="leading-relaxed font-semibold">إضافة حجز جديد</h1>
          </div>
          <CardContent>
            <BookingForm
              action={"create"}
              bookingSchema={createBookingSchema}
            />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default CreateBooking;
