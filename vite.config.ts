import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],   //可使用$ref{ refTransform: true }
   envDir: './',
envPrefix: ['VITE_','DZ_','APP_','VUE_'],
   
  server: {
    open: true,
    port: 9999,
    https: false,
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: 'https://test-multi.ch-etravel.com',
        /* 允许跨域 */
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {//添加别名
      '@': path.resolve(__dirname, 'src'),
      '@static': path.resolve(__dirname, 'src/static'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/index.scss";`,//引入全局样式
      },

    },
  }
});
