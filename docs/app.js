;(function() {

  var line_data = {"data":[{"name":"GGG Price","type":"line","data":[39.62,40.77,40.51,39.16,39.5,40.04,40.28,41.04,40.41,39.11,39.36,37.24,37.26,34.22,34.71,36.26,41.41,40.42,38.07,36.23,38.15,35.61,24.73,21.46,23.73,21.27,16.98,17.07,23.59,22.29,22.02,24.74,25.11,27.87,27.54,28.17,28.57,26.69,27.41,32,34.68,31.69,28.19,31.57,27.91,31.73,34.41,35.96,39.45,42.48,40.71,45.49,50.03,50.56,50.66,43.93,39.48,34.14,42.94,42.99,40.89,45.98,51.18,53.06,53.31,48.17,46.08,45.88,49.4,50.28,48.06,49.41,51.49,57.2,58.1,58.03,60.53,64.45,63.21,68.36,69.49,74.06,77.26,77.23,78.12,69.49,78.03,74.74,72.5,72.98,78.08,74.15,76.86,72.98,78.5,80.1,80.18,71.24,75.78,73.28,null,null,null,null,null,null,null,null,null],"style":{"line":"solid","lineWidth":3,"color":"#47C6F1"}},{"name":"Jitta Line","type":"line","data":[25.507,25.822,26.138,26.453,26.769,27.084,27.399,27.715,28.03,28.345,28.661,28.976,29.291,29.04,28.789,28.537,28.286,28.034,27.783,27.531,27.28,27.028,26.777,26.526,26.274,25.253,24.231,23.21,22.189,21.167,20.146,19.125,18.103,17.082,16.061,15.039,14.018,14.749,15.479,16.21,16.94,17.67,18.401,19.131,19.862,20.592,21.323,22.053,22.784,23.323,23.863,24.403,24.942,25.482,26.021,26.561,27.1,27.64,28.179,28.719,29.258,29.397,29.535,29.674,29.812,29.951,30.089,30.227,30.366,30.504,30.643,30.781,30.919,31.72,32.52,33.321,34.121,34.921,35.722,36.522,37.322,38.123,38.923,39.723,40.524,41.537,42.55,43.564,44.577,45.59,46.604,47.617,48.63,49.644,50.657,51.67,52.684,null,null,null,null,null,null,null,null,null,null,null,null],"style":{"line":"dashed","lineWidth":2,"color":"rgba(0,0,0,0.7)"}},{"name":"Jitta line extend","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,52.684,52.684,52.684,52.684,null,null,null,null,null,null,null,null,null],"style":{"line":"dashed","color":"#C93"}}],"ipo_index":null,"jitta_score":{"data":[8.5,8.5,8.5,8.5,8.2,8.2,8.2,8.5,8.5,8.5,8.25,8.25,8.25,8,8,8,8.05,8.05,8.05,8,8,8,6.35,6.35,6.35,5.95,5.95,5.95,5.4,5.4,5.4,5.4,5.4,5.4,4.2,4.2,4.2,4.45,4.45,4.45,4.65,4.65,4.65,4.67,4.67,4.67,6.15,6.15,6.15,6.15,6.15,6.15,6.4,6.4,6.4,6.4,6.4,6.4,7.15,7.15,7.15,7,7,7,7,7,7,7.05,7.05,7.05,6.05,6.05,6.05,7.15,7.15,7.15,7.33,7.33,7.33,7.33,7.33,7.33,8.45,8.45,8.45,8.2,8.2,8.2,8.25,8.25,8.25,8.65,8.65,8.65,8.85,8.85,8.85,8.85,8.85,8.85,null,null,null,null,null,null,null,null,null]},"labels":[2007,2008,2009,2010,2011,2012,2013,2014,2015]};

  var line_options = { chart: { width: 790, height: 200 / 790 * window.innerWidth },
    xAxis: 
     { data: line_data.labels,
       label: { align: 'center' } },
    yAxis: { min: 0, label: { align: 'left' } },
    legend: { enable: true , marginTop: 20} };

  var line_canvas = document.createElement('canvas');
  line_canvas.width = line_options.chart.width;
  line_canvas.height = line_options.chart.height;
  document.body.appendChild(line_canvas);
  var jittaLineChart = new Jchart.line(line_canvas, line_data.data, line_options, line_data.ipo_index);


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