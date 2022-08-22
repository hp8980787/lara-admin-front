<template>
  <el-row>
    <el-col :span="24">
      <div class="app-container">
        <div class="app-header">
          <el-button style="margin-right: 5px" type="primary" @click="create"
            >记账</el-button
          >
          <div class="filter">
            <div>
              <el-select v-model="params.category_id">
                <el-option label="所有分类" value="0"></el-option>
                <el-option
                  v-for="(item, key) in category"
                  :label="item.name"
                  :value="item.id"
                  :key="key"
                ></el-option>
              </el-select>
            </div>

            <div>
              <el-date-picker
                v-model="params.time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
            <div>
              <el-select v-model="params.status" placeholder="选择类型">
                <el-option label="收入" value="1"></el-option>
                <el-option label="支出" value="0"></el-option>
              </el-select>
            </div>
            <div>
              <el-button type="primary" @click="filterSubmit">提交</el-button>
              <el-button type="primary" @click="params={}">重置</el-button>
            </div>
          </div>
        </div>
        <div class="app-body">
          <div class="bill" v-for="(item, key) in tableData" :key="key">
            <el-descriptions :title="item.category.name">
              <el-descriptions-item label="分类">{{
                item.category.name
              }}</el-descriptions-item>
              <el-descriptions-item label="类型">
                <el-tag size="small" v-if="item.status === 1">收入</el-tag>
                <el-tag size="small" v-else type="warning">支出</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="所属账本">
                {{ item.bill.name }}</el-descriptions-item
              >
              <el-descriptions-item label="金额">
                <el-tag size="small">{{ item.amount }} $</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="记录人">
                <el-tag size="small">{{ item.writer.name }} </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="审核人">
                <el-tag size="small">''</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="备注">
                {{ item.remark }}
              </el-descriptions-item>
              <el-descriptions-item label="时间">
                {{ item.created_at }}
              </el-descriptions-item>
              <el-descriptions-item
                v-for="(value, k) in item.values"
                :key="k"
                :label="value.label"
              >
                {{ value.pivot.value }}
              </el-descriptions-item>
            </el-descriptions>
            <el-divider></el-divider>
          </div>
        </div>
      </div>
    </el-col>
    <el-dialog :title="title" :visible.sync="formDialogVisible">
      <el-form
        v-loading="formLoading"
        :model="form"
        ref="form"
        label-width="100px"
      >
        <el-form-item
          label="选择账本"
          prop="bill_id"
          :rules="{ required: true, message: '必须' }"
        >
          <el-select v-model="form.bill_id" size="medium">
            <el-option
              v-for="(item, index) in ledger"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类"
          prop="category_id"
          :rules="{ required: true, message: '必须' }"
        >
          <el-select v-model="form.category_id">
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
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item
          label="金额"
          prop="amount"
          :rules="{ required: true, message: '必须' }"
        >
          <el-input v-model="form.amount" placeholder="请输入美金"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea"></el-input>
        </el-form-item>
        <parser v-if="formInit" :form-conf="formJson" @submit="submit" />
        <el-form-item v-if="!formInit">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import { list as BillCategory } from "@/api/finance/bill/category";
import { index as billList } from "@/api/finance/bill/ledger";
import { store } from "@/api/finance/bill/billItems";
import { index as list } from "@/api/finance/bill/billItems";
import Parser from "form-gen-parser";
export default {
  name: "billWrite",
  components: {
    Parser,
  },
  data() {
    return {
      form: {
        status: 1,
      },
      params: {},
      formDialogVisible: false,
      title: "",
      type: "",
      tableData: "",
      category: {},
      ledger: {},
      formJson: {},
      formInit: false,
      formLoading: false,
      billCategory: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value2: "",
    };
  },
  watch: {
    "form.category_id"(newData, oldData) {
      this.formJson = {};
      this.formInit = false;
      this.formLoading = true;
      if (this.category.filter((v) => v.id === newData)[0].form != null) {
        this.formJson = JSON.parse(
          this.category.filter((v) => v.id === newData)[0].form
        );
        this.formInit = true;
      }
      this.formLoading = false;
    },
  },
  created() {
    this.getBillCategory();
    this.getBillList();
    this.getList()
  },
  methods: {
    getList(){
       list(this.params).then((response) => {
        let data = response.data;
        this.tableData = data.data;
      });
    },
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
    submit(data) {
      this.form["data"] = data;
      this.$refs.form.validate((valid) => {
        if (valid) {
          store(this.form).then((response) => {
            this.formDialogVisible = false;
            this.$message({ type: "success", message: "添加成功" });
          });
        }
      });
    },
    filterSubmit() {
      list(this.params).then((response) => {
        let data = response.data;
        this.tableData = data.data;
      });
    },
  },
};
</script>

<style lang="scss">
.app-body {
  margin-top: 15px;
  .bill {
    margin: 10px;
  }
}
.filter {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  div {
    margin: 0 5px 0 0;
  }
}
</style>