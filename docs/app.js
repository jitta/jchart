;(function() {

  var line_data = {"data":[{"name":"QC7 Price","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0.13043475,0.24130428750000002,0.24130428750000002,0.213043425,0.2065216875,0.195652125,0.169565175,0.195652125,0.2586955875,0.23260863750000002,0.22826081250000002,0.22826081250000002,0.213043425,0.21739125,0.2499999375,0.256521675,0.28478253750000004,0.308695575,0.3652173,0.3630433875,0.3673912125,0.33913035,0.326086875,0.33695643750000004,0.334782525,0.334782525,0.35217382500000005,0.32826078750000004,0.3326086125,0.3239129625,0.30434775,0.334782525,0.326086875,0.3130434,0.30434775,0.28695645000000003,0.265217325,0.30434775,0.291304275,0.27826080000000003,0.26956515000000003,0.26956515000000003,0.2608695,0.23913037500000003,0.26956515000000003,0.2608695,0.265217325,0.26956515000000003,0.27826080000000003,0.291304275,0.308695575,0.35217382500000005,0.360869475,0.3826086,0.421739025,0.39565207500000005,0.4173912,0.4173912,0.413043375,0.40869555,0.425,0.415,0.53,0.545,0.58,0.785,0.94,0.72,0.88,0.78,null,null,null,null],"style":{"line":"solid","lineWidth":3,"color":"#47C6F1"}},{"name":"Jitta Line","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,0.513,0.514,0.516,0.518,0.519,0.521,0.523,0.524,0.526,0.527,0.529,0.531,0.493,0.455,0.418,0.38,0.343,0.305,0.267,0.23,0.192,0.155,0.117,0.079,0.08,0.081,null,0.082,0.083,null,0.084,0.085,0.086,null,0.087,0.088,0.089,0.09,0.092,0.093,0.095,0.096,0.097,0.099,0.1,0.101,0.103,0.104,0.105,0.107,0.108,0.109,0.11,0.111,0.113,0.114,0.115,0.116,0.117,0.119,null,null,null,null,0.12,null,null,null,0.121,null,null,null,0.123,0.125,0.127,0.13,0.132,0.134,0.136,0.138,0.14,0.142,0.144,0.146,0.15,0.154,0.157,0.161,0.165,0.168,0.172,0.175,0.179,0.183,0.186,0.19],"style":{"line":"dashed","lineWidth":2,"color":"rgba(0,0,0,0.7)"}},{"name":"Jitta line extend","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0.119,0.119,0.119,0.119,0.119,0.12,0.12,0.12,0.12,0.121,0.121,0.121,0.121,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"style":{"line":"dashed","color":"#C93"}}],"ipo_index":35,"jitta_score":{"data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,6.35,6.35,6.35,6.35,6.35,6.35,6.35,6.35,6.35,6.35,6.35,6.35,4.95,4.95,4.95,4.95,4.95,4.95,4.95,4.95,4.95,4.95,4.95,4.95,3.25,3.25,3.25,3.25,3.25,3.25,3.25,3.25,3.25,3.25,3.25,3.25,3.75,3.75,3.75,3.75,3.75,3.75,3.75,3.75,3.75,3.75,3.75,3.75,3.97,3.97,3.97,4.52,4.52,4.52,4.52,4.52,4.52,4.52,4.52,4.52,5.09,5.09,5.09,5.09,5.09,5.09,5.11,5.11,5.11,6.51,6.51,6.51,6.54,6.54,6.54,6.74,6.74,6.74,6.74,6.74,6.74,null,null,null]},"labels":[2007,2008,2009,2010,2011,2012,2013,2014,2015]};

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