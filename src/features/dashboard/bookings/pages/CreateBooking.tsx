import { BookingForm } from "../components/BookingForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import { createBookingSchema } from "../schema";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/shared/components/ui/button";
import { LucideArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const CreateBooking = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | إضافة حجز</title>
      </Helmet>
      <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
        <LucideArrowRight className="h-4 w-4" />
        رجوع
      </Button>
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
