import { resolve, parse, join } from 'path'
import fg from 'fast-glob'
import { Options, PresetUserOptions } from '../types'
import { extensionsToGlob, notNull } from '../utils'

export default function({
  routeBase = 'src/pages',
  extensions = ['vue'],
}: PresetUserOptions): Options {
  const ext = extensionsToGlob(extensions)

  return {
    async getFileRouteMap(config) {
      const cwd = resolve(config.root, routeBase)
      const files = await fg(`**/*.${ext}`, {
        onlyFiles: true,
        cwd,
      })

      return files
        .map((f) => {
          // disable for dynamic routes
          if (f.includes('['))
            return null

          const { dir, name } = parse(f)
          return {
            filepath: resolve(cwd, f),
            route: `/${join(dir, name).replace(/\/index$/, '/')}`,
          }
        })
        .filter(notNull)
    },

    clientCode: `
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
}`,
  }
}
