;(function() {

  var line_data = {"data":[{"name":"MODERN Price","type":"line","data":[3.9,4.05,4.05,3.875,4.125,3.875,4,4.175,4.1,4.025,3.95,4,4,3.925,3.95,3.95,4.125,4.175,4,3.8,3.9,3.75,2.49,2.775,2.95,2.975,2.875,2.8,2.825,2.5,2.525,2.6,2.725,2.875,2.7,2.625,2.775,2.75,3.15,3.4,3.6,3.5,3.875,4.15,4.65,5.25,4.775,4.9,5.075,5,5.25,5.325,5.7,5.6,5.6,6.9,6.8,5.85,5.25,5.35,5.7,6,6.1,6.6,6.6,6,6.1,6.4,6.35,6.95,6.85,7.15,7.7,8.05,8.7,10.2,9.8,10.7,10.3,9.95,9.45,9.65,9.3,9,8.65,8.45,8.7,9.15,9.4,9.4,9.45,9.95,10,11.2,10.2,10.1,9.85,10,10,10,9.9,9.75,9.55,9.3,8.95,null,null,null,null],"style":{"line":"solid","lineWidth":3,"color":"#47C6F1"}},{"name":"Jitta Line","type":"line","data":[5.376,5.34,5.303,5.267,5.231,5.194,5.158,5.121,5.085,5.048,5.012,4.975,4.939,5.015,5.092,5.168,5.244,5.321,5.397,5.474,5.55,5.626,5.703,5.779,5.855,5.789,5.722,5.655,5.588,5.521,5.455,5.388,5.321,5.254,5.187,5.121,5.054,5.213,5.373,5.532,5.691,5.851,6.01,6.17,6.329,6.488,6.648,6.807,6.967,6.944,6.921,6.899,6.876,6.854,6.831,6.809,6.786,6.763,6.741,6.718,6.696,6.723,6.75,6.777,6.804,6.831,6.858,6.885,6.912,6.939,6.966,6.993,7.02,6.987,6.954,6.92,6.887,6.854,6.821,6.788,6.755,6.722,6.689,6.655,6.622,7.255,7.888,8.522,9.155,9.788,10.421,11.054,11.687,12.32,12.953,13.586,14.219,13.975,13.73,13.485,13.24,12.995,12.751,12.506,12.261,12.016,11.771,11.527,11.282],"style":{"line":"dashed","lineWidth":2,"color":"rgba(0,0,0,0.7)"}},{"name":"Jitta line extend","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"style":{"line":"dashed","color":"#C93"}}],"ipo_index":null,"jitta_score":{"data":[6.95,6.45,6.45,6.45,6.45,6.45,6.45,6.45,6.45,6.45,6.45,6.45,6.45,4.8,4.8,4.8,4.8,4.8,4.8,4.8,4.8,4.8,4.8,4.8,4.8,5.8,5.8,5.8,6.05,6.05,6.05,6.05,6.05,6.05,6.05,6.05,6.05,4.2,4.2,4.2,4.42,4.42,4.42,4.42,4.42,4.42,6.6,6.6,6.6,5.4,5.4,5.4,5.4,5.4,5.4,5.53,5.53,5.53,4.74,4.74,4.74,6,6,6,5.45,5.45,5.45,5.45,5.45,5.45,5,5,5,6.1,6.1,6.1,6.17,6.17,6.17,6.2,6.2,6.2,6.4,6.4,6.4,5.5,5.5,5.5,5.63,5.63,5.63,5.63,5.63,5.63,7.3,7.3,7.3,7.1,7.1,7.1,6.72,6.72,6.72,6.72,6.72,6.72,null,null,null]},"labels":[2007,2008,2009,2010,2011,2012,2013,2014,2015]};

  var line_options = { chart: { width: 790, height: 200 / 790 * window.innerWidth },
    xAxis: 
     { data: line_data.labels,
       label: { align: 'center' } },
    yAxis: { min: 0, max: null, label: { align: 'left' } },
    legend: { enable: true , marginTop: 20} };

  var line_canvas = document.createElement('canvas');
  line_canvas.width = line_options.chart.width;
  line_canvas.height = line_options.chart.height;
  document.body.appendChild(line_canvas);
  var jittaLineChart = new Jchart.line(line_canvas, line_data.data, line_options, line_data.ipo_index);
  console.log(jittaLineChart);

  var score_data = {"data":[{"name":"Jitta Score 2008 - Present","type":"column","style":{"columnWidth":"auto","color":"#47C6F1"},"data":[5.7,5.72,7.64,6.91,7.58,7.15,7.05],"caption":true},{"type":"column","style":{"columnWidth":"auto","color":"#09C"},"data":[null,null,null,null,null,null,7.05],"caption":true,"legend":false}]};

  var score_options = { chart: { width: 790, height: 200 / 790 * window.innerWidth },
  xAxis: 
   { grid: { enable: false },
     tick: { align: 'center' },
     label: { align: 'center' },
     data: [ '2008', '2009', '2010', '2011', '2012', '2013', 'Present' ] },
  yAxis: { min: 0, max: 10 },
  legend: { enable: true, marginTop: 20}, captionMargin: 4 };

  var score_canvas = document.createElement('canvas');
  score_canvas.width = score_options.chart.width;
  score_canvas.height = score_options.chart.height;
  document.body.appendChild(score_canvas);
  var jittaScoreChart = new Jchart.bar(score_canvas, score_data.data, score_options);

  var pie_data = [
    {
      value: 320,
      color: '#4FB4E7',
      highlight: '#FF5A5E',
      label: 'Red'
    },
    {
      value: 170,
      color: '#00BD9C',
      highlight: '#5AD3D1',
      label: 'Green'
    },
    {
      value: 230,
      color: '#FD726D',
      highlight: '#FFC870',
      label: 'Yellow'
    },
    {
      value: 30,
      color: '#CBE3DE',
      highlight: '#FFC870',
      label: 'Yellow'
    },
    {
      value: 100,
      color: '#FCE6B0',
      highlight: '#FFC870',
      label: 'Yellow'
    },
    {
      value: 170,
      color: '#595959',
      highlight: '#FFC870',
      label: 'Yellow'
    }
  ];

  var pie_options = { 
    chart: 
    { 
      width: 400, 
      height: 400 
    },
    legend: 
    { 
      enable: true, 
      marginTop: 20
    } 
  };

  var pie_canvas = document.createElement('canvas');
  pie_canvas.width = pie_options.chart.width;
  pie_canvas.height = pie_options.chart.height;
  document.body.appendChild(pie_canvas);
  var pieChart = new Jchart.pie(pie_canvas, pie_data, pie_options);

}.call(this));