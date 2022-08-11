<template>
  <el-row>
    <el-col :span="24">
      <div class="app-container" v-loading="loading">
        <div class="app-heaeder">
          <el-button type="primary" @click="create">新增账本</el-button>
        </div>
        <div class="app-body">
          <el-table :data="table">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="id" prop="id" width="50px"></el-table-column>
            <el-table-column label="name" prop="name" ></el-table-column>
            <el-table-column label="描述" prop="description" ></el-table-column>
            <el-table-column label="icon" prop="icon" ></el-table-column>
            <el-table-column label="创建者" prop="user.name" ></el-table-column>
            <el-table-column label="状态" prop="status" >
              <template slot-scope="scope">
                  <el-tag v-if="scope.row.status===1" type="success">启用</el-tag>
                  <el-tag v-else type="danger">禁用</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="created_at" ></el-table-column>
            <el-table-column label="操作">
              <el-button size="mini" type="primary">修改</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
    <el-col>
      <el-dialog :title="title" :visible.sync="formDialogVisible">
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item
            label="name"
            prop="name"
            :rules="{ required: true, message: '必须' }"
          >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item
            label="选择父类"
            prop="parent_id"
            :rules="{ required: true, message: '必须' }"
          >
            <el-select v-model="form.parent_id">
              <el-option label="顶级账本" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-tooltip
              :content="form.status === 1 ? '启用' : '关闭'"
              placement="top"
            >
              <el-switch
                v-model="form.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit" type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import { store } from "@/api/finance/bill/ledger";
import { index } from "@/api/finance/bill/ledger";
export default {
  name: "ledger",
  data() {
    return {
      form: {
        status: 1,
      },
      formDialogVisible: false,
      title: "",
      type: "",
      loading: true,
      table:[],
    };
  },
  created() {
    this.list();
  },
  methods: {
    list() {
      index().then((response) => {
        if (response.code === 200) {
          this.loading = false;
          this.table = response.data;
        }
      });
    },
    create() {
      this.formDialogVisible = true;
      this.title = "新增账本";
      this.type = "add";
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.type === "add") {
            this.loading = true;
            store(this.form).then((response) => {
              if (response.code === 200) {
                this.$message({ type: "success", message: "添加成功" });
                this.formDialogVisible = false;
                this.loading = false;
              }
            });
          }
        }
      });
    },
  },
};
</script>

<style>
</style>