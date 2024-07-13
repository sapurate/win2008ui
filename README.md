## 说明
- 框架完成进度
```30%```
1. 创建项目
    > npm init -y
2. 配置
3. 运行
    >yarn dev

## 技术栈

## 创建
1. 安装Vite
首先，确保你的系统中已安装了Node.js（推荐使用LTS版本）。然后，通过yarn全局安装Vite：
    >yarn global add create-vite
2. 创建Vite项目
    >create-vite win2008ui --template vue
    >cd win2008ui
    >yarn add element-plus
3. 配置vite.config.js文件
    打开vite.config.js文件，在里面配置Vite插件以支持Element Plus
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    import { createHtmlPlugin } from 'vite-plugin-html'
    import elementPlus from 'vite-plugin-element-plus'

4. 配置main.js文件
    >import ElementPlus from 'element-plus'
    >import 'element-plus/dist/index.css'
    >const app = createApp(App)
    >app.use(ElementPlus)

5. 开发与构建
    yarn dev
## 运行