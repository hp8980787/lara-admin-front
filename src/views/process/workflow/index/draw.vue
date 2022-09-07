<template>
  <el-row>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <div class="app-container">
      <div class="container-draw" ref="container"></div>
      <el-button type="primary">save</el-button>
    </div>
    <el-drawer
      :title="title"
      :visible.sync="drawerApplicant"
      :with-header="false"
    >
      <div class="drawer-body">
        <el-form :model="form.applicant" ref="form">
          <el-form-item label="选择用户">
            <el-select v-model="form.applicant.users" multiple>
              <el-option
                v-for="(user, key) in users"
                :key="key"
                :label="user.name"
                :value="user.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指定角色">
            <el-select v-model="form.applicant.roles">
              <el-option
                v-for="(item, key) in roles"
                :key="key"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <el-drawer :title="title" :visible.sync="drawerCheck" :with-header="false">
      <div class="drawer-body">
        <el-form :model="form.check" ref="form">
          <el-form-item label="选择用户">
            <el-select
              v-model="form.check.users"
              multiple
              @change="checkChange"
            >
              <el-option
                v-for="(user, key) in users"
                :key="key"
                :label="user.name"
                :value="user.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="审核方式">
            <el-select v-model="form.check.type" @change="checkChange()">
              <el-option label="顺序" value="1"></el-option>
              <el-option label="会签" value="2"></el-option>
              <el-option label="或签" value="3"></el-option>
              <el-option label="条件" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item> </el-form-item>
          <div class="col-6" v-if="form.check.type === '1'">
            <h3>审核顺序排序</h3>
            <draggable
              class="list-group"
              tag="ul"
              v-model="form.check.usersSort"
              v-bind="dragOptions"
              @start="isDragging = true"
              @end="isDragging = false"
            >
              <transition-group type="transition" name="flip-list">
                <li
                  class="list-group-item"
                  v-for="element in userSort"
                  :key="element.id"
                >
                  <i
                    :class="
                      element.fixed
                        ? 'fa fa-anchor'
                        : 'glyphicon glyphicon-pushpin'
                    "
                    @click="element.fixed = !element.fixed"
                    aria-hidden="true"
                  ></i>
                  {{ element.name }}
                </li>
              </transition-group>
            </draggable>
          </div>
        </el-form>
      </div>
    </el-drawer>
  </el-row>
</template>
<script>
import Draw from "@/components/Workflow/draw.js";
import draggable from "vuedraggable";
import { userList } from "@/api/user";
import { list as roleList } from "@/api/role";
export default {
  name: "WorkflowIndex",
  components: {
    draggable,
  },
  data() {
    return {
      active: 0,
      drawerApplicant: false,
      drawerCheck: false,
      title: "",
      node: {},
      users: {},
      form: {
        applicant: {},
        check: {},
      },
      roles: {},
      data: {},
      userSort: {},
    };
  },
  mounted() {
    userList().then((response) => {
      this.users = response.data.data;
    });
    roleList().then((response) => {
      this.roles = response.data;
    });
    let data = new Draw();
    this.lf = data.init(this.$refs.container);
    this.lf.on("node:click,edge:click", (data) => {
      //申请人
      if (data.data.type === "applicant") {
        this.applicant(data);
      }
      //审核人
      // console.log(data);
      if (data.data.type === "check") {
        this.check(data);
      }
      console.log(data);
    });
  },
  methods: {
    applicant(data) {
      this.drawerApplicant = true;
      this.title = "添加申请人";
      this.node = data;
    },
    check(data) {
      this.drawerCheck = true;
      this.node = data;
      this.title = "添加审核人";
    },
    checkChange() {
      this.userSort = this.users.filter(
        ($v) => this.form.check.users.indexOf($v.id) != -1
      );
      console.log(this.userSort);
    },
    save(type) {
      this.$message({ type: "success", message: "保存成功" });
      console.log(this.form);
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
};
</script>

<style lang="scss">
.container-draw {
  width: 1200px;
  height: 500px;
}
.drawer-body {
  padding: 20px;
}
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
  list-style: none;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>