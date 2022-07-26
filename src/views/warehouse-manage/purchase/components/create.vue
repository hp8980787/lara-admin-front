<template>
  <el-row>
    <el-col :span="24">
      <el-form
        :model="form"
        ref="form"
        v-loading="isLoading"
        label-width="100px"
        :rules="purchaseRules"
      >
        <el-form-item label="供应商" prop="supplier_id">
          <el-select v-model="form.supplier_id">
            <el-option
              v-for="(item, key) in supplierData"
              :key="key"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="留言" prop="remark">
          <el-input type="textarea" v-model="form.remark"> </el-input>
        </el-form-item>
        <el-form-item label="结束日期" prop="deadline">
          <el-date-picker
            v-model="form.deadline"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-form
        :inline="true"
        :model="items"
        class="demo-form-inline"
        size="mini"
        ref="itemsForm"
      >
        <div v-for="(item, key) in items.dynamicItems" :key="key">
          <el-form-item label="选择产品">
            <el-button
              size="mini"
              type="primary"
              @click.native="selectProduct(item, key)"
              >点击选择</el-button
            >
          </el-form-item>
          <el-form-item
            label="product_id"
            :prop="'dynamicItems.' + key + '.product'"
            :rules="itemRules.product_id"
          >
            <el-input v-model="item.product_id"></el-input>
          </el-form-item>

          <el-form-item
            label="选择仓库"
            :prop="'dynamicItems.' + key + '.storehouse_id'"
            :rules="{ required: true, message: '必须', trigger: 'blur' }"
          >
            <el-select v-model="item.storehouse_id">
              <el-option
                v-for="(item, key) in warehouseData"
                :key="key"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="item.explain"></el-input>
          </el-form-item>
          <el-form-item
            label="采购价格"
            :prop="'dynamicItems.' + key + '.price'"
            :rules="itemRules.price"
          >
            <el-input v-model="item.price" placeholder="请填写价格" width="70%">
              <el-select
                v-model="item.currency"
                slot="prepend"
                placeholder="选择货币"
                class="input-with-select"
              >
                <el-option label="人民币" value="CNY"></el-option>
                <el-option label="美金" value="USD"></el-option>
                <el-option label="欧元" value="EUR"></el-option>
                <el-option label="英镑" value="GBP"></el-option>
                <el-option label="日元" value="JPY"></el-option>
              </el-select>
              <el-button
                size="mini"
                slot="append"
                icon="el-icon-s-promotion"
                title="点击转换汇率"
                @click="rate(item, key)"
              ></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="采购数量">
            <el-input-number v-model="item.quantity"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click.prevent="remove(item, key)"
              >删除</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </el-col>
    <el-col :span="24" :offset="1" style="margin-top: 20px">
      <el-button type="primary" @click.native="add()">新增采购产品</el-button>

      <el-button type="success" @click="submit()">提交</el-button>
    </el-col>

    <el-dialog :visible.sync="visibleDialogProduct">
      <product-modal></product-modal>
    </el-dialog>
  </el-row>
</template>

<script>
import { getList } from "@/api/warehouse-manage/supplier";
import { getListAll as warehouseList } from "@/api/warehouse-manage/warehouse";
import ProductModal from "@/views/products/components/index.vue";
import { rate as rateExchange } from "@/api/rate";
import { validDeadline } from "@/utils/validate";
import { create as purchaseCreate } from "@/api/warehouse-manage/purchase";
export default {
  name: "create",
  props: {
    product_id: {
      type: Array,
      default: 0,
      required: false,
    },
  },
  components: {
    ProductModal,
  },
  data() {
    const validateDeadline = (rule, value, callback) => {
      if (!validDeadline(value)) {
        console.log(value);
        callback(new Error("结束时间必须大于当前时间"));
      } else {
        callback();
      }
    };
    const validateNumber = (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error("格式不正确"));
      } else {
        callback();
      }
    };
    return {
      form: {
        items: [],
      },
      supplierData: {},
      warehouseData: {},
      isLoading: true,
      visibleDialogProduct: false,
      items: {
        dynamicItems: [],
      },
      purchaseRules: {
        supplier_id: [{ required: true, message: "必须", trigger: blur }],
        title: [{ required: true, message: "必须", trigger: blur }],
        remark: [{ required: true, message: "必须", trigger: blur }],
        deadline: [
          { required: true, trigger: blur, validator: validateDeadline },
        ],
      },
      itemRules: {
        product_id: {
          required: true,
          trigger: "blur",
          validator: validateNumber,
        },
        price: { required: true, trigger: "blur", message: "必须" },
      },
    };
  },
  created() {
    this.supplierList();
    this.getWarehouse();
    if (this.product_id.length>0) {
      for(let i in this.product_id){
          this.items.dynamicItems.push({
        product_id: this.product_id[i],
        storehouse_id: "",
        price: "",
        quantity: 1,
        explain: "",
        currency: "CNY",
      });
      }
    
    }
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
        this.warehouseData = response.data;
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
        quantity: 1,
        explain: "",
        currency: "CNY",
      });
    },
    selectProduct(item, key) {
      this.visibleDialogProduct = true;
    },
    rate(item, index) {
      let currency = this.items.dynamicItems[index].currency;
      let price = this.items.dynamicItems[index].price;
      if (!price) {
        this.$message({
          type: "error",
          message: "请填写价格",
        });
        return false;
      }
      rateExchange({ currency: currency, price: price }).then((response) => {
        this.items.dynamicItems[index].price = response.data;
        this.items.dynamicItems[index].currency = "USD";
      });
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$refs.itemsForm.validate((valid) => {
            if (valid) {
              this.form.items = this.items.dynamicItems;
              purchaseCreate(this.form).then((response) => {
                this.$message({ type: "success", message: "创建成功" });
                this.$router.push("/warehouse/purchase");
              });
            } else {
              return false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style >
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
