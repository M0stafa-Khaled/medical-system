import { m } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "../animations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="home"
      className="bg-background relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <div className="bg-primary/30 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />
        <div className="bg-secondary/30 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-start gap-6 text-right"
          >
            <m.div
              variants={fadeInUp}
              className="border-primary/20 bg-primary/5 text-primary inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium"
            >
              <span className="bg-primary ml-2 flex h-2 w-2 animate-pulse rounded-full"></span>
              رعاية طبية بمقاييس عالمية
            </m.div>

            <m.h1
              variants={fadeInUp}
              className="text-foreground text-4xl leading-tight font-bold tracking-tight sm:text-6xl"
            >
              صحتك أمانة <br />
              <span className="text-primary">بين أيدٍ أمينة</span>
            </m.h1>

            <m.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-[600px] text-lg leading-relaxed"
            >
              نقدم في مجمع عيادتي الطبي خدمات صحية متكاملة بأحدث التقنيات وعلى
              يد نخبة من أفضل الاستشاريين، لأن راحتكم وسلامتكم هي أولويتنا
              القصوى.
            </m.p>

            <m.div
              variants={staggerContainer}
              className="flex w-full flex-wrap gap-4 pt-4"
            >
              <m.div variants={fadeInUp}>
                <Button
                  size="lg"
                  className="shadow-primary/20 hover:shadow-primary/30 h-12 rounded-full px-8 text-base shadow-lg transition-all"
                >
                  احجز موعدك الآن <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </m.div>
              <m.div variants={fadeInUp}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/20 hover:bg-primary/5 bg-background/50 h-12 rounded-full px-8 text-base backdrop-blur-sm"
                >
                  خدماتنا
                </Button>
              </m.div>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="text-muted-foreground flex items-center gap-6 pt-4 text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-primary h-4 w-4" />
                <span>أطباء استشاريون</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-primary h-4 w-4" />
                <span>طوارئ 24 ساعة</span>
              </div>
            </m.div>
          </m.div>

          <div className="perspective-1000 relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <m.div
              initial="initial"
              whileInView="whileInView"
              variants={scaleIn}
              className="relative flex aspect-square items-center justify-center rounded-full"
            >
              <div className="from-primary/10 to-secondary/10 animate-pulse-slow absolute inset-0 rounded-full bg-linear-to-tr via-transparent blur-3xl" />

              <div className="relative flex h-80 w-80 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-linear-to-b from-white/10 to-white/5 shadow-2xl backdrop-blur-md dark:from-black/10 dark:to-black/5">
                <div className="from-primary/10 absolute inset-0 bg-linear-to-tr to-transparent opacity-50" />
                <div className="p-6 text-center">
                  <div className="bg-primary shadow-primary/30 mx-auto mb-4 flex h-16 items-center justify-center rounded-2xl shadow-lg">
                    <span className="text-primary-foreground text-3xl font-bold">
                      عيادتي
                    </span>
                  </div>
                  <h3 className="text-foreground text-xl font-bold">
                    مجمع عيادتي الطبي
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    رعاية صحية متكاملة
                  </p>
                </div>
              </div>

              <m.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-card/90 border-border/50 absolute top-10 right-0 w-56 rounded-xl border p-4 shadow-xl backdrop-blur-md sm:-right-10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 13.5v4L15.5 21L12 17.5l-3.5 3.5L5 17.5v-4" />
                      <path d="M12 9V5a2 2 0 0 1 2-2h3" />
                      <path d="M12 9v9" />
                      <path d="M9 12H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      حالات اليوم
                    </p>
                    <p className="flex items-center gap-1 text-xs font-medium text-green-600">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      +120 مراجع
                    </p>
                  </div>
                </div>
              </m.div>

              <m.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="bg-card/90 border-border/50 absolute bottom-5 left-0 w-52 rounded-xl border p-4 shadow-xl backdrop-blur-md sm:-left-8 lg:bottom-16"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      رضاء المرضى
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      4.9/5 تقييم عام
                    </p>
                  </div>
                </div>
              </m.div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
};
