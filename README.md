# unplugin-moment-to-dayjs

[![NPM version](https://img.shields.io/npm/v/unplugin-moment-to-dayjs?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-moment-to-dayjs)

**Replace moment with dayjs, support use in vite, rollup, webpack**

## Installation

```bash
npm i unplugin-moment-to-dayjs
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import momentToDayjs from 'unplugin-moment-to-dayjs/vite'

export default defineConfig({
  plugins: [
    momentToDayjs({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import momentToDayjs from 'unplugin-moment-to-dayjs/rollup'

export default {
  plugins: [
    momentToDayjs({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-moment-to-dayjs/webpack')({ /* options */ }),
  ],
}
```

<br></details>


## Options

Please reference [antd-dayjs-webpack-plugin](https://github.com/ant-design/antd-dayjs-webpack-plugin)


## Examples

- [vite-ant-design-pro](https://github.com/Dunqing/vite-ant-design-pro/tree/main/playground)

## Thanks

- moment
- dayjs
- antd-dayjs-webpack-plugin
