<template>
<el-container id="desktop">
    <!-- 桌面 -->
    <el-main id="wallpaper" @click="selected_app=''">
        <div class="desktop_app" v-for="appName in desktop_app_list" :class="{ selected: selected_app == appName }"
            @click.stop="selected_app=appName" @dblclick="open_app(appName)" >
            <img :src="appList[appName].icon"/>
            <a>{{ appList[appName].zhName }}</a>
        </div>
        <!-- {{ selected_app }} -->
    </el-main>
    <el-footer id="taskbar">
        <!-- 开始菜单 -->
        <div id="start_menu" class="taskbar-btn active" style="background-image: url('/ico/start_menu.png');"
            @click="switch_menu_show"></div>
        <div class="taskbar-btn" @click="open_app('dd')">de </div>
        <!-- 任务栏的图标 -->
        <div id="taskbar_app_ground">
            <!-- 遍历固定的任务栏图标 -->
            <template v-for="appName in taskbar_app_list">
            <div class="taskbar-btn" :title="appName"
                @click="open_app(appName)" :class="{ opened: opened_app_list.indexOf(appName) != -1, active: appList[appName].show }"
                :style="{backgroundImage: 'url('+appList[appName].icon+')',backgroundSize: '32px 32px'}">
            </div>
            </template>
            <!-- 打开的应用 -->
            <!-- 遍历打开的应用 -->
            <template v-for="appName in opened_app_list">
            <div class="taskbar-btn" v-if="taskbar_app_list.indexOf(appName) == -1" :title="appName"
                @click="open_app(appName)" :class="{ opened: opened_app_list.indexOf(appName) != -1, active: appList[appName].show }"
                :style="{backgroundImage: 'url('+appList[appName].icon+')',backgroundSize: '32px 32px'}">
            </div>
            </template>
        </div>
    </el-footer>

    <!-- 应用窗口 -->
    <template v-for="item,appName in appList">
    <component 
        v-if="item.content" :mix_app="mix_app" :close_app="close_app" :vuePath="item.vuePath"
        :is="item.content" :title="item.zhName" :appName="appName" v-show="item.show"
        :url="item.iframeUrl"
        :opened_app_list="opened_app_list" :set_active_winodw="set_active_window"
    />
    </template>
    <!-- <Window
        ref="dragAssembly"
        w="800px"
        h="600px"
        title="示例"
        @close="show_window=false"
        v-show="show_window">
    </Window> -->
    <StartMenu v-show="show_start_menu" :switch_menu_show="switch_menu_show"/>
</el-container>
</template>

<script setup lang="ts">
// import Window from "./components/Window.vue";
import StartMenu from "./components/StartMenu.vue";
import { ref, shallowRef, defineAsyncComponent } from "vue";

// const show_window = ref(true);
const show_start_menu = ref(false);
// 桌面被选中的图标
const selected_app = ref('');

// 桌面图标列表
const desktop_app_list = ref(['config', 'explorer', 'explorer1', 'emmsV2']);
// 开始菜单图标列表
const menu_app_list = ref(['config', 'explorer', 'explorer1', 'emmsV2']);
// 任务栏图标列表(固定的任务栏图标，如果是临时打开的会判定opened_app_list里面有没有，有则打开，没有则新建)
const taskbar_app_list = ref(['config', 'explorer', 'emmsV2']);
// 打开的应用列表，只是名字，里面的顺序决定窗口的层叠顺序，最后一个为激活状态，第一个的z-index是70
const opened_app_list = ref([] as any);

// 最重要的：应用列表
const appList = ref({
    'config': {
        icon: '/ico/config.ico', url: '/ico/start_menu.png', zhName: "配置", vuePath: `jz_set`,
        iframeUrl: '',
        taskbar: true, desktop: true, show: false, content: false
    },
    'explorer': {
        icon: '/ico/explorer.ico', url: '/ico/explorer.ico', zhName: "浏览器", vuePath: `jz_set`,
        iframeUrl: 'http://192.168.72.24',
        taskbar: true, desktop: true, show: false, content: false
    },
    'explorer1': {
        icon: '/ico/clock.ico', url: '/ico/explorer.ico', zhName: "浏览器1", vuePath: `jz_set`,
        iframeUrl: 'https://nstool.netease.com/',
        taskbar: true, desktop: true, show: false, content: false
    },
    'emmsV2': {
        icon: '/ico/emms.ico', url: '/ico/explorer.ico', zhName: "emms V2版", vuePath: `jz_set`,
        iframeUrl: 'http://192.168.72.24:8002/',
        taskbar: true, desktop: true, show: false, content: false
    },
});

// 切换菜单显示
const switch_menu_show = () => {
    show_start_menu.value = !show_start_menu.value;
};

// 把窗口置于顶层的动作
const set_active_window = (appName: string) => {
    opened_app_list.value.splice(opened_app_list.value.indexOf(appName), 1);
    opened_app_list.value.push(appName);
};

// 打开应用
const open_app= (appName: string) => {
    selected_app.value = "";
    if (appList.value[appName].content == false){
        appList.value[appName].content = shallowRef(
            defineAsyncComponent(() => import(`./components/Window.vue`)) as any
                );
        // 加入打开的app列表
        opened_app_list.value.push(appName);
        appList.value[appName].show = true;
    }else if(appList.value[appName].show){
        mix_app(appName);
    }else {
        appList.value[appName].show = true;
        set_active_window(appName);
    };
};


// 最小化
const mix_app = (appName: string) => {
    appList.value[appName].show = !appList.value[appName].show;
    // opened_app_list.value.splice(opened_app_list.value.indexOf(appName), 1);
    // opened_app_list.value.unshift(appName);
};

// 关闭
const close_app = (appName: string) => {
    // 删除vue实例
    appList.value[appName].content = false;
    // 去除应用
    opened_app_list.value.splice(opened_app_list.value.indexOf(appName), 1);
    appList.value[appName].show = false;
};

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

#wallpaper {
    display: grid;
    grid-auto-columns: 82px;
    grid-auto-rows: 96px;
    .desktop_app {
        width: 64px;
        height: 74px;
        user-select: none;
        position: relative;
        img {
            widows: 48px;
            height: 48px;
        };
        a {
            color: #fff;
            display: block;
            font-size: 12px;
        };
        &.selected::before {
            content: "";
            display: block;
            position: absolute;
            width: 64px;
            height: 72px;
            background-color: #0a246a7d;
            pointer-events: none;
            // z-index: 1;
        }
    }
}

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
        &.active.opened {
            box-shadow: -.5px -.5px 0 .5px var(--cd2),
                0 0 0 1px var(--cd1),
                -.5px -.5px 0 1.5px var(--cd3),
                0 0 0 2px var(--cd0);
                background-color: var(--cd0);
        };
        &.active:not(.opened) {
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
        };
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