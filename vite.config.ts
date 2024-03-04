import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import AutoComponents from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    include: [
      /\.[tj]sx?$/,
      /\.vue$/,
      /\.vue\?vue/,
      /\.md$/,
    ],
    dirs: ['src', 'src/utils'],
    vueTemplate: true,
  }), AutoComponents({
    dirs: ['src/components']
  })],
})