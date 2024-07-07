<template>
<el-container id="desktop">
    <el-main id="wallpaper">Main</el-main>
    <el-footer id="taskbar">
        <!-- 开始菜单 -->
        <div id="start_menu" class="taskbar-btn active" style="background-image: url('/ico/start_menu.png');"></div>
        <div class="taskbar-btn">de </div>
        <!-- 任务栏的图标 -->
        <div id="taskbar_app_ground" v-for="item in appList">
            <div class="taskbar-btn" v-if="item.taskbar" :title="item.name"
            :style="{backgroundImage: 'url('+item.icon+')',backgroundSize: '32px 32px'}">
        </div>
        </div>
    </el-footer>
    <Window
        ref="dragAssembly"
        w="800px"
        h="600px"
        title="窗口"
        @close="show_window=false"
        v-show="show_window">
        <div class="winContent" slot="content">
            <div class="winInfo"></div>
        </div>
    </Window>
    <StartMenu v-show="show_window" />
</el-container>
</template>

<script setup lang="ts">
import Window from "./components/Window.vue";
import StartMenu from "./components/StartMenu.vue";
import { ref } from "vue";

const show_window = ref(true);
const active_app = ref("");
// 最重要的：应用列表
const appList = ref([
    {'name': 'start_menu', 'icon': '/ico/config.ico', 'url': '/ico/start_menu.png', 'taskbar': true, 'desktop': true, 'isOpen': false},
    {'name': 'explorer', 'icon': '/ico/explorer.ico', 'url': '/ico/explorer.ico', 'taskbar': true, 'desktop': true, 'isOpen': false},
    {'name': 'explorer', 'icon': '/ico/clock.ico', 'url': '/ico/explorer.ico', 'taskbar': true, 'desktop': true, 'isOpen': false},
    {'name': 'explorer', 'icon': '/ico/emms.ico', 'url': '/ico/explorer.ico', 'taskbar': true, 'desktop': true, 'isOpen': false},
]);
</script>

<style lang="less">
:root {
    --cd0: #ffffff;
    --cd1: #D4D0C8;
    --cd2: #808080;
    --cd3: #404040;
    --cd4: #17246b;
    --cd5: #A6CAF0;
    --desktop: #3A6EA5;
}

#desktop {
    height: 100%;
    width: 100%;
    background-color: var(--desktop);
}

/* #wallpaper {
    background-color: #424142;
} */

#taskbar {
    height: 42px;
    background-color: var(--cd1);
    border-top: solid 1px var(--cd0);
    box-shadow: 0 -1px var(--cd1);
    display: flex;
    align-items: center;
    padding: 2px;
    z-index: 99;

    .taskbar-btn {
        width: 43px;
        height: 34px;
        margin: 2px 4px 2px 2px;
        line-height: 34px;
        display: inline-block;
        cursor: default;
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
        &.active {
            box-shadow: -.5px -.5px 0 .5px var(--cd1),
                0 0 0 1px var(--cd2),
                -.5px -.5px 0 1.5px var(--cd0),
                0 0 0 2px var(--cd3);
        };
        &.opened:not(.active), &:not(.active):hover {
            box-shadow: -.5px -.5px 0 .5px var(--cd1),
                0 0 0 1px var(--cd2),
                -.5px -.5px 0 1.5px var(--cd0),
                0 0 0 2px var(--cd3);
        }
    };
    #taskbar_app_ground {
        display: flex;
    }
}

// .shadow-right-bottom {
//     box-shadow: -0.5px -0.5px 0 0.5px var(--cd1),
//                 0 0 0 1px var(--cd2),
//                 -0.5px -0.5px 0 1.5px var(--cd0),
//                 0 0 0 2px var(--cd3);
// }
.shadow-window {
    box-shadow: 
    -1px -1px var(--cd0),
    0 -1px var(--cd0),
    -1px 0 var(--cd0),

    -2px -2px var(--cd1),

    1px 1px var(--cd2),
    1px -1px var(--cd2),
    -1px 1px var(--cd2),

    1px -2px var(--cd1),
    -2px 1px var(--cd1),

    2px 2px var(--cd3),
    2px -2px var(--cd3),
    -2px 2px var(--cd3);
}
.shadow-window-1 {
    box-shadow: 
    -1px -1px var(--cd3),
    0 -1px var(--cd3),
    -1px 0 var(--cd3),

    -2px -2px var(--cd2),

    1px 1px var(--cd1),
    1px -1px var(--cd1),
    -1px 1px var(--cd1),

    1px -2px var(--cd2),
    -2px 1px var(--cd2),

    2px 2px var(--cd0),
    2px -2px var(--cd0),
    -2px 2px var(--cd0);
}
.shadow-btn {
    box-shadow: 
    -1px -1px var(--cd0),

    1px 1px var(--cd2),
    1px 0 var(--cd2),
    0 1px var(--cd2),

    1px -1px var(--cd0),
    -1px 1px var(--cd0),

    2px 2px var(--cd3),
    2px -1px var(--cd3),
    -1px 2px var(--cd3);
}

</style>