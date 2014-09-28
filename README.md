# JChart
Light-weight Javscript chart render on Server/Client by canvas


## Preview
### Line Chart
![alt text](https://raw.githubusercontent.com/jitta/jchart/master/docs/line.png "Line Chart")
### Bar Chart
![alt text](https://raw.githubusercontent.com/jitta/jchart/master/docs/bar.png "Bar Chart")


## Development
```
nvm use 0.10
npm install
gulp watch
```

### Production
```
gulp dist
```

### Tagging git version for bower
```
git tag v0.0.4
git push origin v0.0.4
```

### Bower install
```
bower install jchart
```

## Frontend usage
### See code in docs/app.js


## Node.js usage
### Installation
Install via npm:
```sh
npm install jchart
```

### In your code
```javascript
var Jchart = require('jchart');
var canvas = require('canvas');
canvas = new canvas(width, height); 

// Chart Types

// Line Chart
new Jchart.line(canvas, data, options, ipo);

// Bar Chart
new Jchart.bar(canvas, data, options, ipo);
```
