<template>
  <div :id="appName+'Window'" class="dragAssembly shadow-window" tabindex="-1" 
    :class="{max: isMax, activate: active_app_list[active_app_list.length-1]==appName}" 
    :style="{ width: w, height: h, zIndex: active_app_list.indexOf(appName)+70, }">
    
    <div :id="appName+'Header'" class="dragHeader"
    :class="{activate: active_app_list[active_app_list.length-1]==appName}">
      <span class="dragTitle"><b>{{ title }}</b></span>
      <div class="btn-group">
        <div class="el-icon-close shadow-btn" @click="mix_app(appName)">🗕</div>
        <div class="el-icon-close shadow-btn" @click="max" style="margin-left: 3px;">🗖</div>
        <div class="el-icon-close shadow-btn" @click="close_app(appName)">&#10005</div>
      </div>
    </div>
    <div :id="appName+'Header2'" class="dragHeader2">
      <input class="url" readonly :value="'🖥︎ ▾ 计算机 ▾ 应用 ▾ ' + vuePath"></input>
      <el-button class="btn" @click="import_content" style="margin-left: -23px; background: linear-gradient(#90CDA4, #229832, #90CDA4); border: 1px solid #B0E2BE;">
        ♻︎
      </el-button>
      <input class="search shadow-window-1" v-model="searchText" @keyup.enter="searchOnBaidu"></input>
      <el-button class="btn" @click="searchOnBaidu" style="margin: 0 1px; background: linear-gradient(#AEB5E4, #2650AC, #AEB5E4); border: 1px solid #CBD1FA;" >
        🔍︎
      </el-button>
    </div>
    <div :id="appName+'dragBody'" class="dragBody">
      <!-- <slot name="content"> -->
        <component v-if="url==''" :is="content"></component>
        <iframe v-if="url!=''" :src="url" style="width: 100%; height: 100%;" frameborder="0"></iframe>
      <!-- </slot> -->
    </div>
  
    <div class="unactivate" 
      v-show="active_app_list[active_app_list.length-1]!=appName"
      @mousedown="set_active_winodw(appName)"></div>
  </div>
</template>
   
<script setup>
import { ref, onMounted, shallowRef, defineAsyncComponent } from 'vue';

// Define reactive properties
// const isMove = ref(false);
// const startPosition = ref({});
// const currentPosition = ref({});
// const dragHeader = ref(null);
const isMax = ref(false);

// Props
const props = defineProps({
  appName: {
    type: String,
    default: "未定义",
  },
  w: {
    type: String,
    default: "800px",
  },
  h: {
    type: String,
    default: "600px",
  },
  title: {
    type: String,
    default: "未定义",
  },
  url: {
    type: String,
    default: "",
  },
  vuePath: {
    type: String,
    default: null,
  },
  active_app_list: {
    type: Array,
    default: null,
  },
  set_active_winodw: {
    type: Function,
  },
  mix_app: {
    type: Function,
  },
  close_app: {
    type: Function,
  },
});

// 设定初始的left和top值，赋值后不会再变
const startPosition = {
  left: props.active_app_list.indexOf(props.appName)*20,
  top: props.active_app_list.indexOf(props.appName)*20,
};

// 暂存窗口的left和top值，接触最大化后还原
const tempPosition = ref({
  left: "",
  top: "",
});

const content = shallowRef();
// 加载窗口内的子组件
const import_content = () => {
  content.value = defineAsyncComponent(() => import(`./winapp/${props.vuePath}.vue`));
  // confirm('窗口内容加载成功！');
};

const max = () => {
  const dragBox = document.getElementById(props.appName+'Window');
  if (isMax.value) {
    dragBox.style.left = tempPosition.value.left;
    dragBox.style.top = tempPosition.value.top;
    isMax.value = false;
    isMove.value = true;
  } else {
    tempPosition.value.left = dragBox.style.left;
    tempPosition.value.top = dragBox.style.top;
    dragBox.style.left = "0";
    dragBox.style.top = "0";
    isMax.value = true;
    isMove.value = false;
  };
};

const searchText = ref('');
const searchOnBaidu = () => {
  const url = `https://www.baidu.com/s?wd=${encodeURIComponent(searchText.value)}`;
  window.open(url, '_blank');
};

// 是否可以拖动
const isMove = ref(true);

// Mounted hook
onMounted(() => {
  const box = document.getElementById(props.appName+'Window');
  const drop = document.getElementById(props.appName+'Header');
  let x, y;

  drop.addEventListener('mousedown', (e) => {
    // 如果现在是最大化状态，禁止拖动
    // if (isMax.value) { return };
    if (!isMove.value) { return };
    
    x = e.pageX - box.offsetLeft;
    y = e.pageY - box.offsetTop;
    document.addEventListener('mousemove', moveBox);
  });

  box.addEventListener('mousedown', (e) => {
    // 如果alt按下则点哪里都能拖动
    if (!e.altKey) { return };
    // 如果现在是最大化状态，禁止拖动
    if (!isMove.value) { return };
    
    x = e.pageX - box.offsetLeft;
    y = e.pageY - box.offsetTop;
    document.addEventListener('mousemove', moveBox);
  });

  drop.addEventListener('dblclick', (e) => {
    // 处理双击事件
    isMove.value = false;
    max();
  });

  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', moveBox);
  });

  const moveBox = (e) => {
    box.style.left = `${e.pageX - x}px`;
    box.style.top = `${e.pageY - y}px`;
  };

  import_content();

  document.getElementById(props.appName+'Window')?.focus();
});
</script>
  
<style scoped lang="less">
* {
  font-size: 13px;
  font-family: 'Times New Roman', Times, serif;
  &:focus {
    outline: none;
  }
}

.dragAssembly {
  position: fixed;
  flex-direction: column;
  display: flex;
  left: calc(50% + v-bind('startPosition.left')*1px);
  top: calc(50% + v-bind('startPosition.top')*1px);;
  // z-index: 97;
  transform: translate(-50%, -50%);
  background-color: var(--cd1);
  border: 1px solid var(--cd1);
  padding: 1px;
  user-select: none;
  &.max {
    // transition: all .5s;
    width: unset !important;
    height: unset !important;
    transform: unset;
    top: 0;
    left: 0;
    right: 0;
    bottom: 42px;
  };
  
  .dragHeader {
    width: 100%;
    height: 21px;
    line-height: 21px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background: linear-gradient(to right, #808080, #C1C0BE);
    padding: 0px 5px;
    position: relative;
    cursor: default;
    color: #D3D0CB;
    &.activate {
      background: linear-gradient(to right, #17246b, #A6CAF0);
      color: #fff;
    }

    .dragTitle {
      font-size: 13px;
      font-family: 'Times New Roman', Times, serif;
    }

    .btn-group {
      display: flex;
    }
  
    .el-icon-close {
      background-color: var(--cd1);
      color: #000;
      line-height: 13px;
      height: 13px;
      width: 14px;
      margin-left: 5px;
      box-sizing: border-box;
    }
  };

  .dragHeader2 {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: var(--cd1);
    border: 2px groove var(--cd0);
    border-left: 0;

    .url {
      flex: 1;
      height: 26px;
      // border: 0;
      box-sizing: border-box;
      border-top: 1px solid var(--cd2);
      border-left: 1px solid var(--cd2);
      border-right: 1px solid var(--cd0);
      border-bottom: 1px solid var(--cd0);
      background-color: var(--cd1);
      cursor: default;
      // margin: 1px;
    };
    .search {
      border: 0;
      width: 220px;
      height: 22px;
      box-sizing: border-box;
      background-color: var(--cd0);
      margin: 2px 2px 2px 9px;
    };
    .btn {
      box-sizing: border-box;
      padding: 0;
      width: 21px;
      height: 21px;
      box-shadow: 0 0 0 1px var(--cd2);
      color: #fff;
      // border: 1px solid var(--cd2);
    }
  };
  
  .dragBody {
    width: 100%;
    height: calc(100% - 57px);
    // flex: 1;
    background-color: var(--cd0);
    box-sizing: border-box;
    // border-left: 1px solid var(--cd1);
  }
}

.unactivate {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // z-index: 98;
  // background-color: rgba(0, 0, 0, 0.5);
}
</style>