<script setup lang="ts">
import type { SubmitContext } from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import { powerService } from '@/api/modules/power'
import { deepClone } from '@/utils/object'

const route = useRoute()
const organOptions = ref([])
const resOptions = ref([])
const formData = reactive({
  organIDList: [],
  cateIDList: [],
  time: [],
  isDownload: null,
  isPurchase: null,
})
const rules = {
  organIDList: [
    {
      required: true,
      message: '请选择机构',
      type: 'error',
    },
  ],
  time: [
    {
      required: true,
      message: '请选择授权时间',
      type: 'error',
    },
  ],
  isDownload: [
    {
      required: true,
      message: '请选择是否下载',
      type: 'error',
    },
  ],
  isPurchase: [
    {
      required: true,
      message: '请选择是否购买',
      type: 'error',
    },
  ],
  cateIDList: [
    {
      required: true,
      message: '请选择授权资源',
      type: 'error',
    },
  ],
}
const router = useRouter()

const {
  orgID,
} = route.query
const orgName = ref('')

onMounted(() => {
  handleGetUpdateData()
  if (orgID) {
    handleGetAuthorityDetail()
  }
})

function handleGetUpdateData() {
  powerService.get_organ_list({
    pageInt: 1,
    pageSize: 9999999,
    Status: 0,
    IsPurchase: 0,
    IsAuthorized: false,
  }).then((res) => {
    organOptions.value = res.data.row
  })
  powerService.get_options().then((res) => {
    resOptions.value = res.data
  })
}

function handleGetAuthorityDetail() {
  powerService.get_info({
    orgID,
  }).then((res) => {
    orgName.value = res.data.orgName
    formData.organIDList = [res.data.orgID]
    formData.cateIDList = res.data.cateList.map(item => item.id)
    formData.time = [res.data.startTime, res.data.endTime]
    formData.isDownload = res.data.isDownload
    formData.isPurchase = res.data.isPurchase
  })
}
function handleOnSubmit({ validateResult, firstError }: SubmitContext) {
  if (validateResult === true) {
    if (orgID) {
      handleEditAuthority()
    }
    else {
      handleAddAuthority()
    }
  }
}

function handleAddAuthority() {
  const params = deepClone(formData)
  params.startTime = params.time[0]
  params.endTime = params.time[1]
  delete params.time
  powerService.add_options(params).then((res) => {
    MessagePlugin.success(res.data || '新增成功')
    router.push({
      path: '/user/authority',
    })
  })
}

function handleEditAuthority() {
  console.log(formData)
  const params = deepClone(formData)
  params.orgID = orgID
  params.startTime = params.time[0]
  params.endTime = params.time[1]
  delete params.time
  delete params.organIDList
  powerService.update_info(params).then((res) => {
    MessagePlugin.success(res.data || '修改成功')
    handleGetAuthorityDetail()
  })
}
</script>

<template>
  <t-card :title="`${orgID ? '修改' : '新增'}授权`" class="card-title" :bordered="false">
    <t-form
      :data="formData"
      :rules="rules"
      @submit="handleOnSubmit"
    >
      <t-form-item label="授权时间" name="time">
        <t-date-range-picker v-model:value="formData.time" allow-input clearable />
      </t-form-item>
      <t-form-item label="是否下载" name="isDownload">
        <t-radio-group v-model="formData.isDownload">
          <t-radio :value="true">
            是
          </t-radio>
          <t-radio :value="false">
            否
          </t-radio>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="是否购买" name="isPurchase">
        <t-radio-group v-model="formData.isPurchase">
          <t-radio :value="true">
            是
          </t-radio>
          <t-radio :value="false">
            否
          </t-radio>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="机构名称" name="organIDList">
        <div v-if="orgID">
          {{ orgName }}
        </div>
        <t-transfer
          v-else
          v-model="formData.organIDList"
          :keys="{
            value: 'orgID',
            label: 'orgName',
          }"
          :data="organOptions"
          theme="primary"
          :search="true"
        />
      </t-form-item>
      <t-form-item label="授权资源" name="cateIDList">
        <div class="border rounded">
          <div class="header border-b-1 px-5 pb-3 mt-3">
            选择授权资源
          </div>
          <div class="p-5 flex flex-wrap">
            <t-checkbox-group v-model="formData.cateIDList">
              <t-checkbox key="all" :check-all="true" label="全选" />
              <t-checkbox
                v-for="item in resOptions"
                :key="item.id"
                :value="item.id"
                :disabled="!item.select"
              >
                {{ item.name }}
              </t-checkbox>
            </t-checkbox-group>
          </div>
        </div>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" class="!w-20">
          {{ orgID ? '修改' : '新增' }}
        </t-button>
      </t-form-item>
    </t-form>
  </t-card>
</template>

<style scoped lang="scss">
:deep(.t-transfer__search .t-transfer__list){
  height: 330px;
}
</style>
