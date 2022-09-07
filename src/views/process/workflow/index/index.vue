<template>
  <el-row>
    <el-col :span="24">
      <div class="app-container">
        <el-steps :active="active" finish-status="success">
          <el-step title="开始创建工作流(workflow)"></el-step>
          <el-step title="创建工作流"></el-step>
          <el-step title="创建工作流表单"></el-step>
          <el-step title="绘制工作流图"></el-step>
        </el-steps>
      </div>
    
    </el-col>
    <el-col :span="24">
     <create></create>
    </el-col>
     <el-col :span="24">
      <div class="app-container">
               <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
      </div>

     </el-col>
  </el-row>
</template>

<script>
import Create from "./create.vue"
export default {
  name: "WorkflowIndex",
  components:{
    Create
  },
   data() {
      return {
        active: 0
      };
    },
  mounted() {},
  methods:{
     next() {
        if (this.active++ > 2) this.active = 0;
      }
  }
};
</script>

<style>
.container {
  width: 1200px;
  height: 1000px;
}
</style>