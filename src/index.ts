import { resolve, relative } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import Debug from 'debug'
import { FileRouteMap, ResolvedOptions, UserOptions } from './types'
import Presets from './presets'

const debug = Debug('vite-plugin-editor-nav')

function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  const {
    preset = 'vue-router',
    editorStatePath = '.vscode/.as-fs',
    ...options
  } = userOptions

  return Object.assign(
    {},
    Presets[preset],
    options,
    {
      preset,
      editorStatePath: resolve(editorStatePath),
    },
  )
}

const ID = 'vite-plugin-editor-nav/client'

function VitePluginEditorNav(userOptions: UserOptions = {}): Plugin {
  const options = resolveOptions(userOptions)
  let config: ResolvedConfig
  let map: FileRouteMap
  let editorStatePath: string

  return {
    name: 'vite-plugin-editor-nav',
    enforce: 'pre',

    configResolved(_config) {
      config = _config
      editorStatePath = resolve(config.root, options.editorStatePath)
      debug('editorStatePath', editorStatePath)
    },

    async handleHotUpdate(ctx) {
      if (relative(editorStatePath, ctx.file) === 'current-tab/path') {
        map = await options.getFileRouteMap(config)
        debug('map', map)

        const currentTab = await ctx.read()
        const route = map.find(m => m[0] === currentTab)?.[1]
        debug('currentTab', currentTab)
        debug('route', route)

        if (route) {
          ctx.server.ws.send({
            type: 'custom',
            event: 'plugin-vscode-nav',
            data: {
              to: route,
            },
          })
        }
      }
    },

    resolveId(id) {
      return id === ID ? ID : null
    },

    load(id) {
      if (id !== ID)
        return null

      if (config.command === 'serve')
        return options.clientCode
      else
        return 'export default function() {}'
    },
  }
}

export * from './types'
export default VitePluginEditorNav
