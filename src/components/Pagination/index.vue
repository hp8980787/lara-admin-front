<template>
  <el-pagination
    background
    layout="prev, pager, next,sizes"
    :total="total"
    :page-size="10"
    :page-sizes="pageSizes"
    @current-change="pageChange"
    @size-change="sizeChange"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      type: Object,
      default: 0,
    },
  },
  data() {
    return {
      total: 0,
      links: [],
      meta: [],
      pageSizes: [10, 20, 40, 60, 80, 100],
    };
  },
  created() {
    this.pageSizes = this.pageSizes ? this.pageSizes : [10, 20, 40, 50, 60];
    this.links = this.page.links;
    this.meta = this.page.meta;
    this.total = this.meta.total;
  },
  methods: {
    nextPageEvent() {
      alert("next");
    },
    lastPageEvent() {
      console.log("last");
    },
    pageChange(current) {
      this.$emit("changePage", { page: current, type: "page" });
    },
    sizeChange(size) {
      this.$emit("changePage", { perPage: size, type: "perPage" });
    },
  },
};
</script>

<style>
</style>