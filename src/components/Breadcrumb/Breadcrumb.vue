<script setup lang="ts">
const route = useRoute()
const router = useRouter()
</script>

<template>
  <t-breadcrumb>
    <t-breadcrumb-item
      v-for="(item, index) in route.matched.filter((item, index, self) => !!item.meta?.title && self.findIndex(i => i.path === item.path) === index)"
      :key="index + item.path"
      class="!text-2xl"
    >
      {{ item.meta.title }}
    </t-breadcrumb-item>
  </t-breadcrumb>
</template>

<style scoped>
:deep(.t-breadcrumb__inner){
  font-size:16px
}
</style>
