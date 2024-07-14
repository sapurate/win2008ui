import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    host: '0.0.0.0',
    open: false,
    proxy: {
      '/jzapi': {
        changeOrigin: true,
        target: 'http://134.200.26.196',//目标服务器地址
        configure: (proxy, options) => {
          proxy.on('proxyReq', function (proxyReq, req, res) {
            proxyReq.removeHeader('referer')  //移除请求头---最主要是设置这个
            proxyReq.removeHeader('origin') //移除请求头---最主要是设置这个
            //proxyReq.setHeader('host','api.bilibili.com/') //添加请求头
          });
        },
        rewrite: (path) => path.replace(/^\/jzapi/, ''),
      },
      '/fastapi': {
        changeOrigin: true,
        target: 'http://192.168.72.24',//目标服务器地址
        rewrite: (path) => path.replace(/^\/fastapi/, ''),
      },
      '/new': {
        changeOrigin: true,
        target: 'http://10.188.34.1',//目标服务器地址
        rewrite: (path) => path.replace(/^\/new/, ''),
      },
    }
  },
  plugins: [
    vue(),
  ],
})
