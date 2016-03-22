promisify-api
=============

Changes interface of asynchronous functions to [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Functions should be designed using [error-first callback pattern](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/).

## Installation

```bash
$ npm install promisify-api
```

## Usage

### `promisify(fn, ctx, _)`

Creates a wrapper function, which returns [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

```javascript
const fs = require('fs');
const resolve = require('path').resolve;
const promisify = require('promisify-api');

// the second argument (which is context) is optional
const readFile = promisify(fs.readFile, fs);

readFile(resolve('index.js'), 'utf8')
  .then(console.log)
  .catch(console.error);
```

Arguments:

- `fn (function)`: The original function.
- `ctx (*)`: Predefines execution context of the original function.
- `..._ (*)`: Possibility to provide additional arguments, that will be prepended to the function.

## License

> The MIT License
