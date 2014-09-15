
# JChart : Light-weight Javscript chart render on Server/Client by canvas

## Version 0.0.4

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

### Bower install
```
bower install jchart
```

### Preview (frontend)
- Open docs/index.html in browser.

### node.js usage
```javascript
var Jchart = require('jchart');
var canvas = require('canvas');
canvas = new canvas(width, height);
new Jchart(canvas, data, options);
```
