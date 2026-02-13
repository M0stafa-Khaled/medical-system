import { m } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn, fadeIn } from "../animations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Star } from "lucide-react";
import { doctors } from "../data";
import { Link } from "react-router";

export const DoctorsPreview = () => {
  return (
    <section id="doctors" className="bg-background py-24">
      <div className="container">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-right"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              نخبة من أفضل الأطباء
            </h2>
            <p className="text-muted-foreground text-lg">
              تواصل مع أفضل الاستشاريين والمتخصصين في جميع المجالات الطبية.
            </p>
          </m.div>
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="#"
              className="text-primary group flex items-center gap-2 font-medium hover:underline"
            >
              تصفح كل الأطباء{" "}
              <span className="transition-transform group-hover:-translate-x-1">
                <ArrowLeft />
              </span>
            </Link>
          </m.div>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {doctors.map((doctor, index) => (
            <m.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="group bg-card border-border/50 relative overflow-hidden rounded-2xl border transition-all duration-200 hover:shadow-lg active:scale-95"
            >
              <div className="flex flex-col items-center p-6 text-center">
                <m.div variants={scaleIn} className="relative mb-4">
                  <Avatar className="border-background h-24 w-24 border-4 shadow-md">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      DR
                    </AvatarFallback>
                  </Avatar>
                  {doctor.available && (
                    <m.div
                      variants={fadeIn}
                      transition={{ delay: 0.5 }}
                      className="absolute right-0 bottom-0 h-4 w-4 rounded-full border-2 border-white bg-green-500 ring-2 ring-green-500/20"
                      title="متاح الآن"
                    />
                  )}
                </m.div>

                <h3 className="text-lg font-bold">{doctor.name}</h3>
                <p className="text-primary mb-3 text-sm font-medium">
                  {doctor.specialty}
                </p>

                <div className="text-muted-foreground mb-4 flex items-center justify-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-foreground font-semibold">
                    {doctor.rating}
                  </span>
                  <span>({doctor.reviews} تقييم)</span>
                </div>

                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 mt-auto w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                  احجز موعد
                </button>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};
