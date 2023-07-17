<script setup lang="ts">
import { DesktopIcon, ForkIcon, LockOnIcon, SecuredIcon } from 'tdesign-icons-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import BaseFooter from '@/components/BaseFooter/BaseFooter.vue'
import FloatButton from '@/components/FloatButton/FloatButton.vue'
import Captcha from '@/components/Captcha/Captcha.vue'
import { useUserStore } from '@/store/modules/user'

const title = import.meta.env.VITE_APP_TITLE
const userStore = useUserStore()
const formData = reactive({
  username: '',
  password: '',
  agencyId: '',
  captcha: '',
})
const form = ref(null)
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  agencyId: [
    { required: true, message: '请选择机构', trigger: 'blur' },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ],
}
const isDisabled = computed(() => {
  return !formData.username || !formData.password || !formData.agencyId || !formData.captcha
})

const selectData = ref(
  [
    {
      id: '4227',
      name: '湖北科技学院核技术与化学生物学院',
      ips: [
        {
          startIp: '192.168.0.0',
          endIp: '192.168.255.255',
        },
        {
          startIp: '10.0.0.0',
          endIp: '10.255.255.255',
        },
      ],
    },
    {
      id: '4226',
      name: '海南广播电视大学',
      ips: [
        {
          startIp: '59.50.85.194',
          endIp: '59.50.85.222',
        },
      ],
    },
    {
      id: '4225',
      name: '西安文理学院体育学院',
      ips: [
        {
          startIp: '192.168.0.0',
          endIp: '192.168.255.255',
        },
        {
          startIp: '10.0.0.0',
          endIp: '10.255.255.255',
        },
      ],
    },
  ],
)
const router = useRouter()
async function onSubmit({ validateResult, firstError }) {
  if (validateResult === true) {
    await userStore.login(formData)
    try {
      MessagePlugin.success('登录成功')
      router.push({ path: '/home' })
    }
    catch (e) {
      MessagePlugin.error('登录失败')
    }
  }
  else {
    console.warn('Validate Errors: ', firstError, validateResult)
  }
}
function onReset() {
  MessagePlugin.success('重置成功')
}
</script>

<template>
  <div class="login flex flex-col">
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" class="flex items-center">
          <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            {{ title }}
          </span>
        </a>
      </div>
    </nav>
    <div class="login-container py-25 px-6 mx-auto bg-[rgb(55_65_81/0.6)]">
      <section class="mb-32  text-gray-800 text-center lg:text-left px-6">
        <div class="grid lg:grid-cols-2 gap-12 flex items-center">
          <div class="mt-12 lg:mt-0">
            <!--            <h1 class="text-5xl font-bold tracking-tight leading-tight mb-12"> -->
            <!--              教师专业发展指导 -->
            <!--            </h1> -->
            <!--            <p class="text-gray-600"> -->
            <!--            </p> -->
          </div>
          <div class="mb-12 lg:mb-0 ml-auto mr-15">
            <t-card class="w-99" title="用户登录">
              <t-form
                ref="form" :data="formData"
                :rules="rules"
                :label-width="0"
                @reset="onReset"
                @submit="onSubmit"
              >
                <t-form-item name="agencyId">
                  <t-select
                    v-model="formData.agencyId" clearable p
                    laceholder="请选择机构"
                    size="large"
                    :options="selectData"
                    :keys="{
                      label: 'name',
                      value: 'id',
                    }"
                  >
                    <template #prefix-icon>
                      <ForkIcon />
                    </template>
                  </t-select>
                </t-form-item>
                <t-form-item name="username">
                  <t-input v-model="formData.username" clearable placeholder="请输入用户名" size="large">
                    <template #prefix-icon>
                      <DesktopIcon />
                    </template>
                  </t-input>
                </t-form-item>
                <t-form-item name="password">
                  <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码" size="large">
                    <template #prefix-icon>
                      <LockOnIcon />
                    </template>
                  </t-input>
                </t-form-item>
                <t-form-item name="captcha">
                  <t-input-adornment class="!w-full">
                    <template #append>
                      <Captcha :content-height="40" />
                    </template>
                    <t-input v-model="formData.captcha" clearable placeholder="请输入验证码" size="large">
                      <template #prefix-icon>
                        <SecuredIcon />
                      </template>
                    </t-input>
                  </t-input-adornment>
                </t-form-item>
                <t-form-item>
                  <t-button theme="primary" type="submit" block :disabled="isDisabled">
                    登录
                  </t-button>
                </t-form-item>
              </t-form>
              <div class="flex-center justify-between mt-6">
                <div>
                  忘记密码？
                </div>
                <div>
                  注册
                </div>
              </div>
            </t-card>
          </div>
        </div>
      </section>
    </div>
    <BaseFooter />
    <FloatButton />
  </div>
</template>

<style scoped lang="scss">
.login-container{
  @apply w-full bg-blend-multiply bg-no-repeat bg-[50%] bg-cover h-[800px];
  background-image: url('../assets/img/loginbg001.jpg');
}
.dark{
  .login-container{
    background-color: rgb(55 65 81/0.6);
  }
}
:deep(.t-card__header){
  margin-top: 10px;
}
:deep(.t-card__body){
  margin-bottom: 5px;
}
:deep(.t-card__title){
  margin-top: 5px;
  font: var(--td-font-title-large);
  font-weight: 600;
}
:deep(.t-input-adornment){
  width: 100%;
}
</style>
