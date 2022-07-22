<template>
  <el-row>
    <el-col :span="24">
      <div class="app-container">
        <el-button type="success" @click="createDepartment()">创建</el-button>
        <div class="container">
          <el-table :data="table">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="name" prop="name"></el-table-column>
            <el-table-column label="path" prop="path"></el-table-column>
            <el-table-column label="父级" prop="parent_id"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="editDepartment(scope.row)"
                  >修改</el-button
                >
                <el-popconfirm
                  title="确定删除吗"
                  style="margin-left: 2px"
                  @onConfirm="deleteDepartment(scope.row)"
                >
                  <el-button slot="reference" size="mini" type="warning"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
    <el-dialog :visible.sync="visiableDialog" :title="title">
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item
          label="name"
          prop="name"
          :rules="{ required: true, message: '必须', trigger: 'blur' }"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="选择父级" prop="parent_id" :rules="parent">
          <div class="block">
            <el-cascader
              v-model="form.parent_id"
              :options="options"
              @change="handleChange"
              :props="{ checkStrictly: true }"
            ></el-cascader>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button v-if="type === 'add'" @click="submit" type="success"
            >提交</el-button
          >
          <el-button v-else @click="submit" type="success">edit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import { getList } from "@/api/personner/department";
import { create } from "@/api/personner/department";
import { list } from "@/api/personner/department";
import { update } from "@/api/personner/department";
import { destroy } from "@/api/personner/department";
export default {
  name: "index",
  data() {
    const validateParent = (rule, value, callback) => {
      if (!value) {
        callback(new Error("必选"));
      }

      callback();
    };
    return {
      title: "",
      type: "",
      table: [],
      visiableDialog: false,
      form: {},
      parent: {
        required: true,
        message: "必须",
        trriger: "change",
        validator: validateParent,
      },
      options: [],
    };
  },
  mounted() {
    this.list();
    this.getOptions();
  },
  methods: {
    getOptions(params) {
      list(params).then((response) => {
        let data = response.data;
        let options = [
          {
            label: "顶级分类",
            value: "0",
            children: [],
          },
        ];
        // options[0].children =data
        for (let i in data) {
          options[0].children.push(data[i]);
        }
        this.options = options;
      });
    },
    list(params) {
      getList(params).then((response) => {
        this.table = response.data;
      });
    },
    createDepartment() {
      this.title = "创建部门";
      this.type = "add";
      this.visiableDialog = true;
    },
    editDepartment(row) {
      this.title = "修改部门信息";
      this.type = "edit";
      let newdata = JSON.parse(JSON.stringify(row));
      this.form = newdata;
      let father = newdata.path.split("-").filter((x) => x);
      // father.pop();
      this.form.parent_id = father;
      console.log(this.form, father);
      this.visiableDialog = true;
    },
    submit(row) {
      console.log(this.form);
      this.$refs.form.validate((valid) => {
        if (this.type === "add") {
          if (valid) {
            create(this.form).then((response) => {
              this.$message({ type: "success", message: "新增成功" });
              this.visiableDialog = false;
              this.list();
              this.form = {};
            });
          }
        } else {
          update(this.form, this.form.id).then((response) => {
            console.log(response);
            this.visiableDialog = false;
            this.form = {};
            this.getOptions();
            this.$message({ type: "success", message: "修改成功" });
            this.list();
          });
        }
      });
    },
    handleChange(value) {},
    deleteDepartment(row) {
      destroy(row.id).then((response) => {
        this.$message({ type: "success", message: "删除成功!" });
        this.list();
      });
    },
  },
};
</script>

<style>
</style>