import { m } from "framer-motion";
import { fadeInUp, staggerContainer } from "../animations";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const CTA = () => {
  return (
    <section
      id="contact"
      className="bg-background relative overflow-hidden py-24"
    >
      <div className="bg-primary/5 absolute inset-0">
        <div className="bg-primary/10 absolute -top-20 -left-20 h-96 w-96 rounded-full opacity-50 blur-3xl" />{" "}
        <div className="bg-secondary/10 absolute -right-20 -bottom-20 h-96 w-96 rounded-full opacity-50 blur-3xl" />{" "}
      </div>

      <div className="relative z-10 container">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center"
        >
          <m.h2
            variants={fadeInUp}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            صحتك لا تقبل التأجيل
          </m.h2>
          <m.p
            variants={fadeInUp}
            className="text-muted-foreground mx-auto mb-10 max-w-2xl text-xl"
          >
            انضم لآلاف المرضى الذين وثقوا في عيادتي للحصول على أفضل رعاية صحية.
            احجز موعدك الآن بكل سهولة.
          </m.p>

          <m.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="h-14 w-full rounded-full px-8 text-lg sm:w-auto"
            >
              احجز كشف الآن <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-background h-14 w-full rounded-full px-8 text-lg sm:w-auto"
            >
              تواصل معنا واتساب
            </Button>
          </m.div>

          <m.p
            variants={fadeInUp}
            className="text-muted-foreground mt-6 text-sm"
          >
            طوارئ 24 ساعة - متاح حجز أونلاين
          </m.p>
        </m.div>
      </div>
    </section>
  );
};
