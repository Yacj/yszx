<script setup lang="ts">
import { statService } from '@/api/modules/stat'

const resourceData = ref({})

onMounted(() => {
  getResourceData()
})

function getResourceData() {
  statService.res_library().then((res) => {
    console.log(res)
    resourceData.value = res.data
  })
}
</script>

<template>
  <t-card class="resource-title card-title" :title="resourceData.catalogName" :bordered="false">
    <t-row>
      <t-col v-for="(item, index) in resourceData.rows" :key="item.id" :flex="1">
        <div
          class="text-center"
          :class="index > 0 ? 'divide-x' : ''"
        >
          <div class="text-sm">
            {{ item.name }}
          </div>
          <div class="mt-3">
            <h2 class="text-2xl">
              <CountTo :start-val="0" :end-val="item.resCount" :duration="3000" />
            </h2>
          </div>
        </div>
      </t-col>
    </t-row>
  </t-card>
</template>

<style scoped lang="scss">
.resource-title{
  :deep(.t-card__body){
    padding:15px 0;
  }
}
</style>
