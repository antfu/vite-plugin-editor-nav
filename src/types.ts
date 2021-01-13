import { ResolvedConfig } from 'vite'

export type FileRouteMap = { filepath: string; route: string }[]

/**
 * Plugin options.
 */
export interface Options {
  /**
   * Path of editor states
   * @default '.vscode/.as-fs'
   */
  editorStatePath?: string

  getFileRouteMap(config: ResolvedConfig): FileRouteMap | Promise<FileRouteMap>

  clientCode: string
}

export type PresetNames = 'vue-router' | 'vitepress'

export interface PresetUserOptions {
  routeBase?: string
  extensions?: string[]
}

export interface UserOptions extends Partial<Options>, PresetUserOptions {
  preset?: PresetNames
}

export type ResolvedOptions = Required<Options>
