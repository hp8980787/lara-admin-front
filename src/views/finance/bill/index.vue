<template>
  <el-row>
    <el-col :span="24">
      <div class="app-container">
        <div class="app-header">
          <el-button type="primary" @click="create">记账</el-button>
        </div>
      </div>
    </el-col>
    <el-dialog :title="title" :visible.sync="formDialogVisible">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="选择账本" prop="bill_id">
          <el-select v-model="form.bill_id" size="medium">
            <el-option
              v-for="(item, index) in ledger"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category">
            <el-option
              v-for="(item, index) in category"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="收入或支出" prop="status">
          <el-tooltip
            :content="form.status === '1' ? '收入' : '支出'"
            placement="top"
          >
            <el-switch
              v-model="form.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
            >
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入美金"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import { getList as BillCategory } from "@/api/finance/bill/category";
import { index as billList } from "@/api/finance/bill/ledger";

export default {
  name: "billWrite",
  data() {
    return {
      form: {},
      formDialogVisible: false,
      title: "",
      type: "",
      category: {},
      ledger: {},
    };
  },
  created() {
    this.getBillCategory();
    this.getBillList();
  },
  methods: {
    create() {
      this.type = "add";
      this.formDialogVisible = true;
      this.title = "新增记录";
    },
    getBillCategory() {
      BillCategory().then((response) => {
        this.category = response.data;
      });
    },
    getBillList() {
      billList().then((response) => {
        this.ledger = response.data;
      });
    },
  },
};
</script>

<style>
</style>