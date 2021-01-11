import { ResolvedConfig } from 'vite'

export type FileRouteMap = [string, string][]

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

export interface UserOptions extends Partial<Options> {
  preset?: PresetNames
}

export type ResolvedOptions = Required<Options>
