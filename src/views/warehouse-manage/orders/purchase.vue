<template>
  <el-row>
    <div class="app-container">
      <create :product_id="product_id"></create>
    </div>
    
  
  </el-row>
</template>

<script>
import Create from "@/views/warehouse-manage/purchase/components/create.vue"
export default {
    name:'Purchase',
    data(){
      return {
        product_id:0,
      }
    },
    components:{
        Create
    },created(){
      this.product_id = Number(this.$route.params.product_id) 
    }
}
</script>

<style>

</style>