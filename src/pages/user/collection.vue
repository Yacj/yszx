<script setup lang="ts">
import Result from '@/components/Result/Result.vue'

const collectionList = ref([])
const isEditCollection = ref(false)
const collectionName = ref('')
</script>

<template>
  <t-card :bordered="false" class="card-title" title="我的收藏">
    <t-button @click="isEditCollection = true">
      新增收藏
    </t-button>
    <Result v-if="collectionList.length === 0" type="404" title="暂无数据" />
  </t-card>
  <t-dialog
    v-model:visible="isEditCollection"
    header="新增收藏"
    :confirm-btn="{
      disabled: !collectionName,
    }"
  >
    <t-input v-model="collectionName" placeholder="请输入收藏名称" clearable />
  </t-dialog>
</template>

<style scoped lang="scss">

</style>
