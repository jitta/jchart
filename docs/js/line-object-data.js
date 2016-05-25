
var line_data = {
  "data": [{
    "name": "Revenue",
    "type": "line",
    "data": {
      "2007-9":{
        "value":3.1443919773154465,
        "formatted":"3.14"
      },
      "2008-9":{
        "value":3.8563582843751787,
        "formatted":"3.86"
      },
      "2009-9":{
        "value":6.029157433763845,
        "formatted":"6.03"
      },
      "2010-9":{
        "value":10.172666291316466,
        "formatted":"10.17"
      },
      "2011-9":{
        "value":10.172666291316466,
        "formatted":"10.17"
      },
      "2012-9":{
        "value":16.641047671623053,
        "formatted":"16.64"
      },
      "2013-9":{
        "value":23.80546770713805,
        "formatted":"23.81"
      },
      "2014-9":{
        "value":27.152857677174055,
        "formatted":"27.15"
      },
      "2015-9":{
        "value":30.344234324234324,
        "formatted":"30.34"
      },
      "2016-1":{
        "value":32.344234324234324,
        "formatted":"32.34"
      }
    },
    "style": {
      "line": "dashed",
      "color": "#47C6F1",
      "fill_area": true
    }
  }, {
    "name": "Revenue",
    "type": "line",
    "data": {
      "2011-3": {
        "value": 5.421
      },
      "2012-4": {
        "value": 7.305
      },
      "2013-9": {
        "value": 10.029
      },
      "2014-3": {
        "value": 20.278
      },
      "2015-7": {
        "value": 0.000
      },
      "2016-2": {
        "value": 0.000
      }
    },
    "style": {
      "line": "dashed",
      "color": "#FDB928",
      "fill_area": true
    }
  }],
  "labels": [new Date().getFullYear()], //at least include current year for object datas only.
  "volume": {
    "color": "#79848F",
    "data": [ 49455,43365, 57735, 74221, 95010, 68689, 82843, 54340, 53187, 75813, 73112, 22688, 30169, 70812, 41553, 65122, 66078, 21695, 53838, 64048, 28719, 58503, 71045, 34345, 47652, 34629, 28922, 70654, 72662, 85978, 52528, 99857, 94296, null ]
  }
};

var line_options = {
  chart: {
    width: 790,
    height: 200 / 790 * window.innerWidth,
    stretch: true,
    linePoint: {enable: true, size: 5, fill: '#aaa'}
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
var jittaLineChart = new Jchart.line(line_canvas, line_data.data, line_options, line_data.ipo_index, line_data.volume);
