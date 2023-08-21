<script setup lang="ts">
const form = ref(null)
const formData = reactive({
  account: '',
  password: '',
  email: '',
  age: undefined,
  gender: '',
  course: [],
  college: '',
  date: '',
  content: {
    url: '',
  },
})

const rules = {
  'account': [
    { required: true, message: '姓名必填', type: 'error', trigger: 'blur' },
    { required: true, message: '姓名必填', type: 'error', trigger: 'change' },
    { whitespace: true, message: '姓名不能为空' },
    { min: 3, message: '输入字数应在3到6之间', type: 'error', trigger: 'blur' },
    { max: 6, message: '输入字数应在3到6之间', type: 'error', trigger: 'blur' },
  ],
  'password': [{ required: true, message: '密码必填', type: 'error' }],
  'email': [{ required: true, message: '格式必须为邮箱', type: 'warning' }],
  'age': [
    { required: true, message: '年龄必填', type: 'error' },
    { number: true, message: '请输入数字', type: 'warning' },
  ],
  'gender': [{ required: true, message: '性别必填', type: 'warning' }],
  'course': [{ required: true, message: '课程必填', type: 'warning' }],
  'college': [
    // 注意：trigger: blur 仅在输入框或选择框失去焦点时触发，需要注意配合 trigger: change 使用
    { required: true, message: '学院必选', type: 'warning', trigger: 'blur' },
    { required: true, message: '学院必选', type: 'warning', trigger: 'change' },
  ],
  'content.url': [
    { required: true, message: '个人网站必填', type: 'warning' },
    {
      url: {
        protocols: ['http', 'https', 'ftp'],
        require_protocol: true,
      },
      message: '请输入正确的个人主页',
    },
  ],
}
</script>

<template>
  <div>
    <t-card class="card-title" title="信息设置" :bordered="false">
      <t-row :gutter="[24, 24]">
        <t-col :flex="1">
          <t-form ref="form" :data="formData" :rules="rules">
            <t-form-item label="用户名" help="这是用户名字段帮助说明" name="account">
              <t-input v-model="formData.account"/>
            </t-form-item>

            <t-form-item label="个人简介" help="一句话介绍自己" name="description">
              <t-input v-model="formData.description" />
            </t-form-item>

            <t-form-item label="密码" name="password">
              <t-input v-model="formData.password" type="password" />
            </t-form-item>

            <t-form-item label="年龄" name="age">
              <t-input-number v-model="formData.age" />
            </t-form-item>

            <t-form-item label="性别" name="gender">
              <t-radio-group v-model="formData.gender">
                <t-radio value="male">
                  男
                </t-radio>
                <t-radio value="femal">
                  女
                </t-radio>
              </t-radio-group>
            </t-form-item>
          </t-form>
        </t-col>
        <t-col :flex="1" class="flex-center">
          <t-avatar size="100px">
            W
          </t-avatar>
        </t-col>
      </t-row>
    </t-card>
  </div>
</template>

<style scoped lang="scss">

</style>
