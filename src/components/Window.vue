<template>
  <div id="dragAssembly" class="shadow-window" :class="{max: isMax}" ref="dragBox" :style="{ width: w, height: h }">
    <div id="dragHeader" @mousedown.stop="mouseDownHandler">
      <span class="dragTitle">{{ title }}</span>
      <div class="btn-group">
        <div class="el-icon-close shadow-btn" @click="max">-</div>
        <div class="el-icon-close shadow-btn" @click="max" style="margin-left: 3px;">◻</div>
        <div class="el-icon-close shadow-btn" @click="close">x</div>
      </div>
    </div>
    <div id="dragHeader2">
      <input class="url" readonly :value="url"></input>
      <el-button class="btn" style="margin-left: -23px; background: linear-gradient(#90CDA4, #229832, #90CDA4); border: 1px solid #B0E2BE;">
        ♻
      </el-button>
      <input class="search shadow-window-1"></input>
      <el-button :icon="Search" class="btn" style="margin: 0 1px; background: linear-gradient(#AEB5E4, #2650AC, #AEB5E4); border: 1px solid #CBD1FA;" >
        🔍︎
      </el-button>
    </div>
    <div id="dragBody">
      <slot name="content"></slot>
    </div>
  </div>
</template>
   
<script>
import { Search } from '@element-plus/icons-vue';

export default {
  name: "Window",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    w: {
      type: String,
      default: "700px",
    },
    h: {
      type: String,
      default: "500px",
    },
    url: {
      type: String,
      default: window.location.pathname.replace("/", ">"),
    },
  },
  data() {
    return {
      // 是否可以移动
      isMove: false,
  
      // 移动开始位置
      startPosition: {},
      // 元素当前位置
      currentPosition: {},
  
      // 拖拽元素
      dragHeader: null,

      // 是否最大化
      isMax: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    mouseDownHandler(e) {
      // 获取元素当前位置
      this.currentPosition = {
        x: this.$refs.dragBox.offsetLeft,
        y: this.$refs.dragBox.offsetTop,
      };
  
      // 获取移动开始位置
      this.startPosition = {
        x: e.clientX,
        y: e.clientY,
      };
  
      // 设置为true，允许移动
      this.isMove = true;
  
      this.dragAssembly = document.getElementById("dragAssembly");
  
      // 鼠标移动事件
      this.dragAssembly.addEventListener("mousemove", this.mouseMoveHandler);
      // 鼠标抬起事件
      this.dragAssembly.addEventListener("mouseup", (e) => {
        this.isMove = false;
        this.dragAssembly.removeEventListener(
          "mousemove",
          this.mouseMoveHandler
        );
      });
      // 鼠标移出事件
      this.dragAssembly.addEventListener("mouseleave", (e) => {
        this.isMove = false;
        this.dragAssembly.removeEventListener(
          "mousemove",
          this.mouseMoveHandler
        );
      });
    },
  
    // 鼠标移动事件
    mouseMoveHandler(e) {
      if (!this.isMove) {
        return;
      }
  
      // 获取鼠标移动的距离
      const nowX = e.clientX - this.startPosition.x,
        nowY = e.clientY - this.startPosition.y;
  
      // 计算并设置移动后的位置
      this.$refs.dragBox.style.left = `${this.currentPosition.x + nowX}px`;
      this.$refs.dragBox.style.top = `${this.currentPosition.y + nowY}px`;
    },
  
    // 关闭窗口
    close() {
      this.$emit("close");
    },

    // 窗口最大化
    max() {
      if (this.isMax) {
        this.$refs.dragBox.style.left = "50%";
        this.$refs.dragBox.style.top = "50%";
        this.isMax = false;
      }else {
        this.$refs.dragBox.style.left = "0";
        this.$refs.dragBox.style.top = "0";
        this.isMax = true;
      }
    },
  },
};
</script>
  
<style scoped lang="less">
#dragAssembly {
  position: fixed;
  flex-direction: column;
  display: flex;
  left: 50%;
  top: 50%;
  z-index: 98;
  transform: translate(-50%, -50%);
  background-color: var(--cd1);
  color: #fff;
  border: 1px solid var(--cd1);
  padding: 1px;
  &.max {
    // transition: all .5s;
    width: unset !important;
    height: unset !important;
    transform: unset;
    top: 0;
    left: 0;
    right: 0;
    bottom: 42px;
  }
  
  #dragHeader {
    width: 100%;
    height: 21px;
    display: flex;
    align-items: center;
    
    justify-content: space-between;
    box-sizing: border-box;
    background: linear-gradient(to right, #17246b, #A6CAF0);
    padding: 0px 5px;
    position: relative;
    cursor: default;
  
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
      line-height: 10px;
      height: 13px;
      width: 14px;
      margin-left: 5px;
      box-sizing: border-box;
    }
  };

  #dragHeader2 {
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
  
  #dragBody {
    width: 100%;
    flex: 1;
    background-color: var(--cd0);
    box-sizing: border-box;
    // border-left: 1px solid var(--cd1);
  }
}
</style>