<template>
  <el-row>
    <el-col :span="24">
      <div class="app-header">
        <div class="search" width="200px">
          <el-input v-model="params.search" width="200px"></el-input>
        </div>
        <div class="purchase">
          <el-button type="primary" @click="purchase">采购</el-button>
        </div>
      </div>
      <div class="app-container">
        <el-table
          :data="table"
          tooltip-effect="dark"
          ref="table"
          style="width: 100%"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="id" prop="id" width="80px"></el-table-column>
          <el-table-column
            label="sku"
            prop="sku"
            min-width="180px"
          ></el-table-column>
          <el-table-column
            label="pcode"
            prop="pcode"
            width="180px"
          ></el-table-column>
          <el-table-column label="pcodes" prop="pcodes"></el-table-column>
          <el-table-column label="分类" prop="category"></el-table-column>
          <el-table-column label="品牌" prop="brand"></el-table-column>
          <el-table-column label="封面图" prop="cover_img">
            <template slot-scope="scope">
              <img :src="scope.row.cover_img" width="80px" alt="" />
            </template>
          </el-table-column>
          <el-table-column label="dy" prop="dy"></el-table-column>
          <el-table-column label="dl" prop="dl"></el-table-column>
          <el-table-column label="type" prop="type"></el-table-column>
          <el-table-column label="szie" prop="size"></el-table-column>
          <el-table-column label="bzq" prop="bzq"></el-table-column>
          <el-table-column label="美元" prop="price_us"></el-table-column>
          <el-table-column label="欧元" prop="price_eu"></el-table-column>
          <el-table-column label="英镑" prop="price_uk"></el-table-column>
          <el-table-column label="日元" prop="price_jp"></el-table-column>
          <el-table-column label="简介1" prop="jianjie1"></el-table-column>
          <el-table-column label="简介2" prop="jianjie2"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column
            label="库存"
            prop="stock"
            fixed="right"
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary">edit</el-button>
              <el-button size="mini" type="warning">delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="app-footer">
        <page v-if="isLoading" :page="page" @changePage="paginator"></page>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getList } from "@/api/products";
import Page from "@/components/Pagination/index.vue";
export default {
  name: "index",
  components: {
    Page,
  },
  data() {
    return {
      table: [],
      params: {},
      page: {},
      isLoading: false,
    };
  },
  watch: {
    "params.search"(newValue, oldValue) {
      this.list(this.params);
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
        this.page.links = data.links;
        this.page.meta = data.meta;
        this.isLoading = true;
        console.log(this.page);
      });
    },
    paginator(value) {
      this.params[value.type] = value[value.type];
      this.list(this.params);
    },
    purchase() {
      // let url=``
      let select = this.$refs.table.selection;
      let options = [];
      select.forEach((val, key) => {
        options.push(val.id);
      });
      // options = options.join(",");
      console.log(options)
      this.$router.push({name:'orders.purchase',params:{product_id:options}})
    },
  },
};
</script>

<style lang="scss">
.app-header {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  div {
    margin: 0 5px 0 5px;
  }
  .search {
    width: 200px;
  }
}
.app-footer {
  margin: 5px;
}
</style>