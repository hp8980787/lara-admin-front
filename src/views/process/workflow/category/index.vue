<template>
  <el-row>
    <el-col :span="24">
      <div class="app-container">
        <el-button type="primary" @click="formAdd">新增</el-button>
        <el-table :data="tableData">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="name" prop="name"></el-table-column>
          <el-table-column label="创建时间" prop="created_at"></el-table-column>
          <el-table-column label="更新时间" prop="updated_at"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="edit(scope.row)"
                >修改</el-button
              >
              <el-popconfirm
                title="确定删除吗?"
                @confirm="categoryDelete(scope.row)"
              >
                <el-button slot="reference" type="danger" size="mini"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-dialog :title="title" :visible.sync="formVisbleDialog">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item
          label="分类名称"
          prop="name"
          :rules="{ required: true, message: '必须' }"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit()">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import { index } from "@/api/workflow/category";
import { store } from "@/api/workflow/category";
import { update } from "@/api/workflow/category";
import { destroy } from "@/api/workflow/category";
export default {
  name: "WorkflowCategory",
  data() {
    return {
      tableData: [],
      type: "",
      title: "",
      formVisbleDialog: false,
      form: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      index().then((response) => {
        this.tableData = response.data;
      });
    },
    formAdd() {
      this.title = "新增分类";
      this.formVisbleDialog = true;
      this.type = "add";
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.type === "add") {
            store(this.form).then((response) => {
              this.formVisbleDialog = false;
              this.form = {};
              this.getList();
              this.$message({ type: "success", message: "成功" });
            });
          }
          if (this.type === "edit") {
            update(this.form, this.form.id).then((response) => {
              this.$message({ type: "success", message: "成功" });
              this.formVisbleDialog = false;
              this.form = {};
              this.getList();
            });
          }
        }
      });
    },
    edit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.type = "edit";
      this.formVisbleDialog = true;
      this.title = "修改分类";
    },
    categoryDelete(row) {
      destroy(row, row.id).then((response) => {
        this.$message({ type: "success", message: "成功" });
        this.formVisbleDialog = false;
        this.form = {};
        this.getList();
      });
    },
  },
};
</script>

<style>
</style>