<template>
  <el-row>
    <div class="app-container">
      <div class="container" ref="container"></div>
    </div>
    <el-drawer :title="title" :visible.sync="drawer" :with-header="false">
      <div class="drawer-body">
        <el-form :model="form" ref="form">
          <el-form-item label="选择用户">
            <el-select v-model="form.users" multiple>
              <el-option
                v-for="(user, key) in users"
                :key="key"
                :label="user.name"
                :value="user.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指定角色">
            <el-select v-model="form.roles"></el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </el-row>
</template>
<script>
import Draw from "@/components/Workflow/draw.js";
import { userList } from "@/api/user";
export default {
  name: "WorkflowIndex",
  data() {
    return {
      drawer: false,
      title: "",
      node: {},
      users: {},
      form: {},
    };
  },
  mounted() {
    let data = new Draw();
    this.lf = data.init(this.$refs.container);
    this.lf.on("node:click,edge:click", (data) => {
      this.drawer = true;
      if (data.data.type === '"applicant"') {
        this.title = "添加申请人";
      }
      this.node = data;
      userList().then((response) => {
        this.users = response.data.data;
      });
      console.log(data);
    });
  },
};
</script>

<style lang="scss">
.container {
  width: 1200px;
  height: 1000px;
}
.drawer-body {
  padding: 20px;
}
</style>