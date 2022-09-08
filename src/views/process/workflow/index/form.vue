<template>
  <el-row>
    <el-col :span="12">
      <el-form :model="formJsModel" ref="formJs" label-width="100px">
        <el-form-item label="表单json">
          <el-input v-model="formJsModel.json"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- <parser :form-conf="formConf" @submit="sumbitForm1" /> -->

    <el-button> change </el-button>
  </el-row>
</template>

<script>
import Parser from "form-gen-parser";
export default {
  name: "WorkflowForm",
  components: {
    Parser,
  },
  data() {
    return {
      formJsModel: {},
      formConf: {
        fields: [
          {
            __config__: {
              label: "请假人",
              labelWidth: null,
              showLabel: true,
              changeTag: true,
              tag: "el-input",
              tagIcon: "input",
              required: true,
              layout: "colFormItem",
              span: 24,
              document: "https://element.eleme.cn/#/zh-CN/component/input",
              regList: [],
              formId: 104,
              renderKey: 1662602311831,
            },
            __slot__: {
              prepend: "",
              append: "",
            },
            placeholder: "请输入请假人",
            style: {
              width: "50%",
            },
            clearable: true,
            "prefix-icon": "",
            "suffix-icon": "",
            maxlength: null,
            "show-word-limit": false,
            readonly: false,
            disabled: false,
            __vModel__: "user",
          },
          {
            __config__: {
              label: "请假时间",
              tag: "el-date-picker",
              tagIcon: "date",
              defaultValue: null,
              span: 24,
              showLabel: true,
              layout: "colFormItem",
              labelWidth: null,
              required: true,
              regList: [],
              changeTag: true,
              document:
                "https://element.eleme.cn/#/zh-CN/component/date-picker",
              formId: 120,
              renderKey: 1662605844906,
            },
            placeholder: "选择请请假时间",
            type: "datetime",
            style: {
              width: "50%",
            },
            disabled: false,
            clearable: true,
            format: "yyyy-MM-dd HH:mm:ss",
            "value-format": "yyyy-MM-dd HH:mm:ss",
            readonly: false,
            __vModel__: "time",
          },
          {
            __config__: {
              label: "请假天数",
              labelWidth: null,
              showLabel: true,
              changeTag: true,
              tag: "el-input",
              tagIcon: "input",
              required: true,
              layout: "colFormItem",
              span: 24,
              document: "https://element.eleme.cn/#/zh-CN/component/input",
              regList: [
                {
                  pattern: "/^(-?\\d+)(\\.\\d+)?$/",
                  message: "请输入正确的格式",
                },
              ],
              formId: 118,
              renderKey: 1662605122352,
            },
            __slot__: {
              prepend: "",
              append: "天",
            },
            placeholder: "请输入请假天数",
            style: {
              width: "50%",
            },
            clearable: true,
            "prefix-icon": "",
            "suffix-icon": "",
            maxlength: null,
            "show-word-limit": false,
            readonly: false,
            disabled: false,
            __vModel__: "dys",
          },
          {
            __config__: {
              label: "请假理由",
              labelWidth: null,
              showLabel: true,
              tag: "el-input",
              tagIcon: "textarea",
              required: true,
              layout: "colFormItem",
              span: 24,
              regList: [],
              changeTag: true,
              document: "https://element.eleme.cn/#/zh-CN/component/input",
              formId: 119,
              renderKey: 1662605165934,
            },
            type: "textarea",
            placeholder: "请输入请假理由",
            autosize: {
              minRows: 4,
              maxRows: 4,
            },
            style: {
              width: "50%",
            },
            maxlength: null,
            "show-word-limit": false,
            readonly: false,
            disabled: false,
            __vModel__: "reason",
          },
        ],
        formRef: "elForm",
        formModel: "formData",
        size: "medium",
        labelPosition: "right",
        labelWidth: 100,
        formRules: "rules",
        gutter: 15,
        disabled: false,
        span: 24,
        formBtns: true,
      },
    };
  },
  mounted() {},
  methods: {
    sumbitForm1() {},
  },
};
</script>

<style>
</style>