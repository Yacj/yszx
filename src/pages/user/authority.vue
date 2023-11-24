<script setup lang="ts">
import { PlusIcon, SearchIcon } from 'tdesign-icons-vue-next'
import type { PageInfo } from 'tdesign-vue-next'
import { formatDay } from '@/utils/dateUtils'
import { powerService } from '@/api/modules/power'

const router = useRouter()
const listParams = reactive({
  Status: 1,
  IsPurchase: 1,
  IsAuthorized: true,
  keyword: '',
})
const tableList = ref([])
const columns = [
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
    width: 150,
  },
]
const pagination = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1,
})
onMounted(() => {
  handleGetAuthorityList()
})
function handleGetAuthorityList() {
  const params = {
    ...listParams,
    pageInt: pagination.value.defaultCurrent,
    pageSize: pagination.value.defaultPageSize,
  }
  // params keyword去掉空格
  if (params.keyword) {
    params.keyword = params.keyword.trim()
  }
  powerService.get_organ_list(params).then((res) => {
    const {
      row,
      total,
    } = res.data
    tableList.value = row
    pagination.value.total = total
  })
}

function handleChangeStatus(row: any) {
  const params = {
    orgID: row.orgID,
    Status: !row.status,
  }
  powerService.update_Status(params).then((res) => {
    MessagePlugin.success('修改状态成功')
    handleGetAuthorityList()
  })
}
function handlePageChange(pageInfo: PageInfo) {
  pagination.value.defaultPageSize = pageInfo.pageSize
  pagination.value.defaultCurrent = pageInfo.current
  handleGetAuthorityList()
}
</script>

<template>
  <t-card title="授权管理" class="card-title" :bordered="false">
    <div class="grid grid-cols-2 gap-2">
      <div class="flex-y-center">
        使用状态：
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
      <div class="flex-y-center">
        是否可购买：
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
    </div>
    <t-divider />
    <div class="mb-3 flex justify-between">
      <t-button @click="router.push('/user/authority/add')">
        <template #icon>
          <PlusIcon class="!text-2xl" />
        </template>
        新增授权
      </t-button>
      <t-input v-model="listParams.keyword" placeholder="请输入机构名称进行搜索" class="!w-50">
        <template #suffix-icon>
          <SearchIcon class="!cursor-pointer" @click="handleGetAuthorityList" />
        </template>
      </t-input>
    </div>
    <t-table
      :columns="columns"
      :data="tableList"
      :stripe="true"
      row-key="orgID"
      :bordered="true"
      :pagination="pagination"
      @page-change="handlePageChange"
    >
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
          <t-button variant="text" theme="primary" class="!color-[#0052d9]" @click="router.push(`/user/authority/edit?orgID=${row.orgID}`)">
            编辑
          </t-button>
          <t-popconfirm
            :content="`确定${row.status ? '禁用' : '启用'}么`"
            @confirm="handleChangeStatus(row)"
          >
            <t-button variant="text" :theme="row.status ? 'warning' : 'success'">
              {{ row.status ? '禁用' : '启用' }}
            </t-button>
          </t-popconfirm>
          <!--          <t-button variant="text"> -->
          <!--            导出资源 -->
          <!--          </t-button> -->
        </div>
      </template>
    </t-table>
  </t-card>
</template>

<style>

</style>
