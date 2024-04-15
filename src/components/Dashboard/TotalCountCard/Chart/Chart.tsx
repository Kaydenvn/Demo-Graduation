import { Line } from "react-chartjs-2";
import "chart.js/auto";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem: any) {
        return tooltipItem.yLabel;
      },
    },
  },

  scales: {
    // to remove the labels
    x: {
      ticks: {
        display: false,
      },

      // to remove the x-axis grid
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    // to remove the y-axis labels
    y: {
      ticks: {
        display: false,
        beginAtZero: true,
      },
      // to remove the y-axis grid
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
  beginAtZero: true,
};

const Chart = () => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-start">New movie is released!</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div className="card-actions justify-end">
          <Line
            options={options}
            data={{
              labels: ["Jun", "Jul", "Aug"],
              datasets: [
                {
                  data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chart;
