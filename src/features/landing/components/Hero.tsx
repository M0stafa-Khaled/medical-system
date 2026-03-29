import { m } from "framer-motion";
import { fadeInUp, staggerContainer } from "../animations";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

export const Hero = () => {
  return (
    <section
      id="home"
      className="bg-background relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <div className="bg-primary/30 h-125 w-125 translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />
        <div className="bg-secondary/30 h-100 w-100 -translate-x-1/2 translate-y-1/2 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 container">
        <div className="grid items-center gap-12 py-4 lg:grid-cols-2 lg:gap-8">
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-start gap-5 text-right lg:gap-7"
          >
            <m.div
              variants={fadeInUp}
              className="border-primary/25 from-primary/10 to-primary/5 text-primary inline-flex items-center rounded-full border bg-linear-to-l px-3 py-1.5 text-xs font-semibold sm:text-sm"
            >
              <span className="bg-primary ml-2 flex h-2 w-2 animate-pulse rounded-full" />
              رعاية طبية بمقاييس عالمية
            </m.div>

            <m.h1
              variants={fadeInUp}
              className="text-foreground max-w-2xl text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              مستقبل الرعاية الصحية
              <br />
              <span className="text-primary">يبدأ من هنا</span>
            </m.h1>

            <m.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-160 text-base leading-8 sm:text-lg"
            >
              نوفر تجربة طبية متكاملة تجمع بين الكفاءة السريرية والأنظمة الرقمية
              الذكية، لضمان خدمة أسرع، دقة أعلى، وراحة كاملة في كل زيارة.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="grid w-full max-w-xl gap-3 sm:grid-cols-3"
            >
              <div className="bg-card/70 border-border/60 rounded-2xl border p-3 text-center backdrop-blur">
                <p className="text-primary text-xl font-black sm:text-2xl">
                  24/7
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  دعم مستمر
                </p>
              </div>
              <div className="bg-card/70 border-border/60 rounded-2xl border p-3 text-center backdrop-blur">
                <p className="text-primary text-xl font-black sm:text-2xl">
                  120+
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  مراجع يومياً
                </p>
              </div>
              <div className="bg-card/70 border-border/60 rounded-2xl border p-3 text-center backdrop-blur">
                <p className="text-primary text-xl font-black sm:text-2xl">
                  4.9
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  متوسط التقييم
                </p>
              </div>
            </m.div>

            <m.div
              variants={staggerContainer}
              className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row sm:gap-4"
            >
              <m.div variants={fadeInUp}>
                <Button
                  size="lg"
                  className="shadow-primary/20 hover:shadow-primary/30 h-11 w-full rounded-full px-6 text-sm shadow-lg transition-all sm:h-12 sm:w-auto sm:px-8 sm:text-base"
                  asChild
                >
                  <Link to="/sign-in">
                    احجز موعدك الآن <ArrowLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </m.div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="text-muted-foreground flex flex-wrap items-center gap-3 pt-1 text-xs sm:gap-6 sm:pt-2 sm:text-sm"
            >
              <div className="bg-background/80 border-border/60 flex items-center gap-2 rounded-full border px-3 py-1.5">
                <CheckCircle2 className="text-primary h-4 w-4" />
                <span>أطباء استشاريون</span>
              </div>
              <div className="bg-background/80 border-border/60 flex items-center gap-2 rounded-full border px-3 py-1.5">
                <CheckCircle2 className="text-primary h-4 w-4" />
                <span>طوارئ 24 ساعة</span>
              </div>
            </m.div>
          </m.div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-2"
          >
            <m.div
              variants={fadeInUp}
              className="bg-card/70 border-border/60 group hover:border-primary/40 relative overflow-hidden rounded-2xl border p-6 backdrop-blur transition-all hover:shadow-lg"
            >
              <div className="bg-primary/10 group-hover:bg-primary/20 absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl transition-all" />
              <div className="relative space-y-3">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-foreground font-semibold">فحص شامل</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  فحوصات دورية وشاملة بأحدث الأجهزة الطبية
                </p>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="bg-card/70 border-border/60 group hover:border-primary/40 relative overflow-hidden rounded-2xl border p-6 backdrop-blur transition-all hover:shadow-lg"
            >
              <div className="bg-primary/10 group-hover:bg-primary/20 absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl transition-all" />
              <div className="relative space-y-3">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-foreground font-semibold">مواعيد مرنة</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  احجز موعدك بسهولة في أي وقت يناسبك
                </p>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="bg-card/70 border-border/60 group hover:border-primary/40 relative overflow-hidden rounded-2xl border p-6 backdrop-blur transition-all hover:shadow-lg"
            >
              <div className="bg-primary/10 group-hover:bg-primary/20 absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl transition-all" />
              <div className="relative space-y-3">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-foreground font-semibold">أطباء متخصصون</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  فريق طبي متميز برعاية عالية الجودة
                </p>
              </div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="bg-card/70 border-border/60 group hover:border-primary/40 relative overflow-hidden rounded-2xl border p-6 backdrop-blur transition-all hover:shadow-lg"
            >
              <div className="bg-primary/10 group-hover:bg-primary/20 absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl transition-all" />
              <div className="relative space-y-3">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-foreground font-semibold">سرعة الخدمة</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  علاج سريع وفعال بأحدث الطرق الطبية
                </p>
              </div>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
};
