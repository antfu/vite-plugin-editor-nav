/**
 * Plugin options.
 */
export interface Options {
  /**
   * Support router
   * @default 'vue'
   */
  router?: 'vue'

  /**
   * Path of vscode-as-fs
   * @default '.vscode/.as-fs'
   */
  vscodeAsFsPath?: string
}

export type ResolvedOptions = Required<Options>
