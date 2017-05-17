
var line_data = {
  data: [{
    name: "Revenue",
    type: "line",
    data: {
      "2015-6":{
        value: 12000,
        formatted: "12,000"
      },
      "2015-9":{
        value: 35000,
        formatted: "50,000"
      },
      "2015-12":{
        value: 60000,
        formatted: "1,500,000"
      },
      "2016-3":{
        value: 65000,
        formatted: "1,100,000"
      }
    },
    style: {
      line: "solid",
      color: "#47C6F1",
      fill_area: false
    }
  }],
  labels: [2015], //at least include current year for object datas only.
};

var line_options = {
  chart: {
    width: 790,
    height: 200 / 790 * window.innerWidth,
    linePoint: {enable: true, size: 2, fill: '#000'}
  },
  xAxis: {
    data: line_data.labels,
    label: {
      align: 'center'
    }
  },
  yAxis: {
    scopedRange: true,
    breaks: 5,
    label: {
      align: 'left'
    }
  },
  legend: {
    enable: false
  }
};

var line_canvas = document.createElement('canvas');
line_canvas.width = line_options.chart.width;
line_canvas.height = line_options.chart.height;
document.body.appendChild(line_canvas);
var jittaLineChart = new Jchart.line(line_canvas, line_data.data, line_options, line_data.ipo_index, line_data.volume);
