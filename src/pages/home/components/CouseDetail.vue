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
const ChapterID = ref('')
const expanded = ref([])

onMounted(() => {
  getResDetail()
})

function getResDetail() {
  resourceService.get_details({
    ResCode: props.resCode,
    ResType: 'Couse',
  }).then((res) => {
    const {
      chapter,
      resource,
    } = res.data
    chapterList.value = chapter
    if (chapter) {
      if (chapter[0].sub.length === 0) {
        ChapterID.value = chapter[0].id
      }
      else {
        ChapterID.value = chapter[0].sub[0].id
      }
      chapter.forEach((item) => {
        if (item.sub.length > 0) {
          expanded.value.push(item.id)
        }
      })
    }
    resourceData.value = resource
    getChapterVideoData()
  })
}

function handleClick(id: number) {
  ChapterID.value = id
  getChapterVideoData()
}

function getChapterVideoData() {
  resourceService.getByChapterID({
    ChapterID: ChapterID.value,
  }).then((res) => {
    const {
      videoPath,
    } = res.data
    videoSrc.value = baseUrl.file + videoPath
  })
}
</script>

<template>
  <div class="course-detail flex wh-full mb-5">
    <div class="course-detail-left w-300 mr-5">
      <t-card :bordered="false" class="course-detail-play">
        <video :src="videoSrc" controls class="w-full" />
      </t-card>
      <t-card :bordered="false">
        <t-tabs :default-value="1">
          <t-tab-panel :value="1" label="介绍">
            <p class="m-8">
              {{ resourceData.content }}
              {{ resourceData.keyword }}
            </p>
          </t-tab-panel>
        </t-tabs>
      </t-card>
    </div>
    <div class="course-detail-right flex-1 h-180 overflow-y-scroll relative">
      <t-card title="章节目录" :bordered="false" header-bordered>
        <t-menu
          v-model:expanded="expanded"
          :value="ChapterID"
          class="!wh-full"
        >
          <template v-for="item in chapterList" :key="item.id">
            <t-menu-item
              v-if="item.sub.length === 0"
              :value="item.id"
              @click="handleClick(item.id)"
            >
              {{ item.name }}
            </t-menu-item>
            <t-submenu
              v-else
              :value="item.id"
              :title="item.name"
            >
              <template v-for="row in item.sub" :key="row.id">
                <t-menu-item
                  :value="row.id"
                  @click="handleClick(row.id)"
                >
                  {{ row.name }}
                </t-menu-item>
              </template>
            </t-submenu>
          </template>
        </t-menu>
      </t-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.course-detail-left){
  .t-card__body{
    padding: 0;
  }
}
:deep(.course-detail-right){
  .t-button{
    justify-content: normal;
  }
  .t-card__body{
    padding: 0;
  }
}
</style>
