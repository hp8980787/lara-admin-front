<template>
  <el-row>
    <el-col :span="24">
      <div class="app-container" v-loading="loading">
        <el-table :data="table">
            <el-table-column label="id" prop="id" width="100px"></el-table-column>
            <el-table-column label="仓库" prop="storehouse.name"></el-table-column>
            <el-table-column label="产品sku" prop="product.sku"></el-table-column>
            <el-table-column label="产品id" prop="product.id" width="100px"></el-table-column>
            <el-table-column label="产品图片" >
                <template slot-scope="scope">
                    <img :src="scope.row.product.cover_img" width="80px" :alt="scope.row.product.jianjie1">
                </template>
            </el-table-column>
            <el-table-column label="数量" prop="quantity" width="100px"></el-table-column>
            <el-table-column label="审核人" prop="reviewer.name"></el-table-column>
            <el-table-column label="状态" >
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status==='in'" type="success">入库</el-tag>
                    <el-tag v-else type="danger">出库</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="created_at" ></el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getList } from "@/api/warehouse-manage/record";
export default {
  name: "record",
  data() {
    return {
      table: [],
      loading: true,
    };
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
        console.log(response)
      });
    },
  },
};
</script>

<style>
</style>