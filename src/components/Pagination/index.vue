<template>
  <el-pagination
    background
    layout="prev, pager, next,sizes"
    :total="total"
    :page-size="size"
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
    },
    pageSizeProp: {
      type: Array,
      default: () => [],
      required: false,
    },
    sizeProp: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      total: 0,
      links: [],
      meta: [],
      pageSizes: [10, 15,20,25, 30, 50, 60, 80, 100],
      size: 10,
    };
  },
  created() {
    console.log(this.page)
    this.pageSizes =
      this.pageSizeProp.length > 0 ? this.pageSizeProp : this.pageSize;
    this.size = this.sizeProp ?? this.size;
    this.links = this.page.links;
    this.meta = this.page.meta;
    this.total = this.meta.total;
    this.size = this.meta.paerPage
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