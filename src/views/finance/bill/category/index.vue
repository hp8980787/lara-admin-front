<template>
  <el-row>
    <el-col :span="24">
      <div class="app-container">
        <div class="app-header">
          <el-button type="primary" @click="create">新增</el-button>
        </div>
        <div class="app-body"></div>
      </div>
    </el-col>
    <el-dialog :visible.sync="formDialogVisiable" title="新增分类">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="name" prop="name" :rules="{required:true,message:'必须'}">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input  type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="type === 'add'" type="primary" @click="submit()">提交</el-button>
          <el-button v-else type="primary" @click="submit()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: "billCategory",
  data() {
    return {
      table: [],
      form: {},
      formDialogVisiable: false,
      type: "",
    };
  },
  created() {},
  methods: {
    create() {
      this.formDialogVisiable = true;
      this.type = "add";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>>

