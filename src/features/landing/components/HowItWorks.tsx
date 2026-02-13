import { m } from "framer-motion";
import { staggerContainer, fadeInRight } from "../animations";
import { UserPlus, CalendarCheck, Stethoscope, FileText } from "lucide-react";

const steps = [
  {
    title: "سجل بياناتك",
    description: "قم بإنشاء ملفك الطبي في أقل من دقيقتين.",
    icon: UserPlus,
  },
  {
    title: "اختر طبيبك",
    description: "تصفح قائمة الأطباء واختر الموعد المناسب لك.",
    icon: CalendarCheck,
  },
  {
    title: "الكشف الطبي",
    description: "احضر للكشف في الموعد المحدد دون انتظار.",
    icon: Stethoscope,
  },
  {
    title: "نتائجك وملفك",
    description: "تابع نتائج التحاليل والروشيتة من خلال التطبيق.",
    icon: FileText,
  },
];

export const HowItWorks = () => {
  return (
    <section className="bg-background relative overflow-hidden py-24">
      <div className="bg-primary/5 absolute top-0 left-0 -mt-20 -ml-20 h-[600px] w-[600px] rounded-full opacity-50 blur-3xl" />{" "}
      <div className="relative z-10 container">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            رحلة علاجك تبدأ هنا
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            خطوات بسيطة تفصلك عن الحصول على أفضل رعاية طبية.
          </m.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Hidden on Mobile) */}
          <div className="bg-border absolute top-10 right-0 left-0 -z-10 hidden h-0.5 lg:block">
            <m.div
              initial={{ scaleX: 0, transformOrigin: "right" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="bg-primary h-full"
            />
          </div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step, index) => (
              <m.div
                key={index}
                variants={fadeInRight}
                className="relative flex flex-col items-center text-center"
              >
                <div className="bg-background border-primary/20 group hover:border-primary/50 relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-sm transition-colors">
                  <div className="bg-primary/5 absolute inset-0 scale-0 rounded-full transition-transform duration-300 group-hover:scale-100" />
                  <step.icon className="text-primary h-8 w-8" />

                  <div className="bg-primary text-primary-foreground border-background absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
};
