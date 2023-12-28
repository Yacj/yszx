// vite.config.ts
import path2 from "node:path";
import { defineConfig, loadEnv } from "file:///D:/project/yszxWeb/node_modules/.pnpm/vite@5.0.10_@types+node@20.10.5_sass@1.69.5/node_modules/vite/dist/node/index.js";

// vite/plugins/index.ts
import path from "node:path";
import process2 from "node:process";
import Unocss from "file:///D:/project/yszxWeb/node_modules/.pnpm/unocss@0.58.0_postcss@8.4.31_vite@5.0.10/node_modules/unocss/dist/vite.mjs";
import Pages from "file:///D:/project/yszxWeb/node_modules/.pnpm/vite-plugin-pages@0.32.0_@vue+compiler-sfc@3.3.9_vite@5.0.10/node_modules/vite-plugin-pages/dist/index.js";
import Components from "file:///D:/project/yszxWeb/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.3.13/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///D:/project/yszxWeb/node_modules/.pnpm/unplugin-auto-import@0.17.2_@vueuse+core@10.7.0/node_modules/unplugin-auto-import/dist/vite.js";
import Vue from "file:///D:/project/yszxWeb/node_modules/.pnpm/@vitejs+plugin-vue@5.0.0_vite@5.0.10_vue@3.3.13/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/project/yszxWeb/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-svg-icons@2.0.1_vite@5.0.10/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { TDesignResolver } from "file:///D:/project/yszxWeb/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.3.13/node_modules/unplugin-vue-components/dist/resolvers.js";
function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [
    Vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core"
      ],
      dts: true,
      dirs: [
        "./src/hooks"
      ],
      vueTemplate: true,
      resolvers: [
        TDesignResolver({
          library: "vue-next"
        })
      ]
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      dirs: ["src/components"],
      // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      resolvers: [
        TDesignResolver({
          library: "vue-next"
        })
      ]
    }),
    // https://github.com/antfu/unocss
    Unocss(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process2.cwd(), "src/assets/icons/")],
      symbolId: "icon-[dir]-[name]",
      svgoOptions: isBuild
    })
  ];
  if (isBuild) {
  }
  return vitePlugins;
}

// vite.config.ts
var __vite_injected_original_dirname = "D:\\project\\yszxWeb";
var vite_config_default = ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: "./",
    resolve: {
      alias: {
        "@": path2.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      open: true,
      proxy: {
        "/proxy": {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === "serve" && env.VITE_OPEN_PROXY === "true",
          rewrite: (path3) => path3.replace(/\/proxy/, "")
        }
      }
    },
    build: {
      outDir: mode === "production" ? "dist" : `dist-${mode}`,
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true"
    },
    /** 混淆器 */
    esbuild: {
      /** 打包时移除 console.log */
      pure: ["console.log"],
      /** 打包时移除 debugger */
      drop: ["debugger"],
      /** 打包时移除所有注释 */
      legalComments: "none"
    },
    plugins: createVitePlugins(env, command === "build")
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS9wbHVnaW5zL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFx5c3p4V2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHlzenhXZWJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3QveXN6eFdlYi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgY3JlYXRlVml0ZVBsdWdpbnMgZnJvbSAnLi92aXRlL3BsdWdpbnMnXG5cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUsIGNvbW1hbmQgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIGJhc2U6ICcuLycsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBwcm94eToge1xuICAgICAgICAnL3Byb3h5Jzoge1xuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfQVBQX0FQSV9CQVNFVVJMLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogY29tbWFuZCA9PT0gJ3NlcnZlJyAmJiBlbnYuVklURV9PUEVOX1BST1hZID09PSAndHJ1ZScsXG4gICAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL1xcL3Byb3h5LywgJycpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyA/ICdkaXN0JyA6IGBkaXN0LSR7bW9kZX1gLFxuICAgICAgc291cmNlbWFwOiBlbnYuVklURV9CVUlMRF9TT1VSQ0VNQVAgPT09ICd0cnVlJyxcbiAgICB9LFxuICAgIC8qKiBcdTZERjdcdTZEQzZcdTU2NjggKi9cbiAgICBlc2J1aWxkOiB7XG4gICAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU3OUZCXHU5NjY0IGNvbnNvbGUubG9nICovXG4gICAgICBwdXJlOiBbJ2NvbnNvbGUubG9nJ10sXG4gICAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU3OUZCXHU5NjY0IGRlYnVnZ2VyICovXG4gICAgICBkcm9wOiBbJ2RlYnVnZ2VyJ10sXG4gICAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU3OUZCXHU5NjY0XHU2MjQwXHU2NzA5XHU2Q0U4XHU5MUNBICovXG4gICAgICBsZWdhbENvbW1lbnRzOiAnbm9uZScsXG4gICAgfSxcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyhlbnYsIGNvbW1hbmQgPT09ICdidWlsZCcpLFxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHlzenhXZWJcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHlzenhXZWJcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L3lzenhXZWIvdml0ZS9wbHVnaW5zL2luZGV4LnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IHZpc3VhbGl6ZXIgZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbmltcG9ydCB7IFREZXNpZ25SZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnModml0ZUVudjogb2JqZWN0LCBpc0J1aWxkID0gZmFsc2UpIHtcbiAgY29uc3Qgdml0ZVBsdWdpbnM6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9IFtcbiAgICBWdWUoKSxcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaGFubm9lcnUvdml0ZS1wbHVnaW4tcGFnZXNcbiAgICBQYWdlcygpLFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi1hdXRvLWltcG9ydFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgIF0sXG4gICAgICBkdHM6IHRydWUsXG4gICAgICBkaXJzOiBbXG4gICAgICAgICcuL3NyYy9ob29rcycsXG4gICAgICBdLFxuICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgVERlc2lnblJlc29sdmVyKHtcbiAgICAgICAgICBsaWJyYXJ5OiAndnVlLW5leHQnLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSksXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtcGx1Z2luLWNvbXBvbmVudHNcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGR0czogdHJ1ZSxcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSwgLy8gXHU5MTREXHU3RjZFXHU5NzAwXHU4OTgxXHU5RUQ4XHU4QkE0XHU1QkZDXHU1MTY1XHU3Njg0XHU4MUVBXHU1QjlBXHU0RTQ5XHU3RUM0XHU0RUY2XHU2NTg3XHU0RUY2XHU1OTM5XHVGRjBDXHU4QkU1XHU2NTg3XHU0RUY2XHU1OTM5XHU0RTBCXHU3Njg0XHU2MjQwXHU2NzA5XHU3RUM0XHU0RUY2XHU5MEZEXHU0RjFBXHU4MUVBXHU1MkE4IGltcG9ydFxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC50c3gkL10sXG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgVERlc2lnblJlc29sdmVyKHtcbiAgICAgICAgICBsaWJyYXJ5OiAndnVlLW5leHQnLFxuICAgICAgICB9KV0sXG4gICAgfSksXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3Vub2Nzc1xuICAgIFVub2NzcygpLFxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zLycpXSxcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgICAgc3Znb09wdGlvbnM6IGlzQnVpbGQsXG4gICAgfSksXG4gIF1cbiAgaWYgKGlzQnVpbGQpIHtcblxuICB9XG4gIHJldHVybiB2aXRlUGx1Z2luc1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4TyxPQUFPQSxXQUFVO0FBQy9QLFNBQVMsY0FBYyxlQUFlOzs7QUNEdU8sT0FBTyxVQUFVO0FBQzlSLE9BQU9DLGNBQWE7QUFDcEIsT0FBTyxZQUFZO0FBRW5CLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUV2QixPQUFPLFNBQVM7QUFDaEIsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyx1QkFBdUI7QUFFakIsU0FBUixrQkFBbUMsU0FBaUIsVUFBVSxPQUFPO0FBQzFFLFFBQU0sY0FBaUQ7QUFBQSxJQUNyRCxJQUFJO0FBQUE7QUFBQSxJQUVKLE1BQU07QUFBQTtBQUFBLElBRU4sV0FBVztBQUFBLE1BQ1QsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxRQUNKO0FBQUEsTUFDRjtBQUFBLE1BQ0EsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLFFBQ1QsZ0JBQWdCO0FBQUEsVUFDZCxTQUFTO0FBQUEsUUFDWCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQztBQUFBO0FBQUEsSUFFRCxXQUFXO0FBQUEsTUFDVCxLQUFLO0FBQUEsTUFDTCxNQUFNLENBQUMsZ0JBQWdCO0FBQUE7QUFBQSxNQUN2QixTQUFTLENBQUMsVUFBVSxjQUFjLFFBQVE7QUFBQSxNQUMxQyxXQUFXO0FBQUEsUUFDVCxnQkFBZ0I7QUFBQSxVQUNkLFNBQVM7QUFBQSxRQUNYLENBQUM7QUFBQSxNQUFDO0FBQUEsSUFDTixDQUFDO0FBQUE7QUFBQSxJQUVELE9BQU87QUFBQSxJQUNQLHFCQUFxQjtBQUFBLE1BQ25CLFVBQVUsQ0FBQyxLQUFLLFFBQVFDLFNBQVEsSUFBSSxHQUFHLG1CQUFtQixDQUFDO0FBQUEsTUFDM0QsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLEVBQ0g7QUFDQSxNQUFJLFNBQVM7QUFBQSxFQUViO0FBQ0EsU0FBTztBQUNUOzs7QUR6REEsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxDQUFDLEVBQUUsTUFBTSxRQUFRLE1BQU07QUFDcEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUN2QyxTQUFPLGFBQWE7QUFBQSxJQUNsQixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLQyxNQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsVUFBVTtBQUFBLFVBQ1IsUUFBUSxJQUFJO0FBQUEsVUFDWixjQUFjLFlBQVksV0FBVyxJQUFJLG9CQUFvQjtBQUFBLFVBQzdELFNBQVMsQ0FBQUEsVUFBUUEsTUFBSyxRQUFRLFdBQVcsRUFBRTtBQUFBLFFBQzdDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVEsU0FBUyxlQUFlLFNBQVMsUUFBUSxJQUFJO0FBQUEsTUFDckQsV0FBVyxJQUFJLHlCQUF5QjtBQUFBLElBQzFDO0FBQUE7QUFBQSxJQUVBLFNBQVM7QUFBQTtBQUFBLE1BRVAsTUFBTSxDQUFDLGFBQWE7QUFBQTtBQUFBLE1BRXBCLE1BQU0sQ0FBQyxVQUFVO0FBQUE7QUFBQSxNQUVqQixlQUFlO0FBQUEsSUFDakI7QUFBQSxJQUNBLFNBQVMsa0JBQWtCLEtBQUssWUFBWSxPQUFPO0FBQUEsRUFDckQsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgInByb2Nlc3MiLCAicHJvY2VzcyIsICJwYXRoIl0KfQo=
