<script setup lang="ts">
import { DesktopIcon, ForkIcon, LockOnIcon, SecuredIcon } from 'tdesign-icons-vue-next'
import type { FormRule, SubmitContext } from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import type { UnwrapNestedRefs } from 'vue'
import { awaitTo, getQueryObject } from '@/utils'
import { useUserStore } from '@/store/modules/user'
import BaseFooter from '@/components/BaseFooter/BaseFooter.vue'
import FloatButton from '@/components/FloatButton/FloatButton.vue'
import Captcha from '@/components/Captcha/Captcha.vue'
import type { LoginDataInterface } from '@/api/modules/user'
import { userService } from '@/api/modules/user'
import Register from '@/pages/register.vue'

const userStore = useUserStore()
const btnLoading = ref(false)
const formData: UnwrapNestedRefs<LoginDataInterface> = reactive({
  username: '',
  password: '',
  agencyId: '',
  captcha: '',
  verify_hash: '',
  isAjax: true,
})
const captChaCode = ref('')
const form = ref(null)
const rules: Record<string, FormRule[]> = {
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

const selectData = ref()
const redirect = getQueryObject().redirect
const selectLoading = ref(false)
const router = useRouter()
const formType = ref('login')
onMounted(() => {
  getAgencyList()
  getPicCodeData()
})

function getAgencyList() {
  selectLoading.value = true
  userService.getAgency({
    PageSize: 99999,
  }).then((res) => {
    selectData.value = res.data
    selectLoading.value = false
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
  btnLoading.value = true
  if (validateResult === true) {
    const [err] = await awaitTo(userStore.login(formData))
    if (!err) {
      MessagePlugin.success('登录成功')
      router.push({ path: redirect || '/home' })
    }
    else {
      if (err.toString().includes('验证码')) {
        getPicCodeData()
      }
    }
    btnLoading.value = false
  }
  else {
    console.warn('Validate Errors: ', firstError, validateResult)
    btnLoading.value = false
  }
}
function onReset() {
  MessagePlugin.success('重置成功')
}

function handleChangeFormType() {
  formType.value = formType.value === 'login' ? 'register' : 'login'
  if (formType.value === 'login') {
    getPicCodeData()
  }
}

function handleRegister(val: boolean) {
  if (val) {
    handleChangeFormType()
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-header pt-8 pb-0 px-10">
      <router-link to="/">
        <img src="../assets/img/logo.png" alt="" class="w-50">
      </router-link>
    </div>
    <div class="login-container flex-center box-border h-[calc(100vh_-_123px)] max-w-[1300px] min-h-[650px] mx-auto my-0">
      <div class="login-container-left flex-1 h-full max-h-[700PX] relative" />
      <t-space class="login-container-right">
        <t-card :bordered="false" class="relative">
          <div class="title text-2xl font-medium tracking-[.003em] leading-8">
            用户{{ formType === 'login' ? '登录' : '注册' }}
          </div>
          <t-form
            v-if="formType === 'login'"
            ref="form"
            class="!mt-8"
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
                :loading="selectLoading"
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
                  <Captcha :code="captChaCode" @click="getPicCodeData" />
                </template>
                <t-input v-model="formData.captcha" clearable placeholder="请输入验证码" size="large">
                  <template #prefix-icon>
                    <SecuredIcon />
                  </template>
                </t-input>
              </t-input-adornment>
            </t-form-item>
            <!--            <t-form-item> -->
            <!--              <div class="w-full"> -->
            <!--                <t-checkbox class="!float-right !ml-5"> -->
            <!--                  记住账户 -->
            <!--                </t-checkbox> -->
            <!--                <t-checkbox class="!float-right"> -->
            <!--                  记住密码 -->
            <!--                </t-checkbox> -->
            <!--              </div> -->
            <!--            </t-form-item> -->
            <t-form-item class="!mt-8">
              <t-button
                theme="primary"
                type="submit"
                block
                :disabled="isDisabled"
                size="large"
                :loading="btnLoading"
              >
                登录
              </t-button>
            </t-form-item>
          </t-form>
          <Register v-else @register="handleRegister" />
          <template #footer>
            <div class="absolute bottom-0 flex-center w-full mb-3">
              <div class="mr-13">
                {{ formType === 'login' ? '没有账号？' : '已有账号？' }}
                <t-link theme="danger" underline @click="handleChangeFormType">
                  去{{ formType === 'login' ? '注册' : '登录' }}
                </t-link>
              </div>
            </div>
          </template>
        </t-card>
      </t-space>
    </div>
  </div>
  <FloatButton />
  <BaseFooter />
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
:deep(.t-input.t-size-l){
    height: 47px !important;
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
