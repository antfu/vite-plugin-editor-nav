import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Nav from 'vite-plugin-editor-nav'
import Voie from 'vite-plugin-voie'

const config: UserConfig = {
  plugins: [
    Vue(),
    Voie(),
    Nav({
      preset: 'vue-router',
    }),
  ],
}

export default config
