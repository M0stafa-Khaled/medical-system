import { Helmet } from "react-helmet-async";
import { motion as m } from "framer-motion";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { MailQuestion, ArrowLeft } from "lucide-react";
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

const ForgotPassword = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | هل نسيت كلمة المرور</title>
      </Helmet>

      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-md space-y-7"
      >
        {/* Badge */}
        <m.div variants={scaleIn} className="flex justify-center">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-600/10 px-4 py-2 dark:border-amber-600/50 dark:bg-amber-600/15">
            <MailQuestion className="h-4 w-4 text-amber-600 dark:text-amber-500" />
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-500">
              استعادة الحساب
            </span>
          </div>
        </m.div>

        {/* Header */}
        <m.div variants={fadeInUp} className="space-y-3 text-center">
          <div className="flex justify-center">
            <m.div
              variants={scaleIn}
              className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-amber-600/25 to-amber-600/15 dark:from-amber-600/30 dark:to-amber-600/20"
            >
              <div className="absolute inset-0 bg-linear-to-br from-amber-600/40 to-transparent opacity-50 dark:from-amber-600/50" />
              <MailQuestion className="relative h-10 w-10 text-amber-600 dark:text-amber-500" />
            </m.div>
          </div>
          <div className="space-y-2">
            <h1 className="text-foreground text-3xl font-bold sm:text-4xl dark:text-white">
              استعادة الحساب
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base dark:text-gray-400">
              لا تقلق! سنساعدك على استعادة الوصول إلى حسابك بسهولة
            </p>
          </div>
        </m.div>

        {/* Info Box */}
        <m.div
          variants={fadeInUp}
          className="rounded-xl border border-amber-600/20 bg-amber-600/5 p-3 text-center dark:border-amber-600/30 dark:bg-amber-600/15"
        >
          <p className="text-muted-foreground text-xs dark:text-gray-400">
            📧{" "}
            <span className="font-semibold text-amber-700 dark:text-amber-500">
              سنرسل لك رمز تحقق
            </span>
          </p>
        </m.div>

        {/* Form */}
        <m.div variants={fadeInUp}>
          <ForgotPasswordForm />
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

export default ForgotPassword;
