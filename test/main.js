var Jchart = require('../');
var imagediff = require('imagediff');
var Canvas = require('../node_modules/imagediff/node_modules/canvas/index.js');
var should = require('should');
var fs = require('fs');
var line_canvas, bar_canvas, pie_canvas;

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

function loadImage (url, callback) {
  var image = new Canvas.Image();
  fs.readFile(url, function (error, data) {
    if (error) throw error;
    image.onload = function () {
      callback(image);
    };
    image.onerror = function () {
      throw 'Error loading image buffer.'
    };
    image.src = data;
  });
  return image;
}

describe('API', function(){

  it('For Node.js', function(done){
    Jchart.should.be.Function;
    Jchart.line.should.be.Function;
    Jchart.bar.should.be.Function;
    Jchart.prototype.scaleRatio.should.be.Function;
    Jchart.prototype.httpOut.should.be.Function;
    // build chart
    var canvas = new Canvas(1, 1);
    var jittaScoreChart = new Jchart(canvas, {}, {});
    jittaScoreChart.canvas.should.be.Canvas;
    jittaScoreChart.ctx.should.be.Object;
    done()
  });

});

describe('Line Chart', function(){

  it('Use Jchart', function(done){
    // build chart
    var line_data = {"data":[{"name":"SABINA Price","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,9.8,12.5,12.2,12.8,12.2,12.4,12.1,12.2,12.3,12.5,12.5,12.8,13.9,13.7,15.2,17.1,16.9,21.2,20.6,21.7,21.6,21.7,22.3,20.9,22.3,24,22.7,22.1,22.1,22.1,22.3,22.5,21.8,22.3,21.9,22.3,22.1,22.4,22.3,22.3,22.1,22.4,22.4,22.2,22.3,22.2,22.1,22.3,22.3,22.5,23,22.2,24.2,23.3,22.6,24.2,22.8,23.5,22.9,23,23.3,22.9,23.6,23.5,24.1,23.7,22.9,22.4,23,23.3,23.5,23.1,23.5,23.4,23,22.7,23.1,null,null,null],"style":{"line":"solid","lineWidth":3,"color":"#47C6F1"}},{"name":"Jitta Line","type":"line","data":[null,14.707,13.986,13.264,12.543,11.821,11.1,10.378,9.657,8.935,8.214,7.492,6.771,6.799,6.827,6.855,6.883,6.912,6.94,6.968,6.996,7.024,7.052,7.081,7.109,6.781,6.453,6.125,5.798,5.47,5.142,4.814,4.486,4.159,3.831,3.503,3.175,3.147,3.118,3.09,3.061,3.033,3.004,2.976,2.947,2.919,2.89,2.862,2.833,2.863,2.892,2.922,2.952,2.981,3.011,3.041,3.07,3.1,3.13,3.159,3.189,3.262,3.336,3.409,3.483,3.557,3.63,3.704,3.777,3.851,3.924,3.998,4.071,4.136,4.2,4.265,4.329,4.394,4.458,4.523,4.588,4.652,4.717,4.781,4.846,4.925,5.004,5.083,5.162,5.242,5.321,5.4,5.479,5.558,5.638,5.717,5.796],"style":{"line":"dashed","lineWidth":2,"color":"rgba(0,0,0,0.7)"}},{"name":"Jitta line extend","type":"line","data":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"style":{"line":"dashed","color":"#C93"}}],"ipo_index":17};
    var line_options = { chart: { width: 800, height: 290 },
      xAxis: 
       { data: [ 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014 ],
         label: { align: 'center' } },
      yAxis: { min: 0, label: { align: 'left' } },
      legend: { enable: false } };

    line_canvas = new Canvas(line_options.chart.width, line_options.chart.height);
    new Jchart.line(line_canvas, line_data.data, line_options, line_data.ipo_index);
    done();
  });

  it('Write Base64 to file', function(done){
    var imageBuffer = decodeBase64Image(line_canvas.toDataURL());
    fs.writeFile(__dirname + '/images/test_line_chart.png', imageBuffer.data, done);
  });

  it('Compare with line_chart.png', function(done){
    loadImage(__dirname + '/images/test_line_chart.png', function (b) {
      loadImage(__dirname + '/images/line_chart.png', function (a) {
        var aData = imagediff.toImageData(a),
            bData = imagediff.toImageData(b),
            equal = imagediff.equal(a, b, 10);
        equal.should.be.ok;
        done();
      });
    });
  });

});

describe('Bar Chart', function(){

  it('Use Jchart', function(done){
    // build chart
    var score_data = {"data":[{"name":"Jitta Score 2008 - Present","type":"column","style":{"columnWidth":"auto","color":"#47C6F1"},"data":[5.7,5.72,7.64,6.91,7.58,7.15,7.05],"caption":true},{"type":"column","style":{"columnWidth":"auto","color":"#09C"},"data":[null,null,null,null,null,null,7.05],"caption":true,"legend":false}]}
    var score_options = { chart: { width: 800, height: 336 },
    xAxis: 
     { grid: { enable: false },
       tick: { align: 'center' },
       label: { align: 'center' },
       data: [ '2008', '2009', '2010', '2011', '2012', '2013', 'Present' ] },
    yAxis: { min: 0, max: 10 },
    legend: { enable: true } };

    bar_canvas = new Canvas(score_options.chart.width, score_options.chart.height);
    new Jchart.bar(bar_canvas, score_data.data, score_options);
    done();
  });

  it('Write Base64 to file', function(done){
    var imageBuffer = decodeBase64Image(bar_canvas.toDataURL());
    fs.writeFile(__dirname + '/images/test_bar_chart.png', imageBuffer.data, done);
  });

  it('Compare with line_chart.png', function(done){
    loadImage(__dirname + '/images/test_bar_chart.png', function (b) {
      loadImage(__dirname + '/images/bar_chart.png', function (a) {
        var aData = imagediff.toImageData(a),
            bData = imagediff.toImageData(b),
            equal = imagediff.equal(a, b, 10);
        equal.should.be.ok;
        done();
      });
    });
  });

});

describe('Pie Chart', function(){

  it('Use Jchart', function(done){
    
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

    pie_canvas = new Canvas(pie_options.chart.width, pie_options.chart.height);
    new Jchart.pie(pie_canvas, pie_data, pie_options);
    done();

  });

  it('Write Base64 to file', function(done){
    var imageBuffer = decodeBase64Image(pie_canvas.toDataURL());
    fs.writeFile(__dirname + '/images/test_pie_chart.png', imageBuffer.data, done);
  });


});