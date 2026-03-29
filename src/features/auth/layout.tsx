import { RootState } from "@/app/store";
import cookieServices from "@/shared/utils/cookieServices";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import useNetworkStatus from "@/shared/hooks/useNetworkStatus";
import { motion as m } from "framer-motion";
import { Shield, Clock, Users, Zap } from "lucide-react";

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const features = [
  { icon: Shield, title: "آمن تماماً", desc: "تشفير عالي المستوى" },
  { icon: Clock, title: "متاح 24/7", desc: "خدمة مستمرة طوال الوقت" },
  { icon: Users, title: "موثوق", desc: "يثق به آلاف الأطباء" },
  { icon: Zap, title: "سريع", desc: "أداء عالي وفعال" },
];

const AuthLayout = () => {
  const path = useLocation().pathname;
  useNetworkStatus();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    const role = cookieServices.getUser()?.role;
    // Admin & Employee
    if (role === "admin" || role === "employee")
      return <Navigate to="/dashboard" replace />;
    // Doctor
    if (role === "doctor") return <Navigate to="/doctor" replace />;
    // Patient
    return <Navigate to="/patient" replace />;
  }

  return (
    <main className="auth-scroll-bar relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="from-background via-background to-primary/10 dark:to-primary/5 absolute inset-0 bg-linear-to-br dark:from-gray-950 dark:via-gray-900" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary/8 dark:bg-primary/5 absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-primary/5 dark:bg-primary/3 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-secondary/5 dark:bg-secondary/3 absolute top-1/2 left-1/3 h-72 w-72 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 py-8 sm:container">
        <div
          className={`${
            !path.includes("register")
              ? "md:max-w-6xl lg:max-w-7xl"
              : "max-w-2xl"
          } mx-auto w-full`}
        >
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-border/40 bg-card/50 overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/40 dark:shadow-2xl/50 dark:backdrop-blur-md"
          >
            <div className="grid grid-cols-1 gap-0 md:grid-cols-5">
              <m.div
                variants={fadeInRight}
                initial="hidden"
                animate="show"
                className="bg-card/70 flex flex-col justify-center px-6 py-10 sm:px-10 md:col-span-3 dark:bg-gray-800"
              >
                <div className="space-y-8">
                  <Outlet />
                </div>
              </m.div>

              <m.div
                variants={fadeInLeft}
                initial="hidden"
                animate="show"
                className="from-primary/15 to-primary/5 dark:from-primary/20 dark:to-primary/10 hidden bg-linear-to-br md:col-span-2 md:flex md:flex-col md:items-center md:justify-between md:px-8 md:py-10"
              >
                <div className="w-full space-y-8">
                  <m.div variants={scaleIn} className="flex justify-center">
                    <div className="relative h-48 w-full max-w-90 overflow-hidden rounded-3xl border border-white/30 bg-white/20 p-5 shadow-xl backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/40">
                      <div className="rounded-2xl border border-white/40 bg-white/35 p-3 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/45">
                        <svg
                          viewBox="0 0 240 120"
                          className="text-primary h-30 w-full"
                          role="img"
                          aria-label="Medical dashboard illustration"
                        >
                          <rect
                            x="8"
                            y="12"
                            width="224"
                            height="96"
                            rx="14"
                            className="fill-white/60 dark:fill-gray-800"
                          />
                          <rect
                            x="20"
                            y="24"
                            width="70"
                            height="10"
                            rx="5"
                            className="fill-primary/35"
                          />
                          <rect
                            x="20"
                            y="42"
                            width="96"
                            height="8"
                            rx="4"
                            className="fill-primary/20"
                          />
                          <rect
                            x="20"
                            y="56"
                            width="76"
                            height="8"
                            rx="4"
                            className="fill-primary/20"
                          />
                          <rect
                            x="20"
                            y="70"
                            width="52"
                            height="8"
                            rx="4"
                            className="fill-primary/20"
                          />
                          <circle
                            cx="182"
                            cy="44"
                            r="20"
                            className="fill-primary/20"
                          />
                          <path
                            d="M182 32v24M170 44h24"
                            className="stroke-primary stroke-4"
                            strokeLinecap="round"
                          />
                          <path
                            d="M138 83 C146 70, 154 94, 162 83 C170 72, 178 96, 186 83 C194 71, 202 92, 210 80"
                            className="stroke-primary fill-none stroke-3"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </m.div>

                  <div className="space-y-3">
                    {features.map((feature, idx) => {
                      const Icon = feature.icon;
                      return (
                        <m.div
                          key={idx}
                          variants={fadeInUp}
                          custom={idx}
                          initial="hidden"
                          animate="show"
                          transition={{ delay: 0.1 + idx * 0.1 }}
                          className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/15 dark:border-gray-700 dark:bg-gray-800/40 dark:hover:border-gray-600 dark:hover:bg-gray-700/50"
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-primary dark:text-primary shrink-0 pt-0.5">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-foreground text-sm font-semibold dark:text-white">
                                {feature.title}
                              </p>
                              <p className="text-muted-foreground text-xs dark:text-gray-400">
                                {feature.desc}
                              </p>
                            </div>
                          </div>
                        </m.div>
                      );
                    })}
                  </div>
                </div>

                <m.div variants={scaleIn} className="mt-3 w-full">
                  <div className="border-primary/30 dark:border-primary/40 bg-primary/10 dark:bg-primary/20 rounded-xl border px-4 py-3 text-center backdrop-blur">
                    <p className="text-primary dark:text-primary text-xs font-semibold">
                      ✓ موثوق من قبل 1000+ عيادة
                    </p>
                  </div>
                </m.div>
              </m.div>
            </div>
          </m.div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
