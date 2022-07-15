<template>
  <el-row>
    <el-col :span="24">
      <div class="app-container">
        <div class="header">
          <div class="search">
            <el-input v-model="search" placeholder="请输入搜索内容"></el-input>
          </div>
          <div class="link-button">
            <el-button
              type="primary"
              @click.native="linkProducts"
              icon="el-icon-link"
              >关联</el-button
            >
          </div>
        </div>

        <el-table
          ref="ordersTable"
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
            width="250"
          >
            <template slot-scope="scope">
              <div
                class="productCode"
                v-if="scope.row.edit"
                :key="scope.$index"
              >
                <el-input v-model="scope.row.product_code"></el-input>
                <el-button
                  v-if="scope.row.edit"
                  type="primary"
                  @click.native="editDisable(scope.row, scope.$index)"
                  size="mini"
                  >取消</el-button
                >
              </div>
              <span v-else>{{ scope.row.product_code }}</span>
            </template>
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
              <el-button
                type="text"
                size="small"
                @click.native="tableEdit(scope.row, scope.$index)"
                >编辑</el-button
              >
              <el-button
                v-if="scope.row.edit"
                @click.native="rowSave(scope.row, scope.$index)"
                type="success"
                size="small"
                >保存</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 个人信息modal -->
        <el-dialog
          title="顾客个人信息"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ orderUserInfo.name }}</span>
            </div>
            <div
              v-for="(info, key) in orderUserInfo"
              :key="key"
              class="text item"
            >
              <span>{{ key }} : {{ info }}</span>
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
import { update } from "@/api/warehouse-manage/order";
import { link } from "@/api/warehouse-manage/order";
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
      productCode: {},
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
      this.fetchData(this.params);
    },
    showBuyerInfo(row) {
      this.orderUserInfo = row.user_info;
      this.dialogVisible = true;
    },
    tableEdit(row, index) {
      this.ordersTable[index].edit = true;
      this.productCode[index] = row.product_code;
      if (!row.product_code) {
        let stringInfo = String(row.description);
        let patt1 = /([\w]+\_(Oth|Te|Ta|Se))/g;
        let pcode = stringInfo.match(patt1);
        this.ordersTable[index].product_code = pcode.join(";");
      } else {
        this.ordersTable[index].product_code = row.product_code;
      }
    },
    editDisable(row, index) {
      row.product_code = this.productCode[index];
      this.$refs.ordersTable.toggleRowSelection(row);
      this.ordersTable[index].edit = false;
    },
    rowSave(row, index) {
      let productCode = row.product_code;
      let pattern = /([\w\_\-\+\=]+\|\d)/g;
      productCode = String(productCode)
        .split(",")
        .filter((v) => pattern.exec(v));
      if (productCode.length < 1) {
        this.$message({ type: "error", message: "格式错误" });
      } else {
        update(row, row.id).then((response) => {
          console.log(response);
          this.$message({ type: "success", message: "修改成功!" });
          this.ordersTable[index] = response.data;
          this.ordersTable[index].edit = false;
          this.$refs.ordersTable.toggleRowSelection(row);
        });
      }
      console.log(productCode);
    },
    linkProducts() {
      let data = this.$refs.ordersTable.selection;
      let ids = data.map((v) => v.id);
        link({id:ids}).then(response=>{
          console.log(response)
        })
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  div {
    .search {
      width: 200px;
    }
    margin: 0 10px 0 0px;
  }
}
</style>