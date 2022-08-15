<template>
  <el-row>
    <el-col :span="24">
      <div class="app-container" v-loading="loading">
        <div class="app-header">
          <el-button type="primary" @click="create">新增</el-button>
        </div>
        <div class="app-body">
          <el-table :data="table">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="字段名" prop="name"></el-table-column>
            <el-table-column label="名称" prop="label"></el-table-column>
            <el-table-column label="是否显示" prop="active">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.active===1" type="success">显示</el-tag>
                <el-tag v-else type="dangger">隐藏</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="必须" prop="required">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.active===1" type="success">必须</el-tag>
                <el-tag v-else type="danger">非必要</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" >
              <template slot-scope="scope">
                <el-button type="primary" size="mini"  @click="edit(scope.row)">修改</el-button>
                <el-button type="danger" size="mini"  @click="destroy(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
    <el-dialog :title="title" :visible.sync="formDialogVisible">
      <el-form :model="form" label-width="100px" ref="form">
        <el-form-item
          label="字段名"
          prop="name"
          :rules="{ required: true, message: '必须' }"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="label" prop="label">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="字段启用" prop="active">
          <el-tooltip
            :content="form.active === '1' ? '启用' : '隐藏'"
            placement="top"
          >
            <el-switch
              v-model="form.active"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
            >
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="字段值必须" prop="active">
          <el-tooltip
            :content="form.active === '1' ? '必须' : '非必要'"
            placement="top"
          >
            <el-switch
              v-model="form.required"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
            >
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import { index } from "@/api/finance/bill/column";
import { store } from "@/api/finance/bill/column";
export default {
  name: "column",
  data() {
    return {
      table: [],
      loading: true,
      type: "",
      form: {
        active: "1",
        required: "1",
      },
      title: "",
      formDialogVisible: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    formInit() {
      this.form = {
        active: "1",
      };
    },
    getList() {
      index().then((response) => {
        if (response.code === 200) {
          let data = response.data;
          this.table = data.data;
          console.log(response);
          this.loading = false;
        }
      });
    },
    create() {
      this.title = "新增账本字段";
      this.type = "add";
      this.formDialogVisible = true;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          store(this.form).then((response) => {
            this.$message({ type: "success", message: "成功" });
            this.formDialogVisible = false;
            this.getList()
          });
        }
      });
    },
  },
};
</script>

<style>
</style>