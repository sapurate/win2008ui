<template>
    <div id="app_show" :class="{ show: is_show }">
        <div class="title">
            <div class="app_logo"></div>
            <div class="app_name">ddd</div>
            <button @click="this.$parent.closeApp">X</button>
        </div>
        <keep-alive :include=activeAppNames>
            <component :is="activeApp"></component>
        </keep-alive>
    </div>
</template>

<script>
import { markRaw } from 'vue'
const loadApp = value => import(`~/pages/apps/${value}.vue`); 

export default {
    data() {
        return {
            activeAppName:'', // 变量
            activeApp:null,  // 定义组件
            activeAppNames:[],
            is_show: false
        }
    },
    methods: {

    },
    // 监控某个变量的变化，来调用引入组件的函数
    watch: {
        activeAppName:{
            handler(new_app_name, old_app_name){
                if (new_app_name=='close') {
                    this.activeAppNames.splice(this.activeAppNames.indexOf(old_app_name),1);
                    this.$parent.apps[old_app_name].is_open = false;
                    for (let key in this.$parent.apps) {
                        if (key==new_app_name) {
                            this.$parent.apps[key].is_act = true;
                        } else {
                            this.$parent.apps[key].is_act = false;
                        };
                    };
                    this.activeApp = null;
                    this.is_show = false;
                    return
                };
                if (new_app_name) {
                    loadApp(new_app_name).then(component => {
                        // this.$destroy(old_app_name);
                        this.activeApp = markRaw(component.default);
                    });
                    return
                };
                this.activeApp = null;
                this.is_show = false;

            },
            // immediate: true
        }
    },
}
</script>

<style scoped lang="scss">
* {
    box-sizing: border-box;
    cursor: default;
}
#app_show {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 44px;
    background-color: var(--cd0);
    z-index: 1;
    display: none;
    &.mid {
        top: 15%;
        left: 15%;
        right: 15%;
        bottom: calc(44px + 15%);
    };
    &.show {
        display: block;
    };
}
.title {
    background-color: var(--cd4);
    height: 19px;
    border-top: solid 1px var(--cd3);
    border-bottom: solid 1px var(--cd2);
    display: flex;
    align-items: center;
    font-size: 13px;
    .app_logo {
        height: 17px;
        width: 17px;
        background: url() no-repeat center center;
        display: inline-block;
        background-size: 17px
    }
    .app_name {
        flex: 1;
        line-height: 17px;
        color: var(--cd0);
        font-weight: 700;
        padding: 0 4px;
        letter-spacing: 2px;
    }
    button {
        background-color: var(--cd1);
        height: 13px;
        width: 16px;
        font-weight: 700;
        line-height: 13px;
        text-align: center;
        border-right: solid 1px var(--cd2);
        border-bottom: solid 1px var(--cd2);
        border-top: solid 1px var(--cd0);
        border-left: solid 1px var(--cd0);
        margin-right: 2px;
    }
}
</style>