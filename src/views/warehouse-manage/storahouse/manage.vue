<template>
  <el-row v-loading="loading">
    <el-col :span="24">
      <div class="app-container">
        <el-button type="success" @click="add">添加</el-button>
        <el-table :data="table">
          <el-table-column label="id" prop="id"> </el-table-column>
          <el-table-column label="name" prop="name"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="success" @click="edit(scope.row)" size="mini"
                >编辑</el-button
              >
              <el-popconfirm
                confirm-button-text="好的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确认删除吗？"
                @onConfirm="deleteWarehouse(scope.row)"
              >
                <el-button slot="reference" type="warning" size="mini"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :visible.sync="visiableDialog" :title="title">
          <el-form :model="form" ref="form" label-width="100px">
            <el-form-item
              label="name"
              prop="name"
              :rules="{ required: true, trrige: 'blur', message: '必须' }"
            >
              <el-input v-model="form.name" placeholder="name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-if="type === 'add'" @click="submit" type="primary"
                >提交</el-button
              >
              <el-button v-else @click="submit" type="primary">修改</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-col>
    <el-col :span="24">
      <page
        v-if="loading === false"
        :page="page"
        
        @changePage="paginator"
      ></page>
    </el-col>
  </el-row>
</template>

<script>
import { getList } from "@/api/warehouse-manage/warehouse";
import { create } from "@/api/warehouse-manage/warehouse";
import { update } from "@/api/warehouse-manage/warehouse";
import { destroy } from "@/api/warehouse-manage/warehouse";
import Page from "@/components/Pagination";
export default {
  name: "index",
  data() {
    return {
      table: [],
      form: {},
      visiableDialog: false,
      title: "",
      type: "",
      page: {},
      loading: true,
      params:{},
    };
  },
  components: {
    Page,
  },
  created() {
    this. params = { perPage: 15 };
    this.list(this. params);
  },
  methods: {
    list(params) {
      getList(params).then((response) => {
        let data = response.data;
        this.table = data.data;
        this.page["links"] = data.links;
        this.page["meta"] = data.meta;
        this.loading = false;
        console.log(this.page);
      });
    },
    add() {
      this.visiableDialog = true;
      this.title = "新增仓库";
      this.type = "add";
    },
    edit(row) {
      this.form = row;
      this.title = "编辑仓库";
      this.type = "edit";
      this.visiableDialog = true;
    },
    deleteWarehouse(row) {
      destroy(row.id).then((response) => {
        this.$message({ type: "success", message: "删除成功" });
        this.list();
      });
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.type === "add") {
            create(this.form).then((response) => {
              this.$message({ type: "success", message: "成功" });
              this.visiableDialog = false;
              this.list();
            });
          } else {
            update(this.form, this.form.id).then((response) => {
              this.$message({ type: "success", message: "成功" });
              this.visiableDialog = false;
              this.form = {};
              this.list();
            });
          }
        }
      });
    },
    paginator(page) {
      
      this.params[page.type] = page[page.type];
      this.list(this.params);
    },
  },
};
</script>

<style>
</style>