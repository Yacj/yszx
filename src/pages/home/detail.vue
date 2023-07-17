<script setup lang="ts">
import Breadcrumb from '@/components/Breadcrumb/breadcrumb.vue'
</script>

<template>
  <div class="content-detail max-w-screen-xl mx-auto mt-8">
    <Breadcrumb />
    <div class="grid grid-cols-3 grid-rows-1 gap-2 mt-6">
      <div class="col-span-2">
        1
      </div>
      <div class="col-start-3">
        <t-card title="资源推荐">
          <ul>
            <li>
              <img src="../../assets/img/list-cover.png" alt="">
              <span>作品1</span>
            </li>
          </ul>
        </t-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
