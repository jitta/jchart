# JChart
Light-weight Javscript chart render on Server/Client by canvas

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

### Preview (frontend)
- Open docs/index.html in browser.

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
new Jchart(canvas, data, options, ipo);
```
