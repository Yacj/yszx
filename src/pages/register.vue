<script setup lang="ts">
import { LockOnIcon, MobileIcon, SecuredIcon, UserIcon } from 'tdesign-icons-vue-next'
import type { SubmitContext } from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import { validate } from '@/utils/reg'
import { useCountDown } from '@/hooks/useCountDown'
import { userService } from '@/api/modules/user'
import { parseStringToObject } from '@/utils'

const emit = defineEmits(['register'])
const formData = reactive({
  mobile: '',
  code: '',
  verify_hash: '',
  nick_name: '',
  password: '',
  repass: '',
  isAjax: true,
  return_url: '',
})
const rules = {
  mobile: [
    {
      required: true,
      message: '请输入手机号',
      type: 'error',
    },
    {
      validator: val => validate('mobile', val),
      message: '请输入正确的手机号',
    },
  ],
  nick_name: [
    {
      required: true,
      message: '请输入用户名',
      type: 'error',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      type: 'error',
    },
  ],
  repass: [
    {
      required: true,
      message: '请再次输入密码',
      type: 'error',
    },
    {
      validator: val => val === formData.password,
      message: '两次输入密码不一致',
    },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      type: 'error',
    },
  ],
}
const {
  start,
  count,
  pause,
  resume,
  isActive,
} = useCountDown()
const setBtnLoading = ref(false)
async function handleSendCode() {
  setBtnLoading.value = true
  const params = {
    tel: formData.mobile,
  }
  if (!validate('mobile', formData.mobile)) {
    setBtnLoading.value = false
    return MessagePlugin.error('请输入正确的手机号')
  }
  const res = await userService.is_exist(params)
  const { status, message } = parseStringToObject(res.data)
  if (status !== 200) {
    setBtnLoading.value = false
    MessagePlugin.error(message)
  }
  else {
    const resSet = await userService.set_code(params)
    formData.verify_hash = resSet.data.verify_hash
    MessagePlugin.success('验证码发送成功')
    setBtnLoading.value = false
    start(60)
  }
}
function handleRegisterSubmit({ validateResult, firstError }: SubmitContext) {
  if (validateResult === true) {
    userService.mobile(formData).then((res) => {
      MessagePlugin.success('注册成功,请重新登录')
      emit('register', true)
    })
  }
}
onUnmounted(() => {
  pause()
})
</script>

<template>
  <t-form
    :rules="rules" :data="formData" :label-width="0" class="!mt-8"
    @submit="handleRegisterSubmit"
  >
    <t-form-item name="nick_name">
      <t-input
        v-model="formData.nick_name"
        placeholder="请输入用户名"
        clearable
        size="large"
      >
        <template #prefix-icon>
          <UserIcon />
        </template>
      </t-input>
    </t-form-item>
    <t-form-item name="password">
      <t-input
        v-model="formData.password"
        type="password"
        placeholder="请输入密码"
        clearable
        size="large"
      >
        <template #prefix-icon>
          <LockOnIcon />
        </template>
      </t-input>
    </t-form-item>
    <t-form-item name="repass">
      <t-input
        v-model="formData.repass"
        type="password"
        placeholder="请再次输入密码"
        clearable
        size="large"
      >
        <template #prefix-icon>
          <LockOnIcon />
        </template>
      </t-input>
    </t-form-item>
    <t-form-item name="mobile">
      <t-input
        v-model="formData.mobile"
        placeholder="请输入手机号"
        clearable
        size="large"
      >
        <template #prefix-icon>
          <MobileIcon />
        </template>
      </t-input>
    </t-form-item>
    <t-form-item name="code">
      <div class="flex-center w-full">
        <t-input
          v-model="formData.code"
          placeholder="请输入验证码"
          clearable
          size="large"
          class="flex-1 !mr-3"
        >
          <template #prefix-icon>
            <SecuredIcon />
          </template>
        </t-input>
        <t-button
          theme="primary"
          size="large"
          :disabled="formData.mobile === '' || isActive"
          :loading="setBtnLoading"
          @click="handleSendCode"
        >
          {{ isActive ? `${count}s` : '获取验证码' }}
        </t-button>
      </div>
    </t-form-item>
    <t-form-item>
      <t-button
        theme="primary"
        size="large"
        class="w-full"
        type="submit"
        block
      >
        注册
      </t-button>
    </t-form-item>
  </t-form>
</template>

<style scoped lang="scss">

</style>
