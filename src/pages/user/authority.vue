<script setup lang="ts">
import { PlusIcon, SearchIcon } from 'tdesign-icons-vue-next'
import { formatDay } from '@/utils/dateUtils'
import { powerService } from '@/api/modules/power'


const listParams = reactive({
  Status: 1,
  IsPurchase: 1,
  IsAuthorized: true,
  keyWord: '',
})
const tableList = ref([])
const columns = [
  {
    title: '机构编码',
    align: 'left',
    colKey: 'orgID',
    width: 90,
  },
  {
    title: '机构名称',
    align: 'center',
    colKey: 'orgName',
  },
  {
    title: '授权开始时间',
    align: 'center',
    colKey: 'startTime',
  },
  {
    title: '授权结束时间',
    align: 'center',
    colKey: 'endTime',
  },
  {
    title: '状态',
    align: 'center',
    colKey: 'status',
  },
  {
    title: '是否购买',
    align: 'center',
    colKey: 'isPurchase',
  },
  {
    title: '操作',
    align: 'center',
    colKey: 'action',
    width: 200,
  },
]
onMounted(() => {
  handleGetOrganList()
  handleGetAuthorityList()
})
const page = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
})
function handleGetOrganList() {
  // powerService.get_organ_list({
  //   pageInt: 1,
  //   pageSize: 9999999,
  //   Status: 0,
  //   IsPurchase: 0,
  // }).then((res) => {
  //   console.log(res)
  //   organOptions.value = res.data.row
  // })
}

function handleGetAuthorityList() {
  const params = {
    ...listParams,
    pageInt: page.current,
    pageSize: page.pageSize,
  }
  powerService.get_organ_list(params).then((res) => {
    const {
      row,
      total,
    } = res.data
    tableList.value = row
  })
}
</script>

<template>
  <t-card title="授权管理" class="card-title" :bordered="false">
    <div class="grid grid-cols-3 gap-4">
      <div class="flex-y-center">
        授权状态：
        <t-select
          v-model="listParams.Status"
          :options="[
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 },
          ]"
          class="!w-50"

          @change="handleGetAuthorityList"
        />
      </div>
      <div class="flex-center">
        是否购买的用户：
        <t-select
          v-model="listParams.IsPurchase"
          :options="[
            { label: '是', value: 1 },
            { label: '否', value: 0 },
          ]"
          class="!w-50"
          @change="handleGetAuthorityList"
        />
      </div>
      <div class="flex-center">
        名称搜索：
        <t-input v-model="listParams.keyWord" placeholder="请输入机构名称进行搜索" class="!w-50">
          <template #suffix-icon>
            <SearchIcon />
          </template>
        </t-input>
      </div>
    </div>
    <t-divider />
    <t-button class="mb-3">
      <template #icon>
        <PlusIcon class="!text-2xl" />
      </template>
      新增机构
    </t-button>
    <t-table :columns="columns" :data="tableList" :stripe="true" row-key="orgID" :bordered="true">
      <template #startTime="{ row }">
        {{ formatDay(row.startTime) }}
      </template>
      <template #endTime="{ row }">
        {{ formatDay(row.endTime) }}
      </template>
      <template #status="{ row }">
        <span
          class="inline-block w-2 h-2 relative bottom-[1px] mr-1  rounded-full"
          :class="row.status ? 'bg-green-500' : 'bg-red-500'"
        />
        {{ row.status ? '使用中' : '未启用' }}
      </template>
      <template #isPurchase="{ row }">
        <t-tag :theme="row.isPurchase ? 'success' : 'warning'" variant="light">
          {{ row.isPurchase ? '是' : '否' }}
        </t-tag>
      </template>
      <template #action="{ row }">
        <div class="flex space-x-1">
          <t-button variant="text" theme="primary" class="!color-[#0052d9]">
            编辑
          </t-button>
          <t-button variant="text" :theme="row.status ? 'warning' : 'success'">
            {{ row.status ? '禁用' : '启用' }}
          </t-button>
          <t-button variant="text">
            导出资源
          </t-button>
        </div>
      </template>
    </t-table>
  </t-card>
</template>

<style scoped>

</style>
