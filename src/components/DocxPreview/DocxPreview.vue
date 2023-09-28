<script setup>
import { renderAsync } from 'docx-preview'
import { watch } from 'vue'

const props = defineProps({
  file: {
    type: null,
  },
  showTools: {
    type: Boolean,
    default: true,
  },
})
const preview = ref(null)
const fileRef = ref(null)
function setPreview() {
  renderAsync(props.file, preview.value)
}
const { toggle } = useFullscreen(fileRef)
watch(() => props.file, (n, o) => {
  setPreview()
})
</script>

<template>
  <section>
    <t-space v-if="showTools" class="file-btn-tools mb-3">
      <slot name="tools" />
      <t-button :disabled="!props.file" @click="toggle">
        <template #icon>
<!--          <FullscreenExitOutlined class="text-base" />-->
        </template>
        全屏查看
      </t-button>
    </t-space>
    <div
      ref="fileRef"
      class="file mt-5"
    >
      <div ref="preview" />
    </div>
  </section>
</template>

<style scoped>
.file {
  height: 680px;
  overflow-x: auto;
}
</style>
