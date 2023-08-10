<script setup lang="ts">
import Result403Icon from '@/assets/icons/assets-result-403.svg'
import Result404Icon from '@/assets/icons/assets-result-404.svg'
import Result500Icon from '@/assets/icons/assets-result-500.svg'
import ResultIeIcon from '@/assets/icons/assets-result-ie.svg'
import ResultMaintenanceIcon from '@/assets/icons/assets-result-maintenance.svg'
import ResultWifiIcon from '@/assets/icons/assets-result-wifi.svg'

interface Props {
  bgUrl?: string
  title?: string
  tip?: string
  type?: string
}
const props = withDefaults(defineProps<Props>(), {
  bgUrl: '',
  title: '',
  tip: '',
  type: '403',
})

const dynamicComponent = computed(() => {
  switch (props.type) {
    case '403':
      return Result403Icon
    case '404':
      return Result404Icon
    case '500':
      return Result500Icon
    case 'ie':
      return ResultIeIcon
    case 'wifi':
      return ResultWifiIcon
    case 'maintenance':
      return ResultMaintenanceIcon
    default:
      return Result403Icon
  }
})
</script>

<template>
  <div class="result-container">
    <div class="result-bg-img">
      <img :src="dynamicComponent" alt="result-bg-img">
    </div>
    <div class="result-title">
      {{ title }}
    </div>
    <div class="result-tip">
      {{ tip }}
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.result {
  &-link {
    color: var(--td-brand-color);
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: var(--td-brand-color);
    }

    &:active {
      color: var(--td-brand-color);
    }

    &--active {
      color: var(--td-brand-color);
    }

    &:focus {
      text-decoration: none;
    }
  }

  &-container {
    min-height: 400px;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &-bg-img {
    width: 200px;
    color: var(--td-brand-color);
  }

  &-title {
    font-style: normal;
    margin-top: var(--td-comp-margin-l);
    color: var(--td-text-color-primary);
    font: var(--td-font-title-large);
    letter-spacing: 1px;
  }

  &-tip {
    margin: var(--td-comp-margin-s) 0 var(--td-comp-margin-xxxl);
    font: var(--td-font-body-medium);
    color: var(--td-text-color-secondary);
  }
}
</style>
