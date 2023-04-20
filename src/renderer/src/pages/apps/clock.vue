<template>
    <div>
        dddddddd
    </div>
</template>

<script>
export default {
    name: 'clock',
    created() {
        console.log('clock组件被创建了')
    },
    destroyed() {
        console.log('clock组件被销毁了')
    },
    activated() {
        console.log('clock组件被激活了')
    },
    deactivated() {
        console.log('clock组件被缓存了')
    }
}
</script>

<style scoped>
div {
    height: 50px;
    background-color: aqua;
}
</style>