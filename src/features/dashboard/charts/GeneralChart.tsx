import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  ChartOptions,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

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

interface GeneralChartProps {
  data: {
    labels: string[];
    datasets: { label: string; data: number[] }[];
  };
  type?: "bar" | "line";
  height?: string;
  className?: string;
}

const GeneralChart = ({
  data,
  type = "line",
  height = "h-80",
  className,
}: GeneralChartProps) => {
  const colors = [
    "rgba(59, 130, 246, 0.8)", // Blue
    "rgba(16, 185, 129, 0.8)", // Green
    "rgba(245, 101, 101, 0.8)", // Red
    "rgba(251, 191, 36, 0.8)", // Yellow
    "rgba(139, 92, 246, 0.8)", // Purple
    "rgba(236, 72, 153, 0.8)", // Pink
  ];

  const borderColors = [
    "rgba(59, 130, 246, 1)",
    "rgba(16, 185, 129, 1)",
    "rgba(245, 101, 101, 1)",
    "rgba(251, 191, 36, 1)",
    "rgba(139, 92, 246, 1)",
    "rgba(236, 72, 153, 1)",
  ];

  const chartData = {
    labels: data?.labels ?? [],
    datasets: data?.datasets?.map((dataset, index) => ({
      label: dataset?.label,
      data: dataset?.data,
      backgroundColor:
        type === "line"
          ? "rgba(59, 130, 246, 0.1)"
          : colors[index % colors.length],
      borderColor: borderColors[index % borderColors.length],
      borderWidth: type === "line" ? 3 : 2,
      fill: type === "line",
      tension: type === "line" ? 0.4 : 0,
      pointBackgroundColor:
        type === "line" ? borderColors[index % borderColors.length] : undefined,
      pointBorderColor: type === "line" ? "#fff" : undefined,
      pointBorderWidth: type === "line" ? 2 : undefined,
      pointRadius: type === "line" ? 6 : undefined,
      pointHoverRadius: type === "line" ? 8 : undefined,
      borderRadius: type === "bar" ? 8 : undefined,
      borderSkipped: type === "bar" ? false : undefined,
    })),
  };

  const options: ChartOptions<"line" | "bar"> = {
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

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <Bar
            data={chartData as any}
            options={options as ChartOptions<"bar">}
          />
        );
      default:
        return (
          <Line
            data={chartData as any}
            options={options as ChartOptions<"line">}
          />
        );
    }
  };

  return <div className={`w-full ${height} ${className}`}>{renderChart()}</div>;
};

export default GeneralChart;
