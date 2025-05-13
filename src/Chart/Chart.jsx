import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import styles from "./Chart.module.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const Chart = ({ products }) => {
  const colorCounts = {};
  const capacityCounts = {
    "64 GB": 0,
    "256 GB": 0,
    "128 GB": 0,
    "512 GB": 0,
  };

  products.forEach((product) => {
    const data = product.data || {};

    // Normalize color from various keys
    const color = data.color || data.Color || data["Strap Colour"];

    if (color) {
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    }

    // Normalize capacity from various keys
    const capacity = data.capacity || data["Capacity"] || data["capacity GB"];

    const formattedCapacity =
      typeof capacity === "number" ? `${capacity} GB` : capacity;

    if (capacityCounts.hasOwnProperty(formattedCapacity)) {
      capacityCounts[formattedCapacity]++;
    }
  });

  // Bar Chart Config
  const colorBarData = {
    labels: Object.keys(colorCounts),
    datasets: [
      {
        label: "Number of Products",
        data: Object.values(colorCounts),
        backgroundColor: "#26a69a",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    indexAxis: "x",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Distribution by Color",
        font: {
          size: 20,
          weight: "bold",
        },
        align: "start",
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  // Pie Chart Config
  const pieLabels = ["64 GB", "256 GB", "128 GB", "512 GB"];
  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        label: "Capacity",
        data: pieLabels.map((label) => capacityCounts[label]),
        backgroundColor: [
          "#e91e63", // 64 GB
          "#ffca28", // 256 GB
          "#2196f3", // 128 GB
          "#26a69a", // 512 GB
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: false,
          boxHeight: 10,
          boxWidth: 20, // RECTANGLE
          font: { size: 14, weight: "bold" },
        },
      },
      title: {
        display: true,
        text: "Product Distribution by Capacity",
        font: {
          size: 20,
          weight: "bold",
        },
        align: "center",
      },
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chartBlock}>
        <Bar data={colorBarData} options={barOptions} />
      </div>
      <div className={styles.chartBlock}>
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default Chart;
