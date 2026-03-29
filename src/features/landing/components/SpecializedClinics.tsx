import { useEffect, useState } from "react";
import { m } from "framer-motion";
import {
  Activity,
  Brain,
  Heart,
  ShieldAlert,
  Stethoscope,
  Syringe,
  UserRound,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "../animations";

interface IClinic {
  id: string;
  name: string;
}

interface IApiRes {
  data?: IClinic[];
}

const clinicIcons = [Stethoscope, Heart, Brain, Syringe, Activity, UserRound];

export const SpecializedClinics = () => {
  const [clinics, setClinics] = useState<IClinic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchClinics = async () => {
      setIsLoading(true);
      setIsError(false);

      const company = import.meta.env.VITE_SLUG;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/public/${company}/active-clinics`
        );
        if (!response.ok) {
          return setIsError(true);
        }

        const payload = (await response.json()) as unknown;

        if (!isMounted) return;

        setClinics((payload as IApiRes)?.data || []);
        setIsLoading(false);
        return;
      } catch (error) {
        console.error("Error fetching clinics:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }

      if (!isMounted) return;
      setClinics([]);
      setIsError(true);
      setIsLoading(false);
    };

    fetchClinics();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="specialized-clinics" className="bg-muted/30 py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            عياداتنا التخصصية
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            نقدم رعاية طبية شاملة في مكان واحد، بأيدي نخبة من الاستشاريين.
          </m.p>
        </div>

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
                className="bg-card border-border/50 rounded-2xl border p-6 text-right shadow-sm"
              >
                <div className="bg-muted mb-4 h-12 w-12 animate-pulse rounded-xl" />
                <div className="bg-muted mb-3 h-5 w-3/4 animate-pulse rounded" />
                <div className="bg-muted h-4 w-full animate-pulse rounded" />
              </m.div>
            ))}

          {!isLoading &&
            !isError &&
            clinics.length > 0 &&
            clinics.map((clinic, index) => {
              const Icon = clinicIcons[index % clinicIcons.length];

              return (
                <m.div
                  key={clinic.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-card border-border/50 hover:border-primary/50 group rounded-2xl border p-6 text-right shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{clinic.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    نقدم خدمات طبية متخصصة ضمن هذا القسم بأعلى معايير الجودة.
                  </p>
                </m.div>
              );
            })}

          {!isLoading && !isError && clinics.length === 0 && (
            <m.div
              variants={fadeInUp}
              className="bg-card col-span-full rounded-2xl border p-8 text-center"
            >
              <p className="text-muted-foreground font-medium">
                لا توجد عيادات مفعلة حالياً.
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
              <p className="font-semibold">تعذر تحميل بيانات العيادات</p>
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
