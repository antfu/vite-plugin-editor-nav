import { Options, PresetNames } from '../types'
import VueRouter from './vue-router'
import VitePress from './vitepress'

const Presets: Record<PresetNames, Options> = {
  'vue-router': VueRouter,
  vitepress: VitePress,
}

export default Presets
