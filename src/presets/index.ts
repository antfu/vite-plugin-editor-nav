import { Options, PresetNames, PresetUserOptions } from '../types'
import VueRouter from './vue-router'
import VitePress from './vitepress'

const Presets: Record<PresetNames, (options: PresetUserOptions) => Options> = {
  'vue-router': VueRouter,
  vitepress: VitePress,
}

export default Presets
