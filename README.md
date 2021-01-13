<h2 align='center'>vite-plugin-editor-nav</h2>

<p align='center'>Auto-navigation to the page your are working in your editor for Vite</p>

<p align='center'>
<a href='https://www.npmjs.com/package/vite-plugin-editor-nav'>
<img src='https://img.shields.io/npm/v/vite-plugin-editor-nav?color=222'>
</a>
</p>

<p align='center'>
<img src='./screenshots/demo.gif'>
</p>

<br>

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

<br>

## Install

> ℹ️ **Vite 2 is required**

```bash
npm i vite-plugin-editor-nav -D # yarn add vite-plugin-editor-nav -D
```

> This is a tool for DX and only works in `dev` mode.

## Configration

### Editors

<details>
<summary>VS Code</summary>
<br>

Install [VSCode as FS](https://marketplace.visualstudio.com/items?itemName=antfu.as-fs) extension and add this to your `.vscode/settings.json`

```jsonc
// .vscode/settings.json
{
  "as-fs.enabled": true
}
```

See more details on [the readme page](https://github.com/antfu/vscode-as-fs).
</details>

### Vite

<details>
<summary>Vue Router</summary>
<br>

Recommend to use [vite-plugin-voie](https://github.com/brattonross/vite-plugin-voie) for file-based routing.

```js
// vite.config.js
import Vue from '@vitejs/plugin-vue'
import EditorNav from 'vite-plugin-editor-nav'

export default {
  plugins: [
    Vue(),
    EditorNav({
      preset: 'vue-router',
      routeBase: 'src/pages', // related to your Vite root,
    })
  ]
}
```

Then add this to your `main.js`

```js
// main.js
import { createApp } from 'vue'
import { createRouter } from 'vue-router'

/*...*/

const router = createRouter({ /*...*/ })
const app = createApp( /*...*/ )

app.use(router)

// pass the vue-router instance to it
import('vite-plugin-editor-nav/client').then(i => i.default(router))
```

</details>
<br>

<details>
<summary>Vitepress</summary>
<br>

Vitepress uses a custom router and has `@vite/plugin-vue` already embedded. All you need is

```js
// vite.config.js
import EditorNav from 'vite-plugin-editor-nav'

export default {
  plugins: [
    EditorNav({
      preset: 'vitepress',
    })
  ]
}
```

Then add this to `.vitepress/theme/config.js`

```js
// .vitepress/theme/config.js
import DefaultTheme from 'vitepress/dist/client/theme-default'

export default {
  ...DefaultTheme
  enhanceApp({ app, router }) {
    // this
    import('vite-plugin-editor-nav/client').then(i => i.default(router))
  },
}
```

</details>

<br>
<details>
<summary>React</summary>
<br>
Not supported yet, PR welcome!

</details>

## License

MIT License © 2021 [Anthony Fu](https://github.com/antfu)
