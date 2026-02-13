import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { RegisterForm } from "@/features/auth";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تسجيل</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="mx-auto w-full"
      >
        <div className="mb-4 flex flex-col items-center justify-center gap-2">
          <img src="/images/logo.svg" alt="logo" className="w-20" />
          <h1 className="text-center text-xl font-semibold text-black">
            سجّل حسابك الآن
          </h1>
          <p className="w-full max-w-md text-center text-sm leading-relaxed font-medium text-black/70 lg:max-w-full">
            ابدأ رحلتك معنا وسجّل بياناتك لإنشاء حساب جديد. نوفر لك تجربة طبية
            أكثر أمانًا وتنظيمًا.
          </p>
        </div>
        <RegisterForm />
      </motion.div>
    </>
  );
};

export default Register;
