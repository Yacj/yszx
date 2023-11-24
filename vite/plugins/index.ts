import path from 'node:path'
import process from 'node:process'
import Unocss from 'unocss/vite'
import type { PluginOption } from 'vite'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import visualizer from 'rollup-plugin-visualizer'
import Vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

export default function createVitePlugins(viteEnv: object, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    Vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/hooks',
      ],
      vueTemplate: true,
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        })],
    }),
    // https://github.com/antfu/unocss
    Unocss(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: isBuild,
    }),
  ]
  if (isBuild) {

  }
  return vitePlugins
}
