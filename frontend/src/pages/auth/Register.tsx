import ReverseProtectedRoute from "@/components/auth/ReverseProtectedRoute";

const Register = () => {
  return (
    <ReverseProtectedRoute>
      <div className="text-black dark:text-white">Register</div>
    </ReverseProtectedRoute>
  );
};

export default Register;
