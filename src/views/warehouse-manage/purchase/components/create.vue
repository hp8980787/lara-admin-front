<template>
  <el-row>
    <el-form :model="form" ref="form" v-loading="isLoading" label-width="100px">
      <el-form-item label="供应商">
        <el-select v-model="form.supplier_id">
          <el-option
            v-for="(item, key) in supplierData"
            :key="key"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采购标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="留言">
        <el-input type="textarea" v-model="form.remark"> </el-input>
      </el-form-item>
      <el-form-item label="选择结束日期">
        <el-date-picker
          v-model="form.deadline"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div class="purchase-header">
      <el-button type="info" size="mini" @click.native="add"
        >新增采购产品</el-button
      >
    </div>
    <el-form :inline="true" :model="items" class="demo-form-inline">
      <div v-for="(item, key) in items.dynamicItems" :key="key">
        <el-form-item label="选择产品">
          <el-input type="hidden" v-model="item.product"></el-input>
         <el-button type="info" @click.native="selectProduct(item,key)">点击选择</el-button>
        </el-form-item>
        <el-form-item label="选择仓库">
          <el-select v-model="item.storehouse_id">
            <el-option v-for="(item,key) in warehouseData" :key="key" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="item.explain"></el-input>
        </el-form-item>
        <el-form-item label="采购价格">
          <el-input v-model="item.price"></el-input>
        </el-form-item>
        <el-form-item label="采购数量">
          <el-input v-model="item.quantity"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click.prevent="remove(item, key)">删除</el-button>
        </el-form-item>
      </div>
    </el-form>

  </el-row>
</template>

<script>
import { getList } from "@/api/warehouse-manage/supplier";
import { getList as warehouseList } from "@/api/warehouse-manage/warehouse";
import ProductModal from "@/views/products/components/index.vue"
export default {
  name: "create",
  components:{
    ProductModal
  },
  data() {
    return {
      form: {},
      supplierData: {},
      warehouseData: {},
      isLoading: true,
      visibleDialogProduct:false,
      items: {
        dynamicItems: [],
      },
    };
  },
  created() {
    this.supplierList();
    this.getWarehouse();
  },
  methods: {
    supplierList() {
      getList().then((response) => {
        this.isLoading = false;
        this.supplierData = response.data;
      });
    },
    getWarehouse() {
      warehouseList().then((response) => {
        this.warehouseData = response.data
        console.log(this.warehouseData)
      });
    },
    remove(item, key) {
      this.items.dynamicItems.splice(key, 1);
    },
    add() {
      this.items.dynamicItems.push({
        product_id: "",
        storehouse_id: "",
        price: "",
        quantity: "",
        explain: "",
      });
    },selectProduct(item,key){
        this.visibleDialogProduct =true
    }
  },
};
</script>

<style lang="sass">
</style>
