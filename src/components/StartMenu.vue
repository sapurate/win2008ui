<template>
     <!-- @blur="switch_menu_show" -->
<div id="start_menu_box" class="shadow-window" tabindex="-1" @blur="switch_menu_show">
    <div class="lr-box">
        <div class="l-box">
            <!-- <div class="app" @click="applist.app ++">111</div> -->
            <!-- <span></span> -->
            <template v-for="item in menu_app_list">
                <div class="app"
                    @click="open_app(item)" :style="{backgroundImage: 'url('+appList[item].icon+')',backgroundSize: '32px 32px'}">
                    {{ appList[item].zhName }}
                </div>
            </template>
            <div class="zw"></div>
            <span></span>
            <!-- 副菜单 -->
            <div class="app" id="show_all_apps" @mouseover="showSubMenu = true" @mouseout="showSubMenu = false">
                <div id="sub_menu" class="shadow-window" v-show="showSubMenu">
                    <div v-for="item, appName in appList" class="sub_menu_app" @click="open_app(appName)">
                        <img :src="item.icon" :alt="item.zhName">
                        <a>{{item.zhName}}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="r-box">
            <div class="user_pic"><img src="/ico/user_pic.png" alt="user_pic"></div>
            <div class="app">{{ user_name }}</div>
            <div class="app">文档</div>
            <span></span>
            <div class="app" @click="open_app('computer')">计算机</div>
            <div class="app">网络</div>
            <span></span>
            <div class="app">控制面板</div>
            <div class="app">设备和打印机</div>
            <div class="app">管理工具</div>
            <div class="app">帮助和支持</div>
            <div class="app">运行...</div>
            <span></span>
            <div class="app">Windows 安全</div>
        </div>
    </div>
    <div class="b-box">
        <input type="text" placeholder=" 搜索程序和文件" v-model="search_app_input" disabled="true">
        <div class="search"></div>
        <div class="logout" @click="logout">注销</div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// const start_menu = ref(null as any);
const showSubMenu  = ref(false);
const props = defineProps({
    switch_menu_show: { type: Function as any },
    open_app: { type: Function as any },
    appList: { type: {} as any },
    menu_app_list: { type: [] as any },
});

const user_name = ref('');

const search_app_input = ref('');
const logout = () => {
    localStorage.removeItem('user_name')
    localStorage.removeItem('openedApps')
    window.location.reload()
};

onMounted(() => {
    document.getElementById('start_menu_box')?.focus();
});
</script>

<style scoped lang="less">
#start_menu_box {
    display: flex;
    cursor: default;
    outline: none;
    flex-direction: column;
    background-color: var(--cd1);
    position: absolute;
    padding: 2px;
    left: 2px;
    bottom: 45px;
    height: 453px;
    box-sizing: border-box;
    z-index: 99;
    font-size: 12px;
    .lr-box {
        flex: 1;
        border-bottom: solid 1px var(--cd2);
        display: flex;
        span {
            width: 100%;
            border-top: solid 1px var(--cd2);
            border-bottom: solid 1px var(--cd0);
            margin: 1px 0;
        }
        .l-box {
            width: 251px;
            border-right: solid 1px var(--cd2);
            padding: 3px 5px 1px 5px;
            display: flex;
            flex-direction: column;
            .app {
                height: 36px;
                line-height: 36px;
                margin: 1px 2px 1px 0;
                padding-left: 40px;
                text-align: left;
                position: relative;
                background-position: 2px center;
                background-repeat: no-repeat;
                &#show_all_apps {
                    margin: 0;
                    position: relative;
                    height: 28px;
                    &::before {
                        white-space: pre;
                        content: '▸所有程序';
                        position: absolute;
                        line-height: 28px;
                        left: 0;
                    };
                    #sub_menu {
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        padding: 3px;
                        left: 240px;
                        bottom: 0;
                        background-color: var(--cd1);
                        .sub_menu_app {
                            width: 150px;
                            display: flex;
                            align-items: center;
                            color: #000;
                            padding: 2px 5px;
                            height: 25px;
                            img {
                                height: 20px;
                            };
                            a {
                                margin-left: 5px;
                            };
                            &:hover {
                                background-color: var(--cd4);
                                color: var(--cd0);
                            };
                        };
                    };
                }
                &:hover {
                    background-color: var(--cd4);
                    color: var(--cd0);
                }
            };
            .zw {
                flex: 1;
            }
        };
        .r-box {
            width: 150px;
            display: flex;
            flex-direction: column;
            border-left: solid 1px var(--cd0);
            padding: 0 1px 0 3px;
            .user_pic {
                height: 61px;
                margin: 5px 0;
                display: flex;
                justify-content: center;
                img {
                    cursor: pointer;
                };
            };

        .app {
                height: 31px;
                line-height: 31px;
                margin: 1px 0 1px 0;
                padding-left: 7px;
                text-align: left;
                &:hover {
                    background-color: var(--cd4);
                    color: var(--cd0);
                }
            };
        };
    }
    .b-box {
        height: 31px;
        border-top: solid 1px var(--cd0);
        display: flex;
        align-items: center;
        input {
            float: left;
            width: 216px;
            height: 18px;
            margin: 5px 3px 5px 7px;
            padding-left: 3px;
            box-shadow: -.5px -.5px 0 .5px var(--cd2),
                        0 0 0 1px var(--cd1),
                        -.5px -.5px 0 1.5px var(--cd3),
                        0 0 0 2px var(--cd0);
            border: none;

            text-align: left;
            &::placeholder {
                color: black;
            };
        };
        .search {
                height: 21px;
                width: 21px;
                background-image: url(~/assets/img/ui/search_btu.png);
                border-radius: 3px;
                &:hover {
                    filter: brightness(1.2);
                }
            };
        .logout {
            width: 42px;
            height: 19px;
            margin-left: 10px;
            line-height: 19px;
            position: relative;
            box-shadow: -.5px -.5px 0 .5px var(--cd1),
                        0 0 0 1px var(--cd2),
                        -.5px -.5px 0 1.5px var(--cd0),
                        0 0 0 2px var(--cd3);
            &::after {
                content: '▸';
                display: block;
                position: absolute;
                height: 19px;
                width: 10px;
                top: 0;
                left: 45px;
                box-shadow: -.5px -.5px 0 .5px var(--cd1),
                            0 0 0 1px var(--cd2),
                            -.5px -.5px 0 1.5px var(--cd0),
                            0 0 0 2px var(--cd3);
            }
        };
    }
}
</style>