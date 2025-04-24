import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import RegisterForm from "@/components/forms/auth/RegisterForm";

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
        className="w-full mx-auto"
      >
        <div className="flex flex-col justify-center items-center gap-2 mb-4">
          <img src="/images/logo.svg" alt="logo" className="w-20" />
          <h1 className="font-semibold text-black text-xl text-center">
            سجّل حسابك الآن
          </h1>
          <p className="text-sm font-medium text-black/70 text-center w-full max-w-md lg:max-w-full leading-relaxed">
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
