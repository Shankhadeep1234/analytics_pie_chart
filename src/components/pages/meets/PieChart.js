import React from "react";
import { Pie } from "react-chartjs-2";
function makeTitle(slug) {
  var words = slug.split("_");

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
}
const options = { maintainAspectRatio: false };
const PieChart = ({ data, title }) => {
  const [state, setState] = React.useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  });

  React.useEffect(() => {
    data.chartdata.map((o) => {
      if (o.browser) {
        state.labels.push(o.browser);
        state.datasets[0].data.push(o.count);
      }
      if (o.os) {
        state.labels.push(o.os);
        state.datasets[0].data.push(o.count);
      }
    });
    setState({ ...state });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className={`chart-items ${data.widthClass}`}>
      <Pie width={300} height={300} data={state} options={options} />
      {makeTitle(title)}
    </div>
  );
};

export default PieChart;
