<template>
<el-container id="desktop">
    <el-main id="wallpaper">
        opened_app_list: {{ opened_app_list }}<br>

    </el-main>
    <el-footer id="taskbar">
        <!-- 开始菜单 -->
        <div id="start_menu" class="taskbar-btn active" style="background-image: url('/ico/start_menu.png');"></div>
        <div class="taskbar-btn" @click="open_app('dd')">de </div>
        <!-- 任务栏的图标 -->
        <div id="taskbar_app_ground" v-for="item,appName in appList">
            <div class="taskbar-btn" v-if="item.taskbar" :title="appName"
            @click="open_app(appName)" :class="{ opened: opened_app_list.indexOf(appName) != -1, active: item.show }"
            :style="{backgroundImage: 'url('+item.icon+')',backgroundSize: '32px 32px'}">
        </div>
        </div>
    </el-footer>

    <!-- 应用窗口 -->
    <template v-for="item,appName in appList">
    <component 
        v-if="item.content" :mix_app="mix_app" :close_app="close_app"
        :is="item.content" :title="item.zhName" :appName="appName" v-show="item.show"
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
    <StartMenu v-show="show_start_menu" />
</el-container>
</template>

<script setup lang="ts">
// import Window from "./components/Window.vue";
import StartMenu from "./components/StartMenu.vue";
import { ref, shallowRef, defineAsyncComponent } from "vue";

// const show_window = ref(true);
const show_start_menu = ref(false);

// 打开的应用列表，只是名字，里面的顺序决定窗口的层叠顺序，最后一个为激活状态，第一个的z-index是70
const opened_app_list = ref([] as any);

// 最重要的：应用列表
const appList = ref({
    'config': {
        icon: '/ico/config.ico', url: '/ico/start_menu.png', zhName: "配置",
        taskbar: true, desktop: true, show: false, content: false
    },
    'explorer': {
        icon: '/ico/explorer.ico', url: '/ico/explorer.ico', zhName: "浏览器",
        taskbar: true, desktop: true, show: false, content: false
    },
    'explorer1': {
        icon: '/ico/clock.ico', url: '/ico/explorer.ico', zhName: "浏览器1",
        taskbar: true, desktop: true, show: false, content: false
    },
    'explorer2': {
        icon: '/ico/emms.ico', url: '/ico/explorer.ico', zhName: "浏览器2",
        taskbar: true, desktop: true, show: false, content: false
    },
});

// 把窗口置于顶层的动作
const set_active_window = (appName: string) => {
    opened_app_list.value.splice(opened_app_list.value.indexOf(appName), 1);
    opened_app_list.value.push(appName);
};

// 打开应用
const open_app= (appName: string) => {
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