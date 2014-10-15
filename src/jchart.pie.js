var JchartPie,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

JchartPie = (function(_super) {

  __extends(JchartPie, _super);

  function JchartPie(canvas, data, options) {
  
    this.canvas = canvas;
    this.data = data;
    this.options = options != null ? options : null;
    JchartPie.__super__.constructor.call(this, this.canvas, this.data, this.options);
    this.build();
  
  }

  JchartPie.prototype.build = function () {
  
    this.process();
    this.draw();
    this.events();
  
  };

  JchartPie.prototype.process = function (highlight) {
    
    var data = this.data;
    var all = 0;
    
    data.forEach(function(item) {
      all += item.value;
    });
    
    data.all = all;
    
    data.forEach(function(item, i) {

      var percent = (item.value * 100) / all;
      var degress = (percent * 360) / 100;
      data[i].percent = percent;
      data[i].degrees = degress;

      var color = hexToRgb(item.color);
      if ( highlight && color_meter(item.color.toLowerCase(), rgbToHex(highlight[0], highlight[1], highlight[2]).toLowerCase()) == 0) {
        data[i].rgb = 'rgba('+color.r+', '+color.g+', '+color.b+', 1.0)';
      }
      else {
        data[i].rgb = 'rgba('+color.r+', '+color.g+', '+color.b+', 0.7)';
      }
    
    });
    
    this.data = data;
    
    //console.log(this.data);
  
  };

  JchartPie.prototype.draw = function () {
    
    var ctx = this.ctx;
    var data = this.data;
    var options = this.options;
    var last = {
      degrees: 0,
      radians: 0
    };
    var radius = options.chart.width/2 - ( options.chart.paddingLeft + options.chart.paddingRight );

    data.forEach(function(item, i) {
      
      var degrees = item.degrees + last.degrees;
      //var xPoint = radius * Math.sin(0);
      //var yPoint = radius * Math.cos(0);
      var radians = (Math.PI / 180) * degrees;

      //console.log(degrees);

      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = item.rgb;
      ctx.lineWidth = 3;
      //console.log('last.radians: '+last.radians+' radians: '+radians);
      
      ctx.beginPath();

      ctx.arc(options.chart.width/2, options.chart.height/2, radius, last.radians, radians);
      //ctx.fill();
      ctx.stroke();

      ctx.lineTo(options.chart.width/2, options.chart.height/2);
      //this.ctx.lineTo(xPoint, yPoint);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      last.degrees = degrees;
      last.radians = radians;

    });
  
  };

  JchartPie.prototype.events = function () {
    var lastPixel;
    this.canvas.addEventListener('mousemove', (function (e) {
      var pixel = this.ctx.getImageData(e.x, e.y, 1,1).data;
      //console.log(rgbToHex(pixel[0], pixel[1], pixel[2]));
      if ( lastPixel == undefined || rgbToHex(pixel[0], pixel[1], pixel[2]) != rgbToHex(lastPixel[0], lastPixel[1], lastPixel[2])) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.process(pixel);
        this.draw();
      }
      lastPixel = pixel
    }).bind(this));
  
  };

  return JchartPie;

})(Jchart);

Jchart.pie = JchartPie;