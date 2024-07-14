<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
    <el-affix :offset="61">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="导航网址" name="nav" />
        <el-tab-pane label="变量" name="jz_setting" />
        <el-tab-pane label="账号信息" name="jz_logininfo" />
        <el-tab-pane label="任务类型" name="jz_tasktype" />
        <el-tab-pane label="新客服账号" name="new_logininfo" />
        <el-tab-pane label="3001账号" name="hj3001_logininfo" />
        <el-tab-pane label="4001账号" name="hj4001_logininfo" />
      </el-tabs>
    </el-affix>
    
        <el-table :border="true" table-layout=auto :data="tableData" style="flex: auto;">
          <el-table-column v-for="(value, key) in tableColData" :label="key.toString()" :prop="key.toString()" />
          <el-table-column fixed="right" width="100" style="border-top: 0;">
            <template #header>
                <el-button link type="primary" size="small" @click="insVal">点击新增行</el-button>
            </template>
            <template #default="scope">
              <el-button link type="primary" size="small" @click="updateVal(scope.$index)">修改</el-button>
              <el-button link type="primary" size="small" @click="delVal(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    
    <!-- 弹出框 -->
    <el-dialog v-model="dialogVisible" :title="updateDataText" width="500px">
      <el-form label-position="right" label-width="120px" :model="updateData">
        <el-form-item v-for="(value, key) in updateData" :label="key.toString()">
          <el-input v-model="updateData[key]" type="textarea" autosize/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="done">
            {{updateDataDo}}
          </el-button>
        </span>
      </template>
    </el-dialog>
    </template>
      
    <script lang="ts" setup>
    import { ref, watch } from 'vue'
    // import { ElMessageBox } from 'element-plus'
    import axios from 'axios'
    // import { useRoute } from 'vue-router';
    
    const activeName = ref('');
    const dialogVisible = ref(false)
    
    const tableColData = ref([] as any);
    const tableData = ref([] as any);
    
    watch(activeName, (nv, ov) => {
      reset();
    });
    const reset = () => {
      axios.get('/fastapi/api/get'+activeName.value).then((res)=>{
          tableColData.value = res.data.data[0];
          tableData.value = res.data.data;
          // props.show_msg(activeName.value+' 已载入');
      });
    };
    
    const updateDataDo = ref('');//执行的操作
    const updateDataText = ref('');//问候语
    const updateData = ref({} as any);//弹出框里的数据
    
    const updateVal = (n:number) => {//更新点击的数据
      if (tableData.value) {
        // updateData.value = { ...tableData.value[n] };
        updateData.value = Object.assign({}, tableData.value[n]);
        updateDataText.value = '数据库《'+activeName.value+'》=>修改项->《'+updateData.value["key"]+'》';
        updateDataDo.value = '修改';
        dialogVisible.value = true;
      };
    };
    const insVal = () => {
      if (tableData.value) {
        // updateData.value = { ...tableData.value[0] };
        updateData.value = Object.assign({}, tableData.value[0]);
        for (let key in updateData.value) {
          updateData.value[key] = '';
        }
        updateDataText.value = '数据库《'+activeName.value+'》=>新增项';
        updateDataDo.value = '新增';
        dialogVisible.value = true;
      };
    };
    const delVal = (n:number) => {
      if (tableData.value[n]["key"]) {
        updateData.value = {'是否确定删除':tableData.value[n]["key"]};
        updateDataText.value = '数据库《'+activeName.value+'》=>删除项->《'+tableData.value[n]["key"]+'》';
        updateDataDo.value = '删除';
        dialogVisible.value = true;
      };
    };
    const done = () => {
      let formdata = [] as any;
      let col = [] as any;
      for (let key in updateData.value) {
        formdata.push(updateData.value[key]);
        col.push(key);
      };
      if (updateDataDo.value == '新增') {
        axios.post('/fastapi/api/ins'+activeName.value,{"formdata":formdata,"col":col}).then((res)=>{
          // props.show_msg('数据库《'+activeName.value+'》->《'+formdata[0]+'》->已新增', 's');
        })
      } else if (updateDataDo.value == '修改'){
        axios.post('/fastapi/api/update'+activeName.value,{"formdata":formdata,"col":col}).then((res)=>{
          // props.show_msg('数据库《'+activeName.value+'》->《'+formdata[0]+'》->已修改', 's');
        });
      } else if (updateDataDo.value == '删除'){
        axios.get('/fastapi/api/del'+activeName.value+'?k='+formdata[0]).then((res)=>{
          // props.show_msg('数据库《'+activeName.value+'》->《'+formdata[0]+'》->已删除', 'w');
        });
      };
      dialogVisible.value = false;
      reset();
    };
    
    activeName.value = 'nav';
    </script>
    
    <style scoped>
    
    </style>