import { resolve, parse, join } from 'path'
import fg from 'fast-glob'
import { Options, PresetUserOptions } from '../types'
import { extensionsToGlob } from '../utils'

export default function({
  routeBase = '.',
  extensions = ['md'],
}: PresetUserOptions): Options {
  const ext = extensionsToGlob(extensions)

  return {
    async getFileRouteMap(config) {
      const cwd = resolve(config.root, routeBase)
      const files = await fg(`**/*.${ext}`, {
        onlyFiles: true,
        cwd,
      })

      return files.map((f) => {
        const { dir, name } = parse(f)
        return {
          filepath: resolve(cwd, f),
          route: `/${join(dir, name).replace(/\/index$/, '/')}`,
        }
      })
    },

    clientCode: `
export default function(router) {
  if (!import.meta.hot)
    return
  import.meta.hot.on('plugin-vscode-nav', (data) => {
    console.debug('vscode-nav:data', data)
    if (data.to) {
      router.go(data.to)
    }
  })
}`,
  }
}
