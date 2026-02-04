import { containerVariants, itemVariants } from "@/animations";
import CircleProgress from "@/components/ui/CircleProgress";
import { IFeature } from "@/interfaces/dashboard/company";
import { motion } from "framer-motion";

const FeaturesUsage = ({ features }: { features: IFeature[] }) => {
  const colors = [
    "stroke-blue-600",
    "stroke-orange-600",
    "stroke-green-600",
    "stroke-red-600",
    "stroke-purple-600",
    "stroke-pink-600",
    "stroke-yellow-600",
    "stroke-teal-600",
  ];
  return (
    <motion.div
      variants={containerVariants}
      className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {features.map((feature, idx) => {
        if (feature.name === "استقبال الاشعارات") return null;
        const color = colors[idx % colors.length];
        const percentage = Math.round(
          (feature.used / +feature.max_value) * 100
        );
        return (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-1"
            key={feature.name}
          >
            <CircleProgress value={percentage} color={color} size={150} />
            <div className="text-center space-y-1">
              <span>
                {feature.used}/{feature.max_value}
              </span>
              <h3 className="font-medium">{feature.name}</h3>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FeaturesUsage;
