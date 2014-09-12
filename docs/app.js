;(function() {

  var line_data = {"data":[{"name":"BLA Price","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,14.9,14.5,14.8,17.3,22.4,23.6,23.8,22.7,23,27.25,29.75,33,31.25,27.5,29,30.75,28.5,32.5,35.5,35.75,48,46,52,56,42.75,43,50.5,46.25,49,45,48,46.75,46.75,47,46.25,44.5,44,42.25,50.5,62.25,69.75,65.25,74.75,75.75,65.5,64,59,56,61.5,63,62,68,61.5,64.5,68.75,70.75,82.25,88,93,84,86.75,null,null,null],"style":{"line":"solid","lineWidth":3,"color":"#47C6F1"}},{"name":"Jitta Line","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,9.471,9.519,9.566,9.614,9.661,9.709,9.756,9.804,9.852,9.899,9.947,9.994,10.094,10.194,10.294,10.394,10.494,10.594,10.694,10.794,10.894,10.994,11.094,11.194,12.58,13.965,15.351,16.737,18.122,19.508,20.893,22.279,23.664,25.05,26.436,27.821,29.036,30.251,31.466,32.68,33.895,35.11,36.325,37.54,38.755,39.97,41.184,42.399,42.274,42.148,42.022,41.897,41.771,41.646,41.52,41.394,41.269,41.143,41.018,40.892,42.003,43.115,44.226,45.337,46.448,47.559,48.671,49.782,50.893,52.004,53.116,54.227,52.871,51.516,50.16,48.804,47.449,46.093,44.737,43.382,42.026,40.67,39.315,37.959],"style":{"line":"dashed","lineWidth":2,"color":"rgba(0,0,0,0.7)"}},{"name":"Jitta line extend","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"style":{"line":"dashed","color":"#C93"}}]};

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
  new Jchart(line_canvas, line_data.data, line_options);



  var score_data = {"data":[{"name":"Jitta Score 2009 - Present","type":"column","style":{"columnWidth":"auto","color":"#47C6F1"},"data":[6.13,6.25,5.25,6.17,7.6,7.83],"caption":true},{"type":"column","style":{"columnWidth":"auto","color":"#09C"},"data":[null,null,null,null,null,7.83],"caption":true,"legend":false}]}

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
  new Jchart(score_canvas, score_data.data, score_options);

}.call(this));