<script setup lang="ts">
import { BookOpenIcon } from 'tdesign-icons-vue-next'
import { SHA1 } from '@/utils/sha1'
import { formatDay } from '@/utils/dateUtils'
import { resourceService } from '@/api/modules/resource'
import type { DetailFileProps } from '@/pages/home/prop'

const props = defineProps<DetailFileProps>()
const tabValue = ref(1)
const bookData = ref({})
const recommendList = ref([])
onMounted(() => {
  getBookDetail()
  handleGetRecommend()
})

function getBookDetail() {
  resourceService.get_details({
    ResCode: props.rescode,
    ResType: props.restype,
  }).then((res) => {
    console.log(res)
    bookData.value = res.data
  })
}
function handleGetRecommend() {
  resourceService.get_recommend({
    ResCode: props.rescode,
  }).then((res) => {
    console.log(res)
    recommendList.value = res.data
  })
}
function handleToRead(ReleID: string): void {
  const AllowReadPercentage: string = '1'
  const dataID: string = `${ReleID}-Pdf`
  const organizationExternalId: string = '18-a0f983fb11364d07a447c1dcb822e82d'
  const AppId: string = '41'
  const secret: string = 'fsdafsa*7fsa&j%j1f2'

  const key: string = AllowReadPercentage + AppId + dataID + organizationExternalId + secret
  const AuthorToken: string = SHA1(key)

  const url: string = `https://reader.keledge.com/#/pdfReader?contentexternalid=${dataID}&organizationExternalId=${organizationExternalId}&objectType=104&process=&tocValue=&AppId=${AppId}&AuthorToken=${AuthorToken}&AllowReadPercentage=${AllowReadPercentage}`
  window.open(url)
}

function handleNavTo(resCode: string, type: string, resName: string, Code: string) {
  window.open(`/#/home/detail?ResCode=${resCode}&ResType=${type}&ResName=${resName}&categoryCode=${Code}`, '_blank')
}
</script>

<template>
  <div class="mb-5 flex">
    <div class="w-300">
      <div class="flex">
        <div class="h-90">
          <t-image :src="bookData.logoUrl" class="!wh-full rounded" />
        </div>
        <t-card class="flex-1 !ml-5" :bordered="false">
          <div class="title mt-3">
            <h1 class="text-xl font-bold">
              {{ bookData.name }}
            </h1>
          </div>
          <ul class="mt-5 space-y-3 text-base ml-1">
            <li>
              作者：{{ bookData.author }}
            </li>
            <li>
              出版社/提供方：{{ bookData.press }}
            </li>
            <li>
              出版时间：{{ formatDay(bookData.createTime) }}
            </li>
            <li>
              格 式：PDF(加密)
            </li>
            <li>
              阅读量：{{ bookData.viewCount }}
            </li>
          </ul>
          <div class="btn mt-18 w-35">
            <t-button block @click="handleToRead(bookData.releID)">
              <template #icon>
                <BookOpenIcon />
              </template>
              在线阅读
            </t-button>
          </div>
        </t-card>
      </div>
      <t-tabs v-model="tabValue" size="large" class="!mt-5">
        <t-tab-panel :value="1" label="简介" :destroy-on-hide="false">
          <div class="p-5 space-y-5">
            <div>
              <span class="text-base font-bold"> 简介：</span>
              <p class="mt-3 text-base ">
                {{ bookData.introduction }}
              </p>
            </div>
            <div>
              <span class="text-base font-bold"> 图书信息：</span>
              <p class="mt-3 text-base ">
                关键词： {{ bookData.keyword }}
              </p>
              <p class="mt-3 text-base ">
                ISBN： {{ bookData.releID }}
              </p>
            </div>
          </div>
        </t-tab-panel>
        <t-tab-panel :value="2" label="目录" :destroy-on-hide="false">
          <template #panel>
            <div v-if="bookData.catalog" class="p-5 text-base" v-html="bookData.catalog" />
            <div v-else class="p-5 text-base">
              暂无目录
            </div>
          </template>
        </t-tab-panel>
      </t-tabs>
    </div>
    <div class="flex-1 recommend h-170 overflow-y-scroll relative ml-5">
      <t-card :bordered="false" header-bordered class="card-title">
        <template #title>
          <div class="title text-base">
            同类电子书推荐
          </div>
        </template>
        <t-space direction="vertical" class="w-full mt-5">
          <t-card
            v-for="(item, index) in recommendList" :key="index + 1" class="cursor-pointer"
            :bordered="false"
            @click="handleNavTo(item.resCode, item.type, item.name, item.cateCode)"
          >
            <template #cover>
              <div class="flex-center w-full">
                <t-image
                  :src="item.logo"
                  class="max-w-50"
                  fit="cover"
                />
              </div>
            </template>
            <div class="text-center text-base font-medium mt-1 cursor-pointer hover:text-[color:var(--td-brand-color)]">
              {{ item.name }}
            </div>
          </t-card>
        </t-space>
      </t-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.recommend){
  .t-card__title--bordered{
    border: none;
  }
  .title{
    position: relative;
    &::after{
      content: "";
      display: inline-block;
      width: 40px;
      height: 2px;
      background: var(--td-brand-color);
      border-radius: 2px;
      position: absolute;
      left: 0;
      bottom: -10px;
    }
  }
}
</style>
