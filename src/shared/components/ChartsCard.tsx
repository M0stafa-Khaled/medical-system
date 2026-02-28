import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler,
  ChartOptions,
  ArcElement,
  ChartDataset,
} from "chart.js";
import { motion } from "framer-motion";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { IChartDataset } from "@/shared/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface IProps {
  datasets: IChartDataset[];
  labels: string[];
  isLoading: boolean;
  title?: string;
  subtitle?: string;
}

// Gradient colors for professional look
const gradientColors = [
  {
    from: "rgba(59, 130, 246, 0.4)",
    to: "rgba(59, 130, 246, 0.05)",
    border: "rgb(59, 130, 246)",
  },
  {
    from: "rgba(16, 185, 129, 0.4)",
    to: "rgba(16, 185, 129, 0.05)",
    border: "rgb(16, 185, 129)",
  },
  {
    from: "rgba(245, 101, 101, 0.4)",
    to: "rgba(245, 101, 101, 0.05)",
    border: "rgb(245, 101, 101)",
  },
  {
    from: "rgba(251, 191, 36, 0.4)",
    to: "rgba(251, 191, 36, 0.05)",
    border: "rgb(251, 191, 36)",
  },
  {
    from: "rgba(139, 92, 246, 0.4)",
    to: "rgba(139, 92, 246, 0.05)",
    border: "rgb(139, 92, 246)",
  },
  {
    from: "rgba(236, 72, 153, 0.4)",
    to: "rgba(236, 72, 153, 0.05)",
    border: "rgb(236, 72, 153)",
  },
];

const AnalyticsChart = ({ datasets, labels, isLoading }: IProps) => {
  const chartData = {
    labels: labels ?? [],
    datasets:
      datasets?.map((dataset, index): ChartDataset<"line", number[]> => {
        const colors = gradientColors[index % gradientColors.length];

        return {
          label: dataset?.label || "",
          data: dataset?.data || [],
          backgroundColor: colors.from,
          borderColor: colors.border,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#fff",
          pointBorderColor: colors.border,
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: colors.border,
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 3,
        };
      }) || [],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 12,
            weight: 500,
            family: "'Noto Kufi Arabic', sans-serif",
          },
          color: "#64748b",
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#f8fafc",
        bodyColor: "#f8fafc",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        displayColors: true,
        boxPadding: 6,
        titleFont: {
          size: 13,
          weight: 600,
          family: "'Noto Kufi Arabic', sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "'Noto Kufi Arabic', sans-serif",
        },
        callbacks: {
          label: (context) => {
            return ` ${context.dataset.label}: ${new Intl.NumberFormat("ar-SA").format(context.parsed.y as any)}`;
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: "'Noto Kufi Arabic', sans-serif",
          },
          color: "#64748b",
          padding: 10,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
        ticks: {
          font: {
            size: 11,
            family: "'Noto Kufi Arabic', sans-serif",
          },
          color: "#64748b",
          padding: 10,
          callback: function (tickValue: string | number) {
            return new Intl.NumberFormat("ar-SA").format(Number(tickValue));
          },
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      },
    },

    elements: {
      point: {
        hoverBackgroundColor: "#fff",
      },
      line: {
        borderJoinStyle: "round",
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        {/* Chart Skeleton */}
        <div className="h-80 overflow-hidden rounded-xl">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-gray-900/80 dark:shadow-gray-900/50">
        {/* Top Accent Line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-500 via-violet-500 to-emerald-500" />

        {/* Chart Area */}
        <div className="relative h-80">
          <Line data={chartData} options={options} />
        </div>

        {/* Corner Decorations */}
        <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-linear-to-br from-sky-500/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150 dark:from-sky-500/20" />
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-linear-to-br from-violet-500/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150 dark:from-violet-500/20" />
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;
