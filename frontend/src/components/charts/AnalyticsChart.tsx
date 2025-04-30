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
} from "chart.js";
import { useTheme } from "next-themes";
import { IChartDataset } from "@/interfaces/charts/charts";
import { Skeleton } from "@/components/ui/skeleton";
import { useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler
);

interface IProps {
  datasets: IChartDataset[];
  labels: string[];
  title: string;
  isLoading: boolean;
}

const colors = [
  "rgba(75, 192, 192, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(153, 102, 255, 1)",
];

const AnalyticsChart = ({ datasets, labels, title, isLoading }: IProps) => {
  const { theme } = useTheme();
  const chartRef = useRef<any>(null);

  const chartData = {
    labels: labels || [],
    datasets:
      datasets?.map((dataset, idx) => {
        const color = colors[idx % colors.length];

        let gradient = color.replace("1)", "0.1)");

        if (chartRef.current) {
          const ctx = chartRef.current.ctx;
          const chartArea = chartRef.current.chartArea;

          if (ctx && chartArea) {
            const newGradient = ctx.createLinearGradient(
              0,
              chartArea.bottom,
              0,
              chartArea.top
            );
            newGradient.addColorStop(0, color.replace("1)", "0.1)"));
            newGradient.addColorStop(1, color.replace("1)", "0.4)"));
            gradient = newGradient;
          }
        }

        return {
          ...dataset,
          ...(title === "الإيرادات" && { label: "الإيرادات" }),
          borderColor: color,
          backgroundColor: gradient,
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: color,
          pointBorderColor: theme === "dark" ? "#333" : "#fff",
          pointHoverRadius: 5,
        };
      }) || [],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${value}`;
          },
        },
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        titleColor: theme === "dark" ? "#fff" : "#333",
        bodyColor: theme === "dark" ? "#fff" : "#333",
        borderColor: "#00c0f0",
        borderWidth: 1,
        bodyFont: {
          family: "Alexandria",
        },
      },

      legend: {
        position: "top",
        labels: {
          font: {
            family: "Alexandria",
          },
          color: theme === "dark" ? "#fff" : "#333",
        },
      },
      title: {
        display: true,
        text: title,
        color: theme === "dark" ? "white" : "black",
        font: {
          size: 16,
          family: "Alexandria",
          weight: "normal",
        },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          color: theme === "dark" ? "#ffffff12" : "#3333332b",
        },
        ticks: {
          color: theme === "dark" ? "#fff" : "#333",
          font: {
            family: "Alexandria",
          },
        },
      },
      y: {
        ticks: {
          precision: 0,
          color: theme === "dark" ? "#fff" : "#333",
          font: {
            family: "Alexandria",
          },
        },
        grid: {
          color: theme === "dark" ? "#ffffff12" : "#3333332b",
        },
      },
    },
  };

  return (
    <div className="min-h-80 lg:h-[450px] p-5" dir="rtl">
      {isLoading ? (
        <Skeleton className="min-h-64 lg:h-[350px] w-full" />
      ) : (
        <Line ref={chartRef} data={chartData} options={options} redraw />
      )}
    </div>
  );
};

export default AnalyticsChart;
