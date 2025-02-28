import { useTheme } from "next-themes";
import { ThreeDots } from "react-loader-spinner";
import { motion } from "framer-motion";

const LoadingSpinnerPage = () => {
  const { theme } = useTheme();
  return (
    <motion.div
      className="min-h-screen flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color={theme === "dark" ? "#fff" : "#131217"}
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinnerPage;
