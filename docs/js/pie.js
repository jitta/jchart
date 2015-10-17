
var pie_data = [{
  value: 320,
  color: '#4FB4E7',
  highlight: '#FF5A5E',
  label: 'Red'
}, {
  value: 170,
  color: '#00BD9C',
  highlight: '#5AD3D1',
  label: 'Green'
}, {
  value: 230,
  color: '#FD726D',
  highlight: '#FFC870',
  label: 'Yellow'
}, {
  value: 30,
  color: '#CBE3DE',
  highlight: '#FFC870',
  label: 'Yellow'
}, {
  value: 100,
  color: '#FCE6B0',
  highlight: '#FFC870',
  label: 'Yellow'
}, {
  value: 170,
  color: '#595959',
  highlight: '#FFC870',
  label: 'Yellow'
}];

var pie_options = {
  chart: {
    width: 400,
    height: 400
  },
  legend: {
    enable: true,
    marginTop: 20
  }
};

var pie_canvas = document.createElement('canvas');
pie_canvas.width = pie_options.chart.width;
pie_canvas.height = pie_options.chart.height;
document.body.appendChild(pie_canvas);
var pieChart = new Jchart.pie(pie_canvas, pie_data, pie_options);
