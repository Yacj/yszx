<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter/BaseFooter.vue'
import FloatButton from '@/components/FloatButton/FloatButton.vue'
import useKeepAliveStore from '@/store/modules/keepAlive'

const keepAliveStore = useKeepAliveStore()
</script>

<template>
  <t-layout>
    <t-header class="z-5">
      <BaseHeader class="hidden md:block" />
    </t-header>
    <t-layout class="layout">
      <t-layout>
        <t-content class="main mt-5">
          <router-view v-slot="{ Component, route }">
            <keep-alive :include="keepAliveStore.list">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </router-view>
        </t-content>
        <BaseFooter />
      </t-layout>
    </t-layout>
    <FloatButton />
    <t-back-top
      container=".layout"
      :visible-height="200"
      class="absolute"
      :offset="['24px', '80px']"
      theme="primary"
    />
  </t-layout>
</template>

<style scoped lang="scss">
.layout {
  height: calc(100vh - var(--td-comp-size-xxxl));
  overflow-y: scroll;
}
:deep(.t-layout__header) {
  box-shadow: var(--td-shadow-3);
}
</style>
