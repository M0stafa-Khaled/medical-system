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
} from "chart.js";
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
}

const borderColors = [
  "rgba(59, 130, 246, 1)",
  "rgba(16, 185, 129, 1)",
  "rgba(245, 101, 101, 1)",
  "rgba(251, 191, 36, 1)",
  "rgba(139, 92, 246, 1)",
  "rgba(236, 72, 153, 1)",
];
const AnalyticsChart = ({ datasets, labels, isLoading }: IProps) => {
  const chartData = {
    labels: labels ?? [],
    datasets: datasets?.map((dataset, index) => ({
      label: dataset?.label,
      data: dataset?.data,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderColor: borderColors[index % borderColors.length],
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: borderColors[index % borderColors.length],
      pointBorderColor: "line",
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      borderRadius: 8,
    })),
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
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
          },
          color: "#6B7280",
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 11,
          },
          color: "#6B7280",
          callback: function (tickValue: string | number) {
            return new Intl.NumberFormat().format(Number(tickValue));
          },
        },
        beginAtZero: true,
      },
    },

    elements: {
      point: {
        hoverBackgroundColor: "#fff",
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="h-80 max-w-5xl">
      {isLoading ? (
        <Skeleton className="min-h-64 w-full lg:h-80" />
      ) : (
        <Line
          data={{ ...chartData, datasets: chartData.datasets ?? [] }}
          options={options as ChartOptions<"line">}
        />
      )}
    </div>
  );
};

export default AnalyticsChart;
