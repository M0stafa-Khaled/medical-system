import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ResetPasswordForm } from "@/features/auth";

const ResetPassword = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | هل نسيت كلمة المرور</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="mb-6 flex max-w-md flex-col items-center justify-center gap-2 md:max-w-sm">
          <img src="/images/logo.svg" alt="logo" className="w-20" />
          <h1 className="text-center text-xl font-semibold text-black">
            إعادة تعيين كلمة المرو
          </h1>
          <p className="text-center text-sm leading-relaxed text-black/70">
            فضلاً، أدخل رمز التحقق الذي أرسلناه إلى بريدك الإلكتروني، واختر كلمة
            مرور جديدة لحسابك.
          </p>
        </div>
        <ResetPasswordForm />
      </motion.div>
    </>
  );
};

export default ResetPassword;
