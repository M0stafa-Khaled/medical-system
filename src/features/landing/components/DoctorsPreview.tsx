import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn, fadeIn } from "../animations";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { ShieldAlert, Star } from "lucide-react";

interface IDoctor {
  id: string;
  name: string;
  image: string;
}

interface IApiRes {
  data?: IDoctor[];
}

export const DoctorsPreview = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchDoctors = async () => {
      setIsLoading(true);
      setIsError(false);

      const company = import.meta.env.VITE_SLUG;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/public/${company}/active-doctors`
        );
        if (!response.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }

        const payload = (await response.json()) as IApiRes;

        if (!isMounted) return;

        setDoctors(payload?.data || []);
        setIsLoading(false);
        return;
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }

      if (!isMounted) return;
      setDoctors([]);
      setIsLoading(false);
      setIsError(true);
    };

    fetchDoctors();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="doctors" className="bg-background py-24">
      <div className="container">
        <m.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl text-right"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            نخبة من أفضل الأطباء
          </h2>
          <p className="text-muted-foreground text-lg">
            تواصل مع أفضل الاستشاريين والمتخصصين في جميع المجالات الطبية.
          </p>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <m.div
                key={`loading-${index}`}
                variants={fadeInUp}
                className="bg-card border-border/50 relative overflow-hidden rounded-2xl border p-6"
              >
                <div className="bg-muted mx-auto mb-4 h-24 w-24 animate-pulse rounded-full" />
                <div className="bg-muted mx-auto mb-3 h-5 w-2/3 animate-pulse rounded" />
                <div className="bg-muted mx-auto h-4 w-1/2 animate-pulse rounded" />
              </m.div>
            ))}

          {!isLoading &&
            !isError &&
            doctors.length > 0 &&
            doctors.map((doctor) => (
              <m.div
                key={doctor.id}
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
                    <m.div
                      variants={fadeIn}
                      transition={{ delay: 0.5 }}
                      className="absolute right-0 bottom-0 h-4 w-4 rounded-full border-2 border-white bg-green-500 ring-2 ring-green-500/20"
                      title="متاح"
                    />
                  </m.div>

                  <h3 className="text-lg font-bold">{doctor.name}</h3>
                  <p className="text-primary mb-3 text-sm font-medium">
                    طبيب متخصص
                  </p>

                  <div className="text-muted-foreground mb-4 flex items-center justify-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>متاح للحجز</span>
                  </div>

                  <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 mt-auto w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                    احجز موعد
                  </button>
                </div>
              </m.div>
            ))}

          {!isLoading && !isError && doctors.length === 0 && (
            <m.div
              variants={fadeInUp}
              className="bg-card col-span-full rounded-2xl border p-8 text-center"
            >
              <p className="text-muted-foreground font-medium">
                لا يوجد أطباء متاحون حالياً.
              </p>
            </m.div>
          )}

          {!isLoading && isError && (
            <m.div
              variants={fadeInUp}
              className="bg-card col-span-full rounded-2xl border p-8 text-center"
            >
              <div className="text-destructive mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <p className="font-semibold">تعذر تحميل بيانات الأطباء</p>
              <p className="text-muted-foreground mt-2 text-sm">
                يرجى المحاولة لاحقاً.
              </p>
            </m.div>
          )}
        </m.div>
      </div>
    </section>
  );
};
