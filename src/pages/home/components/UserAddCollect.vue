<script setup lang="ts">
import collectService from '@/api/modules/collect'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['confirm', 'close'])
const collectList = ref([])
const CollectID = ref('')

onMounted(() => {
  getCollectionList()
})

function getCollectionList() {
  collectService.get().then((res) => {
    collectList.value = res.data
  })
}
function handleConfirm() {
  emit('confirm', CollectID.value)
}
function handleOnClose() {
  CollectID.value = ''
  emit('close')
}
</script>

<template>
  <t-dialog
    v-model:visible="props.visible"
    header="作品收藏"
    :confirm-btn="{
      disabled: !CollectID,
    }"
    @close="handleOnClose"
    @confirm="handleConfirm"
  >
    <div v-if="collectList.length > 0" class="flex-center mt-6">
      <div class="mr-3">
        收藏夹目录:
      </div>
      <t-select
        v-model="CollectID"
        class="!flex-1"
        placeholder="请选择目录"
        :options="collectList"
        :keys="{
          label: 'name',
          value: 'id',
        }"
      />
    </div>
  </t-dialog>
</template>

<style scoped lang="scss">

</style>
