<template>
<div class="index">
    <!-- 桌面模块 -->
    <div class="desktop"></div>
    <!-- 任务栏 -->
    <div id="bottom_bar" class="bottom_bar">       
        <div id="start_menu" class="btn open" :class="{ 'act': start_menu_show }" @click.self="switch_startMenu"
            @blur="start_menu_show=false" tabindex="-1" ref="start_menu" >
            <!-- 开始菜单 -->
            <div class="start_menu" v-show="start_menu_show">
                <div class="lr-box">
                    <div class="l-box">
                        <div class="app" @click="applist.app ++">{{ applist.app }}</div>
                        <span></span>
                        <div v-for="(i, n) in apps" class="app" :key="n" :ref="n+'_btu'" 
                                :class="{ 'open':i.is_open, 'act':i.is_act }" @click="this.openApp(n)"
                                :style="{backgroundImage: 'url(/src/assets/img/' + i.ico + ')',backgroundSize: '32px 32px'}">
                                {{ n }}
                        </div>
                        <div class="zw"></div>
                        <span></span>
                        <div class="app show_all_apps" >所有程序</div>
                    </div>
                    <div class="r-box">
                        <div class="user_pic"><img src="/src/assets/img/user_pic.png" alt="user_pic"></div>
                        <div class="app">Administrator</div>
                        <div class="app">文档</div>
                        <span></span>
                        <div class="app">计算机</div>
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
                    <input type="text" placeholder=" 搜索程序和文件" v-model="search_app_input">
                    <div class="search"></div>
                    <div class="logout">注销</div>
                </div>
            </div>
        </div>
        <div id="app_bar"> <!-- 任务图标 -->
            <div class="btn" @click="open_menu_box" name="ddd">{{ bottomar.appName }}</div>
            <template v-for="(i, n) in apps">
                <div v-if="i.is_bar" class="btn" :key="n" :ref="n+'_btu'" :title="n" 
                    :class="{ 'open':i.is_open, 'act':i.is_act }" @click="openApp(n)"
                    :style="{backgroundImage: 'url(/src/assets/img/' + i.ico + ')',backgroundSize: '32px 32px'}">
                </div>
            </template>
        </div>
        <div id="task_bar"></div>
    </div>
    <!-- <Desktop />
    <BottomBar ref="bottomar"/>
    <AppBox ref="appbox"/>
    <AppList ref="applist"/> -->
    <!-- <button @click="open_app">ddd</button> -->
</div>
</template>

<script>
// import { ref } from 'vue'
// import Desktop from '~/pages/desktop.vue'
// import AppList from '~/pages/app_list.vue'
// import AppBox from '~/pages/app_box.vue'

export default {
    data() {
        return {
            apps: {
                '设置': {'ico':'522.ico','is_desk':true,'is_bar':true},
                'EMMS': {'ico':'emms.ico','is_desk':true,'is_bar':true},
                'ddd': {'ico':'522.ico','is_desk':true,'is_bar':false},
            },
            apps_opened: [],
            bottomar: {
                appName: 'app1',
                isact: true,
                app: 1,
                activeAppName: null,
            },
            applist: {
                start_menu_isact: false,
                search_app_input: '',
                app: 1,
            },
            start_menu_show: false,
            search_app_input: '',
        }
    },
    components: ({
        // 'BottomBar': BottomBar,
        // 'Desktop': Desktop,
        // 'AppList': AppList,
        // 'AppBox': AppBox,
    }),
    methods: {
        // 切换开始菜单
        switch_startMenu() {
            if (!this.start_menu_show) {
                this.start_menu_show = true;
                this.$nextTick(() => {
                    this.$refs.start_menu.focus();
                });   
            } else {
                this.start_menu_show = false;
            }
        },
        openApp(name) {
            console.log(name+'is opening');
            // 如果开始菜单正打开则关闭
            if (this.applist.start_menu_isact) {
                this.applist.start_menu_isact = false;
                this.bottomar.start_menu_btu_isact = false;
            };
            // 如果已经打开，则激活
            if (this.apps_opened.includes(name)) {
                this.bottomar.activeAppName = name;
                // this.appbox.is_show = true;
            // 找不到name的情况下,创建
            } else {
                this.bottomar.activeAppName = name;
                // this.appbox.is_show = true;
                this.apps_opened.push(name);
                this.apps[name].is_open = true;
            };
            // 只有一个is_act
            if (this.apps[name].is_act) {
                this.bottomar.activeAppName = '';
                this.apps[name].is_act = false;
            } else {
                for (let key in this.apps) {
                    if (key==name) {
                        this.apps[key].is_act = true;
                    } else {
                        this.apps[key].is_act = false;
                    };
                };
            }

        },
        nnn() {
            console.log('dede');
        },
        // closeApp() {
        //     this.appbox.activeAppName = 'close';
        // },
        // open_app(n) {
        //     console.log('sss');
        //     this.apps[n].is_open = true;
        //     console.log(this.apps[n].is_open);
        // }
    },
}

    
</script>

<style scoped lang="scss">
* {
    background-position: center center;
    background-repeat: no-repeat;
    box-sizing: border-box;
    text-align: center;
    cursor: default;
    font-size: 12px;
    font-weight: 300;
}
// 桌面
.desktop {
    flex: 1;
}
.index {
    min-height: 100vh;
    // background-image: url('~/assets/img/bg.jpg');
    // background-size: cover;
    background-color: var(--cd_desktop);
    display: flex;
    flex-direction: column;
}
// 任务栏 样式
.bottom_bar {
    // height: 42px;
    padding: 2px;
    background-color: var(--cd1);
    border-top: solid 1px var(--cd0);
    box-shadow: 0 -1px var(--cd1);
    display: flex;
    align-items: center;
}
.btn {
    width: 43px;
    height: 34px;
    margin: 2px 4px 2px 2px;
    line-height: 34px;
    display: inline-block;
    #app_bar & {
        width: 44px;
    }
    &.act {
        box-shadow: -.5px -.5px 0 .5px var(--cd2),
                    0 0 0 1px var(--cd1),
                    -.5px -.5px 0 1.5px var(--cd3),
                    0 0 0 2px var(--cd0);
        #app_bar & {
            background-color: var(--cd0);
        };
    }
    &.open:not(.act), &:not(.act):hover {
        box-shadow: -.5px -.5px 0 .5px var(--cd1),
                    0 0 0 1px var(--cd2),
                    -.5px -.5px 0 1.5px var(--cd0),
                    0 0 0 2px var(--cd3);
        };
}
#start_menu { /* 开始菜单 */
    background-image: url(~/assets/img/start_menu.png);
}
#app_bar {
    flex: 1;
    margin: 0 7px;
    display: flex;
}
#task_bar { /* 任务栏 */
    height: 36px;
    margin: 1px;
    box-shadow: -.5px -.5px 0 .5px var(--cd2),
                0 0 0 1px var(--cd0);
    padding-left: 6px;
    display: flex;
}
// 开始菜单
.start_menu {
    display: flex;
    cursor: default;
    outline: none;
    flex-direction: column;
    background-color: var(--cd1);
    position: absolute;
    padding: 2px;
    bottom: 46px;
    left: 2px;
    width: 400px;
    height: 612px;
    box-sizing: border-box;
    box-shadow: -.5px -.5px 0 .5px var(--cd0),
                0 0 0 1px var(--cd2),
                -.5px -.5px 0 1.5px var(--cd1),
                0 0 0 2px var(--cd3);
    z-index: 99;
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
                height: 35px;
                line-height: 35px;
                margin: 1px 2px 1px 0;
                padding-left: 37px;
                text-align: left;
                position: relative;
                background-position: 2px center;
                background-repeat: no-repeat;
                // &:not(.show_all_apps){
                //     background-image: url(~/assets/img/1106.ico);
                // }
                &.show_all_apps {
                    margin: 0;
                    &::before {
                        content: '▸';
                        position: absolute;
                        left: 0;
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
            flex: 1;
            display: flex;
            flex-direction: column;
            // align-items: center;
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
                // background-image: url(~/assets/img/user_pic.png);
            };

        .app {
                height: 31px;
                // width: 100%;
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
        height: 32px;
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
            outline: none;
            text-align: left;
            &::placeholder {
                color: black;
            };
        };
        .search {
                height: 21px;
                width: 21px;
                background-image: url(~/assets/img/search_btu.png);
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
                // transform: scale(.5);
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