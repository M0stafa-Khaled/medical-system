import { Helmet } from "react-helmet-async";
import { motion as m } from "framer-motion";
import { RegisterForm } from "../components/RegisterForm";
import { UserPlus } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const Register = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تسجيل</title>
      </Helmet>
      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-md space-y-7 lg:max-w-xl"
      >
        <m.div variants={scaleIn} className="flex justify-center">
          <div className="border-primary/30 dark:border-primary/50 bg-primary/10 dark:bg-primary/15 relative inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <UserPlus className="text-primary h-4 w-4" />
            <span className="text-primary text-xs font-semibold">
              إنشاء حساب جديد
            </span>
          </div>
        </m.div>

        <m.div variants={fadeInUp} className="space-y-3 text-center">
          <div className="flex justify-center">
            <m.div
              variants={scaleIn}
              className="from-primary/25 to-primary/15 dark:from-primary/30 dark:to-primary/20 relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br"
            >
              <div className="from-primary/40 dark:from-primary/50 absolute inset-0 bg-linear-to-br to-transparent opacity-50" />
              <UserPlus className="text-primary relative h-10 w-10" />
            </m.div>
          </div>
          <div className="space-y-2">
            <h1 className="text-foreground text-3xl font-bold sm:text-4xl dark:text-white">
              سجل حسابك الآن
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base dark:text-gray-400">
              ابدأ رحلتك معنا وسجل بياناتك لإنشاء حساب جديد وتجربة طبية منظمة
              وآمنة.
            </p>
          </div>
        </m.div>

        <m.div
          variants={fadeInUp}
          className="bg-primary/5 dark:bg-primary/15 border-primary/20 dark:border-primary/30 rounded-xl border p-3 text-center"
        >
          <p className="text-muted-foreground text-xs dark:text-gray-400">
            ✅{" "}
            <span className="text-primary font-semibold">
              خطوات تسجيل بسيطة وسريعة
            </span>
          </p>
        </m.div>

        <m.div variants={fadeInUp}>
          <RegisterForm />
        </m.div>
      </m.div>
    </>
  );
};

export default Register;
