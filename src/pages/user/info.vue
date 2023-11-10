<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

const form = ref(null)
const userStore = useUserStore()
const userInfo = userStore.userInfo

const formData = reactive(userInfo)

const rules = {
  nickName: [
    {
      required: true,
      message: '昵称必填',
      type: 'error',
    },
  ],
  realName: [
    {
      required: true,
      message: '真实姓名必填',
      type: 'error',
    },
  ],
  description: [{ required: true, message: '简介必填', type: 'error' }],
  telephone: [{ required: true, message: '手机号必填', type: 'warning' }],
  age: [
    { required: true, message: '年龄必填', type: 'error' },
    { number: true, message: '请输入数字', type: 'warning' },
  ],
  sex: [{ required: true, message: '性别必填', type: 'warning' }],
  workEmail: [
    {
      required: true,
      message: '邮箱必填',
      type: 'error',
    },
    {
      pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
      message: '请输入正确的邮箱',
    }
  ]
}
</script>

<template>
  <div>
    <t-card class="card-title" title="信息设置" :bordered="false">
      <t-row :gutter="[24, 24]">
        <t-col :flex="1">
          <t-form ref="form" :data="formData" :rules="rules">
            <t-form-item label="用户名" name="nickName">
              <t-input v-model="formData.nickName" />
            </t-form-item>
            <t-form-item label="真实姓名" name="realName">
              <t-input v-model="formData.realName" />
            </t-form-item>
            <t-form-item label="个人简介" name="description">
              <t-input v-model="formData.description" />
            </t-form-item>

            <t-form-item label="电话号码" name="telephone">
              <t-input v-model="formData.telephone" placeholder="请输入您的电话" />
            </t-form-item>

            <t-form-item label="年龄" name="age">
              <t-input-number v-model="formData.age" />
            </t-form-item>

            <t-form-item label="性别" name="sex">
              <t-radio-group v-model="formData.sex">
                <t-radio value="0">
                  男
                </t-radio>
                <t-radio value="1">
                  女
                </t-radio>
                <t-radio value="保密">
                  保密
                </t-radio>
              </t-radio-group>
            </t-form-item>
            <t-form-item label="工作邮箱" name="workEmail">
              <t-input v-model="formData.workEmail" placeholder="请输入您的邮箱" />
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
