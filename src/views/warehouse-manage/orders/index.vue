<template>
  <el-row>
    <el-col :span="24">
      <div class="app-container">
        <div class="search">
          <el-input v-model="search" placeholder="请输入搜索内容"></el-input>
        </div>

        <el-table
          :data="ordersTable"
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            align="center"
            label="id"
            prop="id"
            width="50"
          ></el-table-column>
          <el-table-column
            align="center"
            label="paypal交易id"
            prop="trans_id"
            width="200"
          ></el-table-column>
          <el-table-column
            align="center"
            label="本地订单号"
            prop="order_number"
            width="200"
          ></el-table-column>
          <el-table-column
            align="center"
            label="total"
            prop="total"
            width="80"
          ></el-table-column>
          <el-table-column align="center" label="购买人信息" width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click.native="showBuyerInfo(scope.row)"
                type="info"
                round
                >信息按钮</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="货币单位"
            prop="currency"
            width="80"
          ></el-table-column>
          <el-table-column
            align="center"
            label="美元总价"
            prop="total_usd"
            width="80"
          ></el-table-column>
          <el-table-column
            align="center"
            label="购买内容"
            prop="description"
            width="250"
          ></el-table-column>
          <el-table-column
            align="center"
            label="关联产品pcode"
            prop="product_code"
            width="200"
          >
          </el-table-column>
          <el-table-column
            label="IP"
            align="center"
            prop="ip"
            width="200"
          ></el-table-column>
          <el-table-column
            label="is_shipping"
            prop="is_shipping"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column
            label="is_shipping"
            prop="is_shipping"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 个人信息modal -->

        <el-dialog title="顾客个人信息" :visible.sync="dialogVisible" width="30%">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ orderUserInfo.name }}</span>
            </div>
            <div v-for="(info,key) in orderUserInfo" :key="key" class="text item">
            <span>{{ key }} : {{ info}}</span>
            </div>
          </el-card>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </el-col>
    <el-col :span="12">
      <page v-if="isLoad" :page="pageObject" @changePage="pagination"></page>
    </el-col>
  </el-row>
</template>

<script>
import { getList } from "@/api/warehouse-manage/order";
import Page from "@/components/Pagination";

export default {
  name: "Orders",
  components: {
    Page,
  },
  data() {
    return {
      ordersTable: [],
      listLoading: true,
      pageObject: {},
      isLoad: false,
      params: {},
      search: "",
      dialogVisible: false,
      orderUserInfo: {},
    };
  },
  watch: {
    search(newValue, oldValue) {
      this.params["search"] = newValue;
      this.isLoad = false;
      this.fetchData(this.params);
    },
  },
  created() {
    this.params = {
      perPage: 10,
    };
    this.fetchData(this.params);
  },
  methods: {
    fetchData(params) {
      this.listLoading = true;
      getList(params).then((response) => {
        let listData = response.data;
        this.ordersTable = listData.data;
        this.listLoading = false;
        this.pageObject["links"] = listData.links;
        this.pageObject["meta"] = listData.meta;
        this.isLoad = true;
      });
    },
    pagination(page) {
      this.params[page.type] = page[page.type];
      console.log(this.params);
      this.fetchData(this.params);
    },
    showBuyerInfo(row) {
      this.orderUserInfo = row.user_info;
      console.log(this.orderUserInfo);
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss">
.search {
  width: 200px;
  margin: 10px 0 10px 0;
}
</style>