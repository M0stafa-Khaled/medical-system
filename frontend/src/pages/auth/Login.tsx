import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoginForm from "@/components/forms/auth/LoginForm";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تسجيل الدخول</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col justify-center items-center gap-2 mb-6">
          <img src="/logo.svg" alt="logo" className="w-20" />
          <h1 className="font-semibold text-black text-xl text-center">
            تسجيل الدخول
          </h1>
          <p className="text-sm font-medium text-black/70 text-center">
            مرحبا بعودتك، يرجى تسجيل الدخول للمتابعة
          </p>
        </div>
        <LoginForm />
        <p className="mt-2 text-sm text-black">
          ليس لديك حساب؟{" "}
          <Link to={"/register"} className="underline text-[#000]">
            تسجيل حساب جديد
          </Link>
        </p>
      </motion.div>
    </>
  );
};

export default Login;
