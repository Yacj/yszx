<script setup lang="ts">
import { DesktopIcon, ForkIcon, LockOnIcon, SecuredIcon } from 'tdesign-icons-vue-next'
import type { SubmitContext } from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import { awaitTo, getQueryObject } from '@/utils'
import { useUserStore } from '@/store/modules/user'
import BaseFooter from '@/components/BaseFooter/BaseFooter.vue'
import FloatButton from '@/components/FloatButton/FloatButton.vue'
import Captcha from '@/components/Captcha/Captcha.vue'
import { userService } from '@/api/modules/user'

const title = import.meta.env.VITE_APP_TITLE
const userStore = useUserStore()
const formData = reactive({
  username: '',
  password: '',
  agencyId: '',
  captcha: '',
  verify_hash: '',
  isAjax: true,
})
const captChaCode = ref('')
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
    { required: true, message: '请选择机构', trigger: 'change' },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ],
}
const isDisabled = computed(() => {
  return !formData.username || !formData.password || !formData.agencyId || !formData.captcha
})

const selectData = ref([])
const router = useRouter()
const redirect = getQueryObject().redirect as string

onMounted(() => {
  getAgencyList()
  getPicCodeData()
})

function getAgencyList() {
  userService.getAgency({
    PageSize: 99999,
  }).then((res) => {
    selectData.value = res.data
  })
}
function getPicCodeData() {
  userService.getPicCode().then((res) => {
    const {
      code,
      verify_hash,
    } = res.data
    captChaCode.value = code
    formData.verify_hash = verify_hash
  })
}
async function onSubmit({ validateResult, firstError }: SubmitContext) {
  if (validateResult === true) {
    const [err] = await awaitTo(userStore.login(formData))
    if (!err) {
      MessagePlugin.success('登录成功')
      router.push({ path: redirect || '/home' })
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
  <!--  <div class="login flex flex-col"> -->
  <!--    <nav class="bg-white border-gray-200 dark:bg-gray-900"> -->
  <!--      <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4"> -->
  <!--        <a href="https://flowbite.com/" class="flex items-center"> -->
  <!--          <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white"> -->
  <!--            {{ title }} -->
  <!--          </span> -->
  <!--        </a> -->
  <!--      </div> -->
  <!--    </nav> -->
  <!--    <div class="login-container py-25 px-6 mx-auto bg-[rgb(55_65_81/0.6)]"> -->
  <!--      <section class="mb-32  text-gray-800 text-center lg:text-left px-6"> -->
  <!--        <div class="grid lg:grid-cols-2 gap-12 flex items-center"> -->
  <!--          <div class="mt-12 lg:mt-0"> -->
  <!--            &lt;!&ndash;            <h1 class="text-5xl font-bold tracking-tight leading-tight mb-12"> &ndash;&gt; -->
  <!--            &lt;!&ndash;              教师专业发展指导 &ndash;&gt; -->
  <!--            &lt;!&ndash;            </h1> &ndash;&gt; -->
  <!--            &lt;!&ndash;            <p class="text-gray-600"> &ndash;&gt; -->
  <!--            &lt;!&ndash;            </p> &ndash;&gt; -->
  <!--          </div> -->
  <!--          <div class="mb-12 lg:mb-0 ml-auto mr-15"> -->
  <!--            <t-card class="w-99" title="用户登录"> -->
  <!--                <t-form -->
  <!--                  ref="form" :data="formData" -->
  <!--                  :rules="rules" -->
  <!--                  :label-width="0" -->
  <!--                  @reset="onReset" -->
  <!--                  @submit="onSubmit" -->
  <!--                > -->
  <!--                  <t-form-item name="agencyId"> -->
  <!--                    <t-select -->
  <!--                      v-model="formData.agencyId" -->
  <!--                      clearable -->
  <!--                      placeholder="请选择机构" -->
  <!--                      size="large" -->
  <!--                      :options="selectData" -->
  <!--                      filterable -->
  <!--                      :keys="{ -->
  <!--                        label: 'name', -->
  <!--                        value: 'id', -->
  <!--                      }" -->
  <!--                    > -->
  <!--                      <template #prefix-icon> -->
  <!--                        <ForkIcon /> -->
  <!--                      </template> -->
  <!--                    </t-select> -->
  <!--                  </t-form-item> -->
  <!--                  <t-form-item name="username"> -->
  <!--                    <t-input v-model="formData.username" clearable placeholder="请输入用户名" size="large"> -->
  <!--                      <template #prefix-icon> -->
  <!--                        <DesktopIcon /> -->
  <!--                      </template> -->
  <!--                    </t-input> -->
  <!--                  </t-form-item> -->
  <!--                  <t-form-item name="password"> -->
  <!--                    <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码" size="large"> -->
  <!--                      <template #prefix-icon> -->
  <!--                        <LockOnIcon /> -->
  <!--                      </template> -->
  <!--                    </t-input> -->
  <!--                  </t-form-item> -->
  <!--                  <t-form-item name="captcha"> -->
  <!--                    <t-input-adornment class="!w-full"> -->
  <!--                      <template #append> -->
  <!--                        <Captcha :content-height="40" /> -->
  <!--                      </template> -->
  <!--                      <t-input v-model="formData.captcha" clearable placeholder="请输入验证码" size="large"> -->
  <!--                        <template #prefix-icon> -->
  <!--                          <SecuredIcon /> -->
  <!--                        </template> -->
  <!--                      </t-input> -->
  <!--                    </t-input-adornment> -->
  <!--                  </t-form-item> -->
  <!--                  <t-form-item> -->
  <!--                    <t-button theme="primary" type="submit" block :disabled="isDisabled" size="large"> -->
  <!--                      登录 -->
  <!--                    </t-button> -->
  <!--                  </t-form-item> -->
  <!--                </t-form> -->
  <!--              <div class="flex-center justify-between mt-6"> -->
  <!--                <div> -->
  <!--                  忘记密码？ -->
  <!--                </div> -->
  <!--                <div> -->
  <!--                  注册 -->
  <!--                </div> -->
  <!--              </div> -->
  <!--            </t-card> -->
  <!--          </div> -->
  <!--        </div> -->
  <!--      </section> -->
  <!--    </div> -->
  <!--  </div> -->
  <div class="login-page">
    <div class="login-header pt-8 pb-0 px-10">
      <h2 class="text-3xl font-bold tracking-1">
        {{ title }}
      </h2>
    </div>
    <div class="login-container flex-center box-border h-[calc(100vh_-_123px)] max-w-[1300px] min-h-[650px] mx-auto my-0">
      <div class="login-container-left flex-1 h-full max-h-[700PX] relative" />
      <div class="login-container-right">
        <t-card :bordered="false">
          <div class="title text-2xl font-medium tracking-[.003em] leading-8">
            用户登录
          </div>
          <t-form
            ref="form"
            class="mt-8"
            :data="formData"
            :rules="rules"
            :label-width="0"
            @reset="onReset"
            @submit="onSubmit"
          >
            <t-form-item name="agencyId">
              <t-select
                v-model="formData.agencyId"
                clearable
                placeholder="请选择机构"
                size="large"
                :options="selectData"
                filterable
                :scroll="{ type: 'virtual' }"
                :keys="{
                  label: 'name',
                  value: 'id',
                }"
              >
                <template #prefixIcon>
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
                  <Captcha :content-height="40" :identify-code="captChaCode" :font-size-max="46" @click="getPicCodeData"/>
                </template>
                <t-input v-model="formData.captcha" clearable placeholder="请输入验证码" size="large">
                  <template #prefix-icon>
                    <SecuredIcon />
                  </template>
                </t-input>
              </t-input-adornment>
            </t-form-item>
            <t-form-item class="!mt-10">
              <t-button theme="primary" type="submit" block :disabled="isDisabled" size="large">
                登录
              </t-button>
            </t-form-item>
          </t-form>
        </t-card>
      </div>
    </div>
    <FloatButton />
    <BaseFooter />
  </div>
</template>

<style scoped lang="scss">
.login-page{
  background-image: url(../assets/img/login-banner.jpg);
  @apply bg-no-repeat bg-cover min-h-screen bg-blend-multiply;
  :deep(.login-container-right){
    .t-card{
      border-radius: 20px;
      box-shadow: 0 5px 15px rgba(0,0,0,.05);
      width: 476px;
      .t-card__body{
        @apply pt-11 pb-8 px-[43px];
      }
    }
  }
}
.dark{
  .login-page{
    background-color: rgb(55 65 81/0.6);
  }
}
:deep(.t-input-adornment){
  width: 100%;
}
</style>
<!-- <style scoped lang="scss"> -->
<!-- .login-container{ -->
<!--  @apply w-full bg-blend-multiply bg-no-repeat bg-[50%] bg-cover h-[800px]; -->
<!--  background-image: url('../assets/img/loginbg001.jpg'); -->
<!-- } -->
<!-- .dark{ -->
<!--  .login-container{ -->
<!--    background-color: rgb(55 65 81/0.6); -->
<!--  } -->
<!-- } -->
<!-- :deep(.t-card__header){ -->
<!--  margin-top: 10px; -->
<!-- } -->
<!-- :deep(.t-card__body){ -->
<!--  margin-bottom: 5px; -->
<!-- } -->
<!-- :deep(.t-card__title){ -->
<!--  margin-top: 5px; -->
<!--  font: var(&#45;&#45;td-font-title-large); -->
<!--  font-weight: 600; -->
<!-- } -->
<!-- </style> -->
