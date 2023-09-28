import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'

export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      open: true,
      proxy: {
        '/proxy': {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY === 'true',
          rewrite: path => path.replace(/\/proxy/, ''),
        },
      },
    },
    build: {
      outDir: mode === 'production' ? 'dist' : `dist-${mode}`,
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
    },
    /** 混淆器 */
    esbuild: {
      /** 打包时移除 console.log */
      pure: ['console.log'],
      /** 打包时移除 debugger */
      drop: ['debugger'],
      /** 打包时移除所有注释 */
      legalComments: 'none',
    },
    plugins: createVitePlugins(env, command === 'build'),
  })
}
