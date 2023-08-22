<script setup lang="ts">
import { resourceService } from '@/api/modules/resource'
import baseUrl from '@/utils/url'

const props = defineProps({
  resCode: {
    type: String,
    required: true,
  },
})
const videoSrc = ref('')
const resourceData = ref({})
const chapterList = ref([])
const videoId = ref('')
resourceService.get_details({
  ResCode: props.resCode,
  ResType: 'Couse',
}).then((res) => {
  const {
    chapter,
    resource,
  } = res.data
  chapterList.value = chapter
  videoId.value = chapter[0].id
  videoSrc.value = baseUrl.file + resource.videoPath
  resourceData.value = resource
})
function handleClick(id: number) {
  videoId.value = id
}
</script>

<template>
  <div class="course-detail flex wh-full mb-5">
    <div class="course-detail-left w-300 mr-5">
      <t-card :bordered="false" class="course-detail-play">
        <video :src="videoSrc" controls />
      </t-card>
      <t-card :bordered="false">
        <t-tabs :default-value="1">
          <t-tab-panel :value="1" label="介绍">
            <p style="margin: 20px">
              {{ resourceData.content }}
              {{ resourceData.keyword }}
            </p>
          </t-tab-panel>
        </t-tabs>
      </t-card>
    </div>
    <div class="course-detail-right flex-1">
      <t-card title="章节目录" :bordered="false" header-bordered>
        <ul class="space-y-3">
          <li
            v-for="item in chapterList" :key="item.id"
          >
            <t-button
              block
              :variant="item.id === videoId ? 'base' : 'text'"
              @click="handleClick(item.id)"
            >
              {{ item.name }}
            </t-button>
          </li>
        </ul>
      </t-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.course-detail-right{

}
:deep(.course-detail-right){
  .t-button{
    justify-content: normal;
  }
}
</style>
