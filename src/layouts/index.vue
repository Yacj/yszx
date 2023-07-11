<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader/BaseHeader.vue'
</script>

<template>
  <t-layout>
    <t-header class="z-5">
      <BaseHeader />
    </t-header>
    <t-layout class="layout">
      <t-layout>
        <t-content class="main mt-5">
          <RouterView />
        </t-content>
        <t-footer>
          1212
        </t-footer>
      </t-layout>
    </t-layout>
    <t-back-top
      container=".layout"
      :visible-height="200"
      style="position: absolute"
      :offset="['24px', '80px']"
    />
  </t-layout>
</template>

<style scoped lang="scss">
.test{
  overflow: auto
}
.layout {
  height: calc(100vh - var(--td-comp-size-xxxl));
  overflow-y: scroll;
}
</style>
