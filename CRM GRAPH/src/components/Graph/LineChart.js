import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const LineChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Desktops",
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Price Trends by Days",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "28",
          "29",
          "30",
        ],
      },
    },
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const data = response.data?.products;
      console.log(data);
      // Assuming the data contains a property named 'data' which is an array
      const newData = {
        ...chartData,
        series: [
          {
            name: "Desktops",
            data: data.map((item) => item.price), // Adjust this based on your actual data structure
          },
        ],
      };

      setChartData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
        <div className="col-md-12">
          <div id="chart ">
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="line"
              height={350}
            />
          </div>
      </div>
  );
};

export default LineChart;
