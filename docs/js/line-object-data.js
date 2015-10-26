
var line_data = {
  "data": [{
    "name": "Revenue",
    "type": "line",
    "data": {
      "2006-9":{
        "value":3.1443919773154465,
        "formatted":"3.14"
      },
      "2007-9":{
        "value":3.8563582843751787,
        "formatted":"3.86"
      },
      "2008-9":{
        "value":6.029157433763845,
        "formatted":"6.03"
      },
      "2009-9":{
        "value":6.811789563728733,
        "formatted":"6.81"
      },
      "2010-9":{
        "value":10.172666291316466,
        "formatted":"10.17"
      },
      "2011-9":{
        "value":16.641047671623053,
        "formatted":"16.64"
      },
      "2012-9":{
        "value":23.80546770713805,
        "formatted":"23.81"
      },
      "2013-9":{
        "value":27.152857677174055,
        "formatted":"27.15"
      },
      "2014-9":{
        "value":null,
        "formatted":"- -"
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
        "value": 5.421
      },
      "2009-4": {
        "value": 7.305
      },
      "2011-9": {
        "value": 10.029
      },
      "2012-3": {
        "value": 20.278
      },
      "2013-7": {
        "value": 25.367
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
