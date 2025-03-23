import { Helmet } from "react-helmet-async";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تسجيل الدخول</title>
      </Helmet>
      <div className="text-black dark:text-white">Register</div>
    </>
  );
};

export default Register;
