<template>
  <el-row v-loading="loading">
    <el-col :span="24" class="purchase-header">
      <el-button type="primary">新增</el-button>
      <el-popconfirm 
        style="margin-left:5px"
        v-if="buttonShow"
        confirm-button-text="好的"
        cancel-button-text="不用了"
        icon="el-icon-info"
        icon-color="red"
        title="是否删除?"
      >
        <el-button slot="reference"  type="warning"
          >删除</el-button
        >
      </el-popconfirm>
    </el-col>
    <el-col :span="24">
      <el-table :data="table" @selection-change="selecttionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="expand">
            <template slot-scope="scope">
                <el-table :data="scope.row.items">
                    <el-table-column label="sku" prop="product.sku" ></el-table-column>
                    <el-table-column label="图片" prop="product.sku" >
                        <template slot-scope="res">
                            <img :src="res.row.product.cover_img" width="50px" alt="">
                        </template>
                    </el-table-column>
                       <el-table-column label="购买价格" prop="price"></el-table-column>
                    <el-table-column label="购买数量" prop="quantity"></el-table-column>
                    <el-table-column label="购买总价" prop="amount"></el-table-column>
                    <el-table-column label="仓库" prop="warehouse.name"></el-table-column>
                </el-table>
            </template>
        </el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="title" label="采购标题"></el-table-column>
        <el-table-column prop="remark" label="采购留言"></el-table-column>
        <el-table-column prop="deadline_at" label="截止时间"></el-table-column>
        <el-table-column prop="complete_at" label="完成时间"></el-table-column>
        <el-table-column prop="user.name" label="创建人"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="status(scope.row.status)">{{
              scope.row.status_text
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column label="操作">
            <el-button type="success">批准</el-button>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { getList } from "@/api/warehouse-manage/purchase";
export default {
  name: "index",
  data() {
    return {
      table: [],
      loading: true,
      buttonShow: false,
    };
  },
  computed: {
    status() {
      return (value) => {
        switch (value) {
          case 0:
            return "danger";
          case 1:
            return "primary";
          case 2:
            return "success";
        }
      };
    },
  },
  created() {
    this.list();
  },
  methods: {
    list(params) {
      getList(params).then((response) => {
        let data = response.data;
        this.table = data.data;
        this.loading = false;
      });
    },
    selecttionChange(selection) {
      if (selection.length > 0) {
        this.buttonShow = true;
      } else {
        this.buttonShow = false;
      }
    },
  },
};
</script>

<style lang="css">
.purchase-header {
  margin: 10px 0 10px 10px;
}
</style>
