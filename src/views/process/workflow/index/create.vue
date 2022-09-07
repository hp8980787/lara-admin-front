<template>
  <el-row>
    <el-col :span="24">
      <div class="workflow-create">
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item
            label="name"
            prop="name"
            :rules="{ required: true, message: '必须' }"
          >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item
            label="分类"
            prop="category_id"
            :rules="{ required: true, message: '必须' }"
          >
            <el-select v-model="form.category_id">
                
              <el-option
                v-for="(item, key) in categories"
                :key="key"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sort" :rules="{required:true,message:'必须'}">
            <el-select v-model="form.sort">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch
              v-model="form.status"
              active-text="启用"
              inactive-text="关闭"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { index as categoryList } from "@/api/workflow/category";
export default {
  name: "WorkflowCreate",
  data() {
    return {
      form: {},
      categories: {},
    };
  },
  created() {
    this.category();
  },
  methods: {
    category() {
      categoryList({ hasPage: false }).then((response) => {
        this.categories = response.data;
      });
    },
  },
};
</script>

<style>
.workflow-create {
  width: 50%;
}
</style>