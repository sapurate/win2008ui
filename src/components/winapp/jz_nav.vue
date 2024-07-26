<template>
<div id="nav">
    <div class="www" v-for="i in nav_www_order" @click="go_to_url(i.url)">
        <img :src="i.picpath" alt="logo" style="object-fit: contain" />
        <div>
            <p>{{ i.remark }}</p>
            <p>{{ i.key }}</p>
        </div>
    </div>
</div>
</template>
    
<script setup lang="ts">
import axios from "axios";
import { ref, computed } from "vue";

// 导航网址
const nav_www = ref([] as any);
axios.get("fastapi/api/getnav").then((res) => {
  nav_www.value = res.data.data;
});
const nav_www_order = computed(() => {
  return nav_www.value.sort((a: any, b: any) => a.bak1 - b.bak1);
});
const go_to_url = (url: string) => {
  window.open(url, "_blank");
};
</script>

<style scoped>
#nav {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}
/* 网址导航 */
.www {
  margin: 10px auto;
  height: 80px;
  width: 250px;
  /* background-color: #F2F2F2; */
  cursor: pointer;
  border: 1px solid #f1f1f1;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
}
.www:hover {
  background-color: white;
  border: solid 2px #498ac2;
}
.www > div {
  flex: 1;
  margin: 0 10px;
  font-size: small;
}
.www > img {
  width: 100px;
}
.www p {
  font-size: 12px;
}
</style>