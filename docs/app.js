;(function() {

  var line_data = {"data":[{"name":"SABINA Price","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,9.8,12.5,12.2,12.8,12.2,12.4,12.1,12.2,12.3,12.5,12.5,12.8,13.9,13.7,15.2,17.1,16.9,21.2,20.6,21.7,21.6,21.7,22.3,20.9,22.3,24,22.7,22.1,22.1,22.1,22.3,22.5,21.8,22.3,21.9,22.3,22.1,22.4,22.3,22.3,22.1,22.4,22.4,22.2,22.3,22.2,22.1,22.3,22.3,22.5,23,22.2,24.2,23.3,22.6,24.2,22.8,23.5,22.9,23,23.3,22.9,23.6,23.5,24.1,23.7,22.9,22.4,23,23.3,23.5,23.1,23.5,23.4,23,22.7,23.1,null,null,null],"style":{"line":"solid","lineWidth":3,"color":"#47C6F1"}},{"name":"Jitta Line","type":"line","data":[null,14.707,13.986,13.264,12.543,11.821,11.1,10.378,9.657,8.935,8.214,7.492,6.771,6.799,6.827,6.855,6.883,6.912,6.94,6.968,6.996,7.024,7.052,7.081,7.109,6.781,6.453,6.125,5.798,5.47,5.142,4.814,4.486,4.159,3.831,3.503,3.175,3.147,3.118,3.09,3.061,3.033,3.004,2.976,2.947,2.919,2.89,2.862,2.833,2.863,2.892,2.922,2.952,2.981,3.011,3.041,3.07,3.1,3.13,3.159,3.189,3.262,3.336,3.409,3.483,3.557,3.63,3.704,3.777,3.851,3.924,3.998,4.071,4.136,4.2,4.265,4.329,4.394,4.458,4.523,4.588,4.652,4.717,4.781,4.846,4.925,5.004,5.083,5.162,5.242,5.321,5.4,5.479,5.558,5.638,5.717,5.796],"style":{"line":"dashed","lineWidth":2,"color":"rgba(0,0,0,0.7)"}},{"name":"Jitta line extend","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"style":{"line":"dashed","color":"#C93"}}],"ipo_index":17};

  var line_options = { chart: { width: 800, height: 290 },
    xAxis: 
     { data: [ 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014 ],
       label: { align: 'center' } },
    yAxis: { min: 0, label: { align: 'left' } },
    legend: { enable: false } };

  var line_canvas = document.createElement('canvas');
  line_canvas.width = line_options.chart.width;
  line_canvas.height = line_options.chart.height;
  document.body.appendChild(line_canvas);
  var jittaLineChart = new Jchart(line_canvas, line_data.data, line_options, line_data.ipo_index);


  var score_data = {"data":[{"name":"Jitta Score 2008 - Present","type":"column","style":{"columnWidth":"auto","color":"#47C6F1"},"data":[5.7,5.72,7.64,6.91,7.58,7.15,7.05],"caption":true},{"type":"column","style":{"columnWidth":"auto","color":"#09C"},"data":[null,null,null,null,null,null,7.05],"caption":true,"legend":false}]}

  var score_options = { chart: { width: 800, height: 336 },
  xAxis: 
   { grid: { enable: false },
     tick: { align: 'center' },
     label: { align: 'center' },
     data: [ '2008', '2009', '2010', '2011', '2012', '2013', 'Present' ] },
  yAxis: { min: 0, max: 10 },
  legend: { enable: true } };

  var score_canvas = document.createElement('canvas');
  score_canvas.width = score_options.chart.width;
  score_canvas.height = score_options.chart.height;
  document.body.appendChild(score_canvas);
  var jittaScoreChart = new Jchart(score_canvas, score_data.data, score_options);

}.call(this));