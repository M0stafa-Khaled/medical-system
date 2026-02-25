import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { LoginForm } from "../components/LoginForm";

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
        className="w-full max-w-sm"
      >
        <div className="mb-6 flex flex-col items-center justify-center gap-2">
          <img src="/images/logo.svg" alt="logo" className="w-16" />
          <h1 className="text-center text-xl font-semibold text-black">
            تسجيل الدخول
          </h1>
          <p className="text-center text-sm font-medium text-black/70">
            مرحبا بعودتك، يرجى تسجيل الدخول للمتابعة
          </p>
        </div>
        <LoginForm />
        <p className="mt-2 text-sm text-black">
          ليس لديك حساب؟{" "}
          <Link to={"/register"} className="text-black underline">
            تسجيل حساب جديد
          </Link>
        </p>
      </motion.div>
    </>
  );
};

export default Login;
