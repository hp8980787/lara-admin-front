<template>
  <div>
    <el-transfer
      filterable
      filter-placeholder="请输入字段名称"
      v-model="value"
      :data="data"
      :titles="['所有字段', '要添加的字段']"
    >
      <el-pagination
        slot="left-footer"
        small
        layout="prev, pager, next"
        :total="page.total"
        :page-size="1"
        @current-change="pageCurrent"
      >
      </el-pagination>
    </el-transfer>
  </div>
</template>

<script>
import { index } from "@/api/finance/bill/column";
export default {
  name: "transfer",
  props: {
    selected: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      data: [],
      params: {
        perPage: 1,
      },
      page: {
        total: 0,
      },
      value: [],
    };
  },
  created() {
    this.value = this.selected;
    console.log(this.value)
    this.list();
  },
  methods: {
    list() {
      index(this.params).then((response) => {
        let data = response.data.data;
        this.page.total = response.data.meta.total;
        this.data = [];
        data.forEach((element) => {
          this.data.push({
            key: element.id,
            label: element.label,
          });
        });
      });
    },
    pageCurrent(page) {
      this.params.page = page;
      this.list();
    },
  },
};
</script>

<style>
</style>