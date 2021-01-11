import { Options } from '../types'

const options: Options = {
  async getFileRouteMap(config) {
    return []
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

export default options
