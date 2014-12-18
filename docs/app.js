;(function() {

  var line_data = {"data":[{"name":"ORCL Price","type":"line","data":[17.14,17.16,16.43,18.13,18.8,19.38,19.71,19.12,20.28,21.65,22.17,20.18,22.58,20.55,18.8,19.56,20.85,22.84,21,21.53,21.93,20.31,18.29,16.09,17.73,16.83,15.54,18.07,19.34,19.59,21.42,22.13,21.88,20.84,21.1,22.08,24.53,23.06,24.65,25.71,25.8675,22.57,21.46,23.64,21.845,26.85,29.38,27.045,31.3,32.03,32.9,33.4325,35.96,34.22,32.91,30.58,28.07,28.74,32.77,31.35,25.65,28.21,29.255,29.16,29.4,26.47,29.7,30.2,31.65,31.46,31.08,32.175,33.32,35.51,34.24,32.33,32.78,33.78,30.71,32.35,31.86,33.17,33.5,35.29,38.26,36.9,39.11,40.91,40.88,42.02,40.53,40.39,41.53,40.64,null,null,null],"style":{"line":"solid","lineWidth":3,"color":"#47C6F1"}},{"name":"Jitta Line","type":"line","data":[9.318,9.504,9.691,9.877,10.064,10.251,10.52,10.79,11.06,11.33,11.6,11.87,12.14,12.409,12.679,12.949,13.219,13.489,13.827,14.166,14.504,14.843,15.181,15.52,15.858,16.197,16.535,16.874,17.212,17.55,17.688,17.825,17.963,18.1,18.237,18.375,18.512,18.65,18.787,18.924,19.062,19.199,19.798,20.397,20.996,21.595,22.194,22.793,23.392,23.99,24.589,25.188,25.787,26.386,26.855,27.323,27.792,28.26,28.729,29.198,29.666,30.135,30.603,31.072,31.541,32.009,32.428,32.847,33.266,33.684,34.103,34.522,34.941,35.36,35.779,36.197,36.616,37.035,37.06,37.085,37.109,37.134,37.159,37.184,37.208,37.233,37.258,37.283,37.307,37.332,null,null,null,null,null,null,null],"style":{"line":"dashed","lineWidth":2,"color":"rgba(0,0,0,0.7)"}},{"name":"Jitta line extend","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,37.332,37.332,37.332,37.332,37.332,null,null,null],"style":{"line":"dashed","color":"#C93"}}],"jitta_score":{"data":[6.53,6.3,6.3,6.3,6.55,6.55,6.55,6.78,6.78,6.78,6.8,6.8,6.8,6.55,6.55,6.55,6.55,6.55,6.55,6.75,6.75,6.75,6.65,6.65,6.65,7.2,7.2,7.2,7,7,7,6.75,6.75,6.75,6.8,6.8,6.8,7.08,7.08,7.08,7.4,7.4,7.4,7.53,7.53,7.53,7.55,7.55,7.55,7.04,7.04,7.04,7.9,7.9,7.9,7.92,7.92,7.92,8.15,8.15,8.15,8.1,8.1,8.1,7.85,7.85,7.85,7.58,7.58,7.58,7.85,7.85,7.85,7.8,7.8,7.8,8.15,8.15,8.15,8.13,8.13,8.13,8.07,8.07,8.07,7.95,7.95,7.95,8,8,8,8,8,8,null,null,null]},"ipo_index":null};

  var line_options = { chart: { width: 790, height: 200 / 790 * window.innerWidth },
    xAxis: 
     { data: [ 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014 ],
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