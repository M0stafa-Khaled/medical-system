import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { motion as m } from "framer-motion";
import { LoginForm } from "../components/LoginForm";
import { LogIn, ArrowLeft, Lock } from "lucide-react";

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

const Login = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تسجيل الدخول</title>
      </Helmet>
      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-md space-y-7"
      >
        {/* Logo Badge */}
        <m.div variants={scaleIn} className="mb-2 flex justify-center">
          <div className="border-primary/30 dark:border-primary/50 bg-primary/10 dark:bg-primary/15 relative inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <Lock className="text-primary dark:text-primary h-4 w-4" />
            <span className="text-primary dark:text-primary text-xs font-semibold">
              تسجيل دخول آمن
            </span>
          </div>
        </m.div>

        {/* Header Section */}
        <m.div variants={fadeInUp} className="space-y-3 text-center">
          <div className="flex justify-center">
            <m.div
              variants={scaleIn}
              className="from-primary/25 to-primary/15 dark:from-primary/30 dark:to-primary/20 relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br"
            >
              <div className="from-primary/40 dark:from-primary/50 absolute inset-0 bg-linear-to-br to-transparent opacity-50" />
              <LogIn className="text-primary dark:text-primary relative h-10 w-10" />
            </m.div>
          </div>
          <div className="space-y-2">
            <h1 className="text-foreground text-3xl font-bold sm:text-4xl dark:text-white">
              مرحباً بعودتك
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base dark:text-gray-400">
              تسجيل الدخول إلى نظام إدارة العيادات المتطور
            </p>
          </div>
        </m.div>

        {/* Security Badge */}
        <m.div
          variants={fadeInUp}
          className="bg-primary/5 dark:bg-primary/15 border-primary/20 dark:border-primary/30 rounded-xl border p-3 text-center"
        >
          <p className="text-muted-foreground text-xs dark:text-gray-400">
            🔒{" "}
            <span className="text-primary dark:text-primary font-semibold">
              بيانات محمية بتشفير عالي
            </span>
          </p>
        </m.div>

        {/* Form */}
        <m.div variants={fadeInUp}>
          <LoginForm />
        </m.div>

        {/* Divider */}
        <m.div variants={fadeInUp} className="relative">
          <div className="absolute inset-0 flex items-center">
            <div
              className="bg-border dark:bg-border/60 w-full"
              style={{ height: "1px" }}
            />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-3 text-xs font-medium dark:bg-gray-800 dark:text-white">
              أو
            </span>
          </div>
        </m.div>

        {/* Sign Up CTA */}
        <m.div
          variants={fadeInUp}
          className="bg-primary/10 dark:bg-primary/20 border-primary/20 dark:border-primary/40 space-y-3 rounded-xl border p-4 text-center"
        >
          <p className="text-foreground text-sm dark:text-white">
            ليس لديك حساب؟
          </p>
          <Link
            to={"/sign-up"}
            className="text-primary hover:text-primary/80 dark:hover:text-primary/90 inline-block font-semibold transition-colors"
          >
            تسجيل حساب جديد →
          </Link>
        </m.div>

        {/* Footer Links */}
        <m.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-2"
        >
          <Link
            to={"/"}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition-colors dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            العودة
          </Link>
          <span className="text-border dark:text-gray-700">•</span>
          <Link
            to={"/forgot-password"}
            className="text-muted-foreground hover:text-foreground text-xs transition-colors dark:text-gray-400 dark:hover:text-white"
          >
            هل نسيت كلمة المرور؟
          </Link>
        </m.div>
      </m.div>
    </>
  );
};

export default Login;
