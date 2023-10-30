<script setup lang="ts">
import type { InputConfig } from 'tdesign-vue-next'

interface Config {
  input: InputConfig
}
const config: Config = {
  input: {},
}
</script>

<template>
  <t-config-provider :global-config="config">
    <RouterView />
  </t-config-provider>
</template>
