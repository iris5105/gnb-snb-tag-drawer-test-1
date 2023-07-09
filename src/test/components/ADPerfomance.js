import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import ECharts from "echarts-for-react";

const AdPerformanceRange = ({ colors }) => {
  //선택된 기간에 대한 x축 data값 생성(일, 주, 월)
  const generateDates = (start, end, interval) => {
    const dates = [];
    const current = new Date(start);
    while (current < end) {
      dates.push(current.toLocaleDateString());
      if (interval === "day") {
        current.setDate(current.getDate() + 1);
      } else if (interval === "week") {
        current.setDate(current.getDate() + 7);
      } else if (interval === "month") {
        current.setMonth(current.getMonth() + 1);
      }
    }
    dates.push(end.toLocaleDateString()); // 마지막 날짜 포함
    return dates;
  };

  const [startDate, setStartDate] = useState(new Date("2023/04/20"));
  const [endDate, setEndDate] = useState(new Date("2023/06/01"));
  const [xdata, setXData] = useState(generateDates(startDate, endDate, "day"));
  const [selectedLine, setSelectedLine] = useState(["총 노출수", "비교지표"]);
  const [selectedBar, setSelectedBar] = useState(["총 클릭수", "기준지표"]);
  //데이터
  const chartdata = [
    {
      name: "총 노출수",
      value: [60, 50, 21, 58, 95, 77, 21],
    },
    {
      name: "총 클릭수",
      value: [10, 20, 81, 38, 95, 17, 81],
    },
    {
      name: "CTR",
      value: [40, 60, 84, 38, 55, 77, 40],
    },
    {
      name: "CPC",
      value: [50, 30, 24, 18, 35, 47, 60],
    },
  ];

  const category = ["기준지표", "비교지표"];

  const handlexDataChange = (e) => {
    const value = e.target.value;
    if (value === "day") {
      const dates = generateDates(startDate, endDate, "day");
      setXData(dates);
    } else if (value === "week") {
      const dates = generateDates(startDate, endDate, "week");
      setXData(dates);
    } else if (value === "month") {
      const dates = generateDates(startDate, endDate, "month");
      setXData(dates);
    }
  };

  const handleLineChange = (e) => {
    const newValue = e.target.value;
    setSelectedLine([newValue, "기준지표"]);
  };
  const handleBarChange = (e) => {
    const newValue = e.target.value;
    setSelectedBar([newValue, "비교지표"]);
  };

  const [options, setOptions] = useState({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: 50,
      right: 50,
      top: 10,
      bottom: 50,
    },
    color: colors,
    legend: {
      data: category,
      bottom: "bottom",
      icon: "circle",
      itemGap: 25,
    },
    xAxis: {
      type: "category",
      axisTick: {
        alignWithLabel: true,
      },
      data: xdata,
    },
    yAxis: [
      {
        type: "value",
        name: category[0],
        position: "right",
        alignTicks: true,
        axisLine: {
          show: true,
        },
      },
      {
        type: "value",
        name: category[1],
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
        },
      },
    ],
    series: [
      {
        name: category[0],
        type: "bar",
        barWidth: 30,
        data: chartdata.find((item) => item.name === selectedBar[0]).value,
        smooth: true,
      },

      {
        name: category[1],
        type: "line",
        yAxisIndex: 1,
        data: chartdata.find((item) => item.name === selectedLine[0]).value,
        symbol: "circle",
        symbolSize: 6,
      },
    ],
  });

  useEffect(() => {
    const updateOptions = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      grid: {
        left: 50,
        right: 50,
        top: 10,
        bottom: 50,
      },
      color: colors,
      legend: {
        data: category,
        bottom: "bottom",
        icon: "circle",
        itemGap: 25,
      },
      xAxis: {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        data: xdata,
      },
      yAxis: [
        {
          type: "value",
          name: category[0],
          position: "right",
          alignTicks: true,
          axisLine: {
            show: true,
          },
        },
        {
          type: "value",
          name: category[1],
          position: "left",
          alignTicks: true,
          axisLine: {
            show: true,
          },
        },
      ],
      series: [
        {
          name: category[0],
          type: "bar",
          barWidth: 30,
          data: chartdata.find((item) => item.name === selectedBar[0]).value,
          smooth: true,
        },

        {
          name: category[1],
          type: "line",
          yAxisIndex: 1,
          data: chartdata.find((item) => item.name === selectedLine[0]).value,
          symbol: "circle",
          symbolSize: 6,
        },
      ],
    };
    setOptions(updateOptions);
  }, [xdata, options]);

  // useEffect(() => {
  //   let newValue = null;
  //   const selectedData = chartdata.find(
  //     (item) => item.name === selectedLine[0]
  //   ).value;
  //   console.log("selectedLine", selectedLine);
  //   console.log("selectedData", selectedData);
  //   if (selectedData.length > 0) {
  //     console.log(1);
  //     const updatedOptions = { ...options };
  //     updatedOptions.series.forEach((series) => {
  //       if (series.name === selectedLine[1]) {
  //         console.log(2);
  //         series.data = selectedData;
  //       }
  //     });
  //     newValue = { ...updatedOptions };
  //     console.log("newvalue", newValue);
  //     setOptions(newValue);
  //   }
  // }, [selectedLine]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 20,
        }}
      >
        <div className="AdPerformanceDiv">
          <h4>기간별 광고 성과</h4>
          <table className="AdPerformanceTable">
            <tr>
              <th>Step 01. 기간 범위</th>
              <td>
                <Radio.Group defaultValue="day" onChange={handlexDataChange}>
                  <Radio.Button value="day">일별</Radio.Button>
                  <Radio.Button value="week">주별</Radio.Button>
                  <Radio.Button value="month">월별</Radio.Button>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th>Step 02. 기준 지표</th>
              <td>
                <Radio.Group
                  className="standard"
                  defaultValue="총 노출수"
                  onChange={handleLineChange}
                >
                  <Radio.Button value="총 노출수">총 노출수</Radio.Button>
                  <Radio.Button value="총 클릭수">총 클릭수</Radio.Button>
                  <Radio.Button value="CTR">CTR</Radio.Button>
                  <Radio.Button value="CPC">CPC</Radio.Button>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th>Step 03. 비교 지표</th>
              <td>
                <Radio.Group
                  className="compare"
                  defaultValue="총 클릭수"
                  onChange={handleBarChange}
                >
                  <Radio.Button value="총 노출수">총 노출수</Radio.Button>
                  <Radio.Button value="총 클릭수">총 클릭수</Radio.Button>
                  <Radio.Button value="CTR">CTR</Radio.Button>
                  <Radio.Button value="CPC">CPC</Radio.Button>
                </Radio.Group>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <ECharts option={options} notMerge={true} />
    </div>
  );
};

const AdPerformance = () => {
  const colors = [
    "#4180ec",
    "#4fd9bc",
    "#494e5f",
    "#30c7e9",
    "#6269e9",
    "#00aaaa",
    "#42c360",
    "#b5cf14",
    "#eaab2f",
    "#bababa",
  ].slice(0, 10);
  return (
    <>
      <AdPerformanceRange colors={colors} />
      {/* <LineChart colors={colors} /> */}
    </>
  );
};

export default AdPerformance;
