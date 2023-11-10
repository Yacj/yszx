<script setup lang="ts">
import { AddIcon, MoreIcon } from 'tdesign-icons-vue-next'
import type { DropdownOption } from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import Result from '@/components/Result/Result.vue'
import collectService from '@/api/modules/collect'
import { formatDay } from '@/utils/dateUtils'
import { replaceUrlImage } from '@/utils'
import router from '@/router'

const collectionList = ref([])
const collectionResList = ref([])
const CataID = ref(0)
const updateId = ref(0)
const isEditCollection = ref(false)
const collectionName = ref('')
const asyncLoading = ref('')
const pagination = ref({
  PageIndex: 1,
  PageSize: 3,
})
onMounted(() => {
  getCollectionList()
})

function getCollectionList(isDel = false) {
  collectService.get().then((res) => {
    collectionList.value = res.data
    if (!isDel) {
      CataID.value = res.data[0].id
    }
    getCollectionResData()
  })
}

function getCollectionResData() {
  collectService.res_list({
    CataID: CataID.value,
    ...pagination.value,
  }).then((res) => {
    const {
      resRow,
      total,
    } = res.data
    asyncLoading.value = 'load-more'
    if (pagination.value.PageIndex === 1) {
      collectionResList.value = resRow
    }
    else {
      collectionResList.value = collectionResList.value.concat(resRow)
    }
    asyncLoading.value = total > collectionResList.value.length ? 'load-more' : ''
  })
}

function clickHandler(e: DropdownOption, item: any) {
  if (e.id === 2) {
    const name = item.name
    const params = {
      id: item.id,
    }
    const deleteConfirm = DialogPlugin.confirm(
      {
        header: '提醒',
        theme: 'warning',
        body: `确定删除收藏${name}吗？`,
        onConfirm: async () => {
          const res = await collectService.delete(params)
          if (res) {
            MessagePlugin.success('删除成功')
          }
          else {
            MessagePlugin.error('删除失败')
          }
          getCollectionList()
          deleteConfirm.destroy()
        },
      },
    )
  }
  else {
    updateId.value = item.id
    collectionName.value = item.name
    isEditCollection.value = true
  }
}
function handleUpdateCollection() {
  const id = updateId.value
  if (id === 0) {
    collectService.add({
      Name: collectionName.value,
    }).then((res) => {
      if (res) {
        MessagePlugin.success('新增成功')
      }
      else {
        MessagePlugin.error('新增失败')
      }
      getCollectionList()
    })
  }
  else {
    collectService.update({
      id,
      Name: collectionName.value,
    }).then((res) => {
      if (res) {
        MessagePlugin.success('更新成功')
      }
      else {
        MessagePlugin.error('更新失败')
      }
      getCollectionList()
    })
  }
  handleCloseCollection()
}

function handleCloseCollection() {
  isEditCollection.value = false
  collectionName.value = ''
  updateId.value = 0
}

function handleTabChange(e) {
  CataID.value = e
  pagination.value.PageIndex = 1
  asyncLoading.value = 'loading'
  collectionResList.value = []
  getCollectionResData()
}
function handleDetailTo(resCode: string, type: string, resName: string, Code: string) {
  router.push({
    path: '/home/detail',
    query: {
      ResCode: resCode,
      ResType: type,
      ResName: resName,
      categoryCode: Code,
    },
  })
}
function handleLoadMoreClick() {
  pagination.value.PageIndex += 1
  asyncLoading.value = 'loading'
  getCollectionResData()
}

function handleCloseUserCollection(code: string) {
  const params = {
    CataID: CataID.value,
    ResCode: code,
  }
  collectService.res_delete(params).then((res) => {
    pagination.value.PageIndex = 1
    getCollectionList(true)
    MessagePlugin.success('删除成功')
  })
}
</script>

<template>
  <div>
    <t-card :bordered="false" class="card-title" title="我的收藏">
      <template #actions>
        <t-button @click="isEditCollection = true">
          <template #icon>
            <AddIcon />
          </template>
          新增目录
        </t-button>
      </template>
      <t-tabs v-model="CataID" @change="handleTabChange">
        <t-tab-panel v-for="item in collectionList" :key="item.id" :value="item.id">
          <template #label>
            <div class="flex relative">
              <div class="flex-1">
                {{ item.name }}
              </div>
              <t-dropdown v-if="item.name !== '默认目录'" :options="[{ content: '编辑', id: 1 }, { content: '删除', id: 2 }]" @click.top="clickHandler($event, item)">
                <div class="relative right-[-17px]">
                  <MoreIcon />
                </div>
              </t-dropdown>
            </div>
          </template>
          <Result v-if="collectionResList.length === 0" type="404" title="暂无数据" :height="150" />
          <t-list split size="large" class="user-res-list" :async-loading="asyncLoading" @load-more="handleLoadMoreClick">
            <t-list-item v-for="item in collectionResList" :key="item.cid" class="!cursor-pointer">
              <t-list-item-meta :title="item.name" :description="`收藏时间：${formatDay(item.createTime, 'YYYY-MM-DD HH:mm:ss')}`" @click="handleDetailTo(item.resCode, item.type, item.name, item.cateCode)">
                <template #image>
                  <t-image :src="replaceUrlImage(item.logo)" class="!wh-full rounded" fit="cover" />
                </template>
              </t-list-item-meta>
              <template #action>
                <t-popconfirm
                  theme="default"
                  content="确定删除该收藏吗？"
                  @confirm="handleCloseUserCollection(item.resCode)"
                >
                  <t-link theme="primary" hover="color">
                    删除收藏
                  </t-link>
                </t-popconfirm>
              </template>
            </t-list-item>
          </t-list>
        </t-tab-panel>
      </t-tabs>
    </t-card>
    <t-dialog
      v-model:visible="isEditCollection"
      :header="`${updateId === 0 ? '新增' : '编辑'}收藏目录`"
      :confirm-btn="{
        disabled: !collectionName,
      }"
      @confirm="handleUpdateCollection()"
      @close="handleCloseCollection()"
    >
      <t-input v-model="collectionName" placeholder="请输入收藏目录名称" clearable />
    </t-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.user-res-list){
  .t-list-item__meta-avatar{
    width: 227px;
    height: 100px;
    border-radius: 6px;
  }
  .t-list-item__meta-content{
    .t-list-item__meta-description{
      position: relative;
      top:45%
    }
  }
}
</style>
