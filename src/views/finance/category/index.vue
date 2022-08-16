<template>
  <el-row>
    <el-col :span="24">
      <div class="app-container" v-loading="loading">
        <div class="app-header">
          <el-button type="primary" @click="create">新增</el-button>
        </div>
        <div class="app-body">
          <el-table :data="table" ref="table">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="name" prop="name"></el-table-column>
            <el-table-column
              label="description"
              prop="description"
            ></el-table-column>
            <el-table-column label="status">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{
                  scope.row.status === 1 ? "显示" : "不显示"
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="edit(scope.row)"
                  >编辑</el-button
                >
                <el-button size="mini" type="danger">删除</el-button>
                <el-button size="mini" type="primary" @click="assign(scope.row)"
                  >分配字段</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
    <el-dialog :visible.sync="formDialogVisiable" title="新增分类">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item
          label="name"
          prop="name"
          :rules="{ required: true, message: '必须' }"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="form">
          <el-input v-model="form.form" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-tooltip
            :content="form.status === 1 ? '启用' : '不启用'"
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
          <el-button v-if="type === 'add'" type="primary" @click="submit()"
            >提交</el-button
          >
          <el-button v-else type="primary" @click="submit()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="分配账单字段" :visible.sync="assignDialogVisible">
      <transfer :selected="selected" ref="transferChild" :key="timer"></transfer>
      <br />
      <el-button type="primary" @click="transferSubmit">提交</el-button>
    </el-dialog>
  </el-row>
</template>

<script>
import { store } from "@/api/finance/bill/category";
import { getList } from "@/api/finance/bill/category";
import { update } from "@/api/finance/bill/category";
import { assign } from "@/api/finance/bill/category";
import Transfer from "@/components/Transfer/Index.vue";

export default {
  name: "billCategory",
  components: {
    Transfer,
  },
  data() {
    return {
      table: [],
      form: {
        status: 1,
      },
      formDialogVisiable: false,
      type: "",
      loading: true,
      assignDialogVisible: false,
      selected: [],
      row: {},
      timer:'',
    };
  },
  created() {
    this.list();
  },
  methods: {
    list() {
      getList().then((response) => {
        this.loading = false;
        this.table = response.data;
      });
    },
    create() {
      this.formDialogVisiable = true;
      this.type = "add";
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.type === "add") {
            store(this.form).then((response) => {
              this.$message({ type: "success", message: "成功!" });
              this.form = {
                status: 1,
              };
              this.list();
              this.formDialogVisiable = false;
            });
          } else {
            update(this.form, this.form.id).then((response) => {
              this.$message({ type: "success", message: "修改成功!" });
              this.form = {
                status: 1,
              };
              this.list();
              this.formDialogVisiable = false;
            });
          }
        }
      });
    },
    edit(row) {
      let data = JSON.parse(JSON.stringify(row));
      this.form = data;
      this.formDialogVisiable = true;
    },
    assign(row) {
      this.assignDialogVisible = true;
      let data = [];
      this.selected=[];
      row.columns.forEach((element) => {
        data.push(element.id);
      });
      this.selected = data;
      this.timer = new Date().getTime()
      // console.log(this.selected);
      this.row = row;
    },
    transferSubmit() {
      let columns = this.$refs.transferChild.value;
      let data = {
        id: this.row.id,
        columns: columns,
      };
      assign(data).then((response) => {
        this.assignDialogVisible = false;
        this.$message({
          type: "success",
          message: "分配成功",
        });
        this.list();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>>

