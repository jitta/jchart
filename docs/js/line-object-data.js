var line_data = {
  "data": [{
    "name": "Revenue",
    "type": "line",
    "data": {
      "2005-6": {
        "value": 0.57
      },
      "2007-6": {
        "value": 0.267
      },
      "2009-9": {
        "value": 0.785
      },
      "2013-6": {
        "value": 0.4173912
      },
      "2014-9": {
        "value": 0.326086875
      },
    },
    "style": {
      "line": "dashed",
      "color": "#C93"
    }
  }, {
    "name": "Revenue",
    "type": "line",
    "data": {
      "2008-3": {
        "value": 0.421
      },
      "2009-4": {
        "value": 0.305
      },
      "2011-9": {
        "value": 0.029
      },
      "2012-3": {
        "value": 0.278
      },
      "2013-7": {
        "value": 0.367
      },
    },
    "style": {
      "line": "dashed",
      "color": "#47C6F1"
    }
  }],
  "labels": [new Date().getFullYear()] //at least include current year for object datas only.
};

var line_options = {
  chart: {
    width: 790,
    height: 200 / 790 * window.innerWidth
  },
  xAxis: {
    data: line_data.labels,
    label: {
      align: 'center'
    }
  },
  yAxis: {
    min: 0,
    max: null,
    label: {
      align: 'left'
    }
  },
  legend: {
    enable: true,
    marginTop: 20
  }
};

var line_canvas = document.createElement('canvas');
line_canvas.width = line_options.chart.width;
line_canvas.height = line_options.chart.height;
document.body.appendChild(line_canvas);
var jittaLineChart = new Jchart.line(line_canvas, line_data.data, line_options, line_data.ipo_index);