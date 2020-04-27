# CREATE WINSTON DEBUG

Create a debug function similar to the [`debug`](https://www.npmjs.com/package/debug) package, but using the Winston Console Transport

### Installation

```
yarn add create-winston-debug
```

### Usage

1. Create a dedicated module to avoid pass your specific configuration to the library.

```js
// src/debug.js
import { createDebug as _createDebug } from 'create-debug'

const configuration = {
  prefix: 'myapp',
  rootDir: 'dist', // I assuming that you're using Babel
  debug: 'myapp:*', // default is process.env.DEBUG
}

export function createDebug(module) {
  return _createDebug(module, configuration)
}
```

2. Use the above module in your base code such as here:

```js
// src/some/path/foo.js
import { createDebug } from '~/debug'

const debug = createDebug(module)

debug('Hello There')
```

3. You will see the log in your terminal:

```sh
[myapp:some:path:foo] 2020-04-27T21:20:48.571+00:00: Hello There +0ms
```
