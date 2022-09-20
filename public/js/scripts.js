const form = document.getElementById("form");
const dataFromForm = document.getElementById("od-form");
const chart = document.querySelector(".chart");
const globalOption = document.getElementById("global");

const getWejsciaBramki = async (dataTime, global = false) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/wejscia/get",
      data: {
        data: dataTime,
        global,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dataFrom = dataFromForm.value.replace("T", " ");
  if (!new Boolean(dataFrom)) globalOption.checked = true;

  const wejscia = await getWejsciaBramki(dataFrom, globalOption.checked);
  drawChart(wejscia);
});

const addCanvas = () => {
  while (chart.firstChild) {
    chart.removeChild(chart.firstChild);
  }

  const chartCanvasMain = document.createElement("canvas");
  chartCanvasMain.id = "dataChart";
  chart.appendChild(chartCanvasMain);

  const chartCanvasSupport = document.createElement("canvas");
  chartCanvasSupport.id = "dataChartSupport";
  chart.appendChild(chartCanvasSupport);
};

const drawChart = (databaseData) => {
  addCanvas();
  const ctxMain = document.getElementById("dataChart").getContext("2d");
  const ctxSupport = document
    .getElementById("dataChartSupport")
    .getContext("2d");

  const dataMain = {
    labels: databaseData.labels,
    datasets: [
      {
        data: databaseData.dataIn,
        label: "IN",
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgb(0, 255, 0)",
      },
      {
        data: databaseData.dataOut,
        label: "OUT",
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgb(255, 0, 0)",
      },
      {
        data: databaseData.currentState,
        label: "INSIDE",
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgb(0, 0, 255)",
      },
    ],
  };

  const datasetSupport = Object.entries(databaseData.statBramka).map((el) => {
    return {
      data: [el[1].in, el[1].out],
      label: `Bramka ${el[0]}`,
      backgroundColor: `rgb(${Math.random() * 255},${Math.random() * 255}, ${
        Math.random() * 255
      })`,
    };
  });

  const dataSupport = {
    labels: ["in", "out"],
    datasets: datasetSupport,
  };

  const stackedLine = new Chart(ctxMain, {
    type: "line",
    data: dataMain,
    options: {
      scales: {
        y: {
          stacked: false,
        },
      },
    },
  });

  const barChart = new Chart(ctxSupport, {
    type: "bar",
    data: dataSupport,
    options: {
      scales: {
        y: {
          stacked: false,
        },
      },
    },
  });
};
