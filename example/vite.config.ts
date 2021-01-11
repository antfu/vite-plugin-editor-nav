import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Nav from 'vite-plugin-vscode-nav'
import Voie from 'vite-plugin-voie'

const config: UserConfig = {
  plugins: [
    Vue(),
    Voie(),
    Nav({
      router: 'vue',
    }),
  ],
}

export default config
