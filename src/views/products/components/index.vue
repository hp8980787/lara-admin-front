<template>
  <el-table :data="table" highlight-current-row style="width: 100%">
    <el-table-column type="index" width="50"> </el-table-column>
    <el-table-column label="id" prop="id" width="100"></el-table-column>
    <el-table-column label="sku" prop="sku"></el-table-column>
    <el-table-column label="jianjie1" prop="jianjie1"></el-table-column>
  </el-table>
</template>

<script>
import { getList } from "@/api/products";
export default {
  name: "Index",
  //   props: {},
  data() {
    return {
      table: [],
    };
  },
  created() {
    this.productsList();
  },
  methods: {
    productsList() {
      getList().then((response) => {
        let data = response.data;
        this.table = data.data;
      });
    },
  },
};
</script>

<style>
</style>