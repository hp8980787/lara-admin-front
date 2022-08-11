<template>
  <el-row>
    <el-col :span="24">
        <div class="app-container">
           <div class="app-header">
            <el-button type="primary">新增</el-button>
           </div>
        </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
    name:'billWrite',
    data(){
        return{
            form:{}
        }
    }
}
</script>

<style>

</style>