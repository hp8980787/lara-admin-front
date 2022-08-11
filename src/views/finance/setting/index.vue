<template>
  <el-row>
    <router-view></router-view>
  </el-row>
</template>

<script>
export default {
  name: "billSetting",
  data() {
    return {
      activeName: "1",
    };
  },
};
</script>

<style>
</style>