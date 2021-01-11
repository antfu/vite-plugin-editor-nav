import { resolve, parse, join } from 'path'
import fg from 'fast-glob'
import { Options } from '../types'

const options: Options = {
  async getFileRouteMap(config) {
    const files = await fg('**/*.{js,md,vue}', {
      onlyFiles: true,
      cwd: config.root,
    })

    return files.map((f) => {
      const { dir, name } = parse(f)
      return [resolve(config.root, f), join(dir, name).replace(/\/index$/, '/')]
    })
  },

  clientCode: `
export default function(router) {
  if (!import.meta.hot)
    return
  import.meta.hot.on('plugin-vscode-nav', (data) => {
    console.log('vscode-nav:data', data)
    if (data.to) {
      router.go(data.to)
    }
  })
}`,
}

export default options
