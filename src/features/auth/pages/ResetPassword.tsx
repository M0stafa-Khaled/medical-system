import { Helmet } from "react-helmet-async";
import { motion as m } from "framer-motion";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

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

const ResetPassword = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | إعادة تعيين كلمة المرور</title>
      </Helmet>

      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full max-w-md space-y-7"
      >
        {/* Badge */}
        <m.div variants={scaleIn} className="flex justify-center">
          <div className="border-primary/30 dark:border-primary/50 bg-primary/10 dark:bg-primary/15 relative inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <Lock className="text-primary h-4 w-4" />
            <span className="text-primary text-xs font-semibold">
              كلمة مرور جديدة
            </span>
          </div>
        </m.div>

        {/* Header */}
        <m.div variants={fadeInUp} className="space-y-3 text-center">
          <div className="flex justify-center">
            <m.div
              variants={scaleIn}
              className="from-primary/25 to-primary/15 dark:from-primary/30 dark:to-primary/20 relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br"
            >
              <div className="from-primary/40 dark:from-primary/50 absolute inset-0 bg-linear-to-br to-transparent opacity-50" />
              <Lock className="text-primary relative h-10 w-10" />
            </m.div>
          </div>
          <div className="space-y-2">
            <h1 className="text-foreground text-3xl font-bold sm:text-4xl dark:text-white">
              إعادة التعيين
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base dark:text-gray-400">
              أدخل رمز التحقق واختر كلمة مرور قوية جديدة
            </p>
          </div>
        </m.div>

        {/* Info Box */}
        <m.div
          variants={fadeInUp}
          className="bg-primary/5 dark:bg-primary/15 border-primary/20 dark:border-primary/30 rounded-xl border p-3 text-center"
        >
          <p className="text-muted-foreground text-xs dark:text-gray-400">
            🔐{" "}
            <span className="text-primary font-semibold">
              اختر كلمة مرور آمنة
            </span>
          </p>
        </m.div>

        {/* Form */}
        <m.div variants={fadeInUp}>
          <ResetPasswordForm />
        </m.div>

        {/* Footer Links */}
        <m.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-2"
        >
          <Link
            to="/sign-in"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition-colors dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            العودة للتسجيل
          </Link>
        </m.div>
      </m.div>
    </>
  );
};

export default ResetPassword;
