<template>
  <el-row>
    <div class="app-container">
      <create :product_id="product_id"></create>
    </div>
  </el-row>
</template>

<script>
import Create from "@/views/warehouse-manage/purchase/components/create.vue";
export default {
  name: "Purchase",
  data() {
    return {
      product_id: 0,
    };
  },
  components: {
    Create,
  },
  created() {
    if (Array.isArray(this.$route.params.product_id)) {
      this.product_id = this.$route.params.product_id;
    } else {
      this.product_id = [this.$route.params.product_id];
    }
    console.log(this.product_id)
  },
};
</script>

<style>
</style>