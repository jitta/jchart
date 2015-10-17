
var score_data = {
  "data": [{
    "name": "Jitta Score 2008 - Present",
    "type": "column",
    "style": {
      "columnWidth": "auto",
      "color": "#47C6F1"
    },
    "data": [5.7, 5.72, 7.64, 6.91, 7.58, 7.15, 7.05],
    "caption": true
  }, {
    "type": "column",
    "style": {
      "columnWidth": "auto",
      "color": "#09C"
    },
    "data": [null, null, null, null, null, null, 7.05],
    "caption": true,
    "legend": false
  }]
};

var score_options = {
  chart: {
    width: 790,
    height: 200 / 790 * window.innerWidth
  },
  xAxis: {
    grid: {
      enable: false
    },
    tick: {
      align: 'center'
    },
    label: {
      align: 'center'
    },
    data: ['2008', '2009', '2010', '2011', '2012', '2013', 'Present']
  },
  yAxis: {
    min: 0,
    max: 10
  },
  legend: {
    enable: true,
    marginTop: 20
  },
  captionMargin: 4
};

var score_canvas = document.createElement('canvas');
score_canvas.width = score_options.chart.width;
score_canvas.height = score_options.chart.height;
document.body.appendChild(score_canvas);
var jittaScoreChart = new Jchart.bar(score_canvas, score_data.data, score_options);
