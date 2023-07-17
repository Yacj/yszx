<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
    required: true,
  },
  keys: {
    type: Object,
    default: () => ({}),
  },
})
const list = ref(props.list)
if (props.keys) {
  list.value = props.list.map((item: any) => {
    return {
      ...item,
      name: item[props.keys.name],
      path: item[props.keys.path],
      id: item[props.keys.id],
      children: item[props.keys.children],
    }
  })
}
</script>

<template>
  <div />
</template>

<style scoped>

</style>
