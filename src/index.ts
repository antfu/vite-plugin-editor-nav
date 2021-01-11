import type { Plugin } from 'vite'
import { resolve, relative, join, parse } from 'path'
import { Options, ResolvedOptions } from './types'

const defaultOptions: ResolvedOptions = {
  router: 'vue',
  vscodeAsFsPath: '.vscode/.as-fs',
}

const ID = 'vite-plugin-vscode-nav/client'

function VitePluginComponents(options: Options = {}): Plugin {
  const config = Object.assign(options, defaultOptions) as ResolvedOptions

  const vscodeAsFsPath = resolve(config.vscodeAsFsPath)
  const root = join(process.cwd(), 'src/pages')

  return {
    name: 'vite-plugin-vscode-nav',

    async handleHotUpdate(ctx) {
      if (relative(vscodeAsFsPath, ctx.file) === 'current-tab/path') {
        const content = await ctx.read()
        const path = relative(root, content)
        if (!path.startsWith('.')) {
          const { dir, name } = parse(path)
          ctx.server.ws.send({
            type: 'custom',
            event: 'plugin-vscode-nav',
            data: {
              to: join(dir, name.toLowerCase())
            }
          })
        }
        console.log('to:', path.toLowerCase())
      }
    },

    resolveId(id) {
      return id === ID ? ID : null
    },

    load(id) {
      if (id !== ID)
        return null

  // TODO: support other router
      return `
export default function(router) {
  if (!import.meta.hot)
    return
  const routes = router.getRoutes()
  console.log('vscode-nav:routes', routes)
  import.meta.hot.on('plugin-vscode-nav', (data) => {
    console.log('vscode-nav:data', data )
    if (data.to) {
      router.push(data.to)
    }
  })
}`
    },
  }
}

export * from './types'
export default VitePluginComponents
