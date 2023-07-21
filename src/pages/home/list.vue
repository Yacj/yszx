<script setup lang="ts">
import {fileDownload} from "@/utils/file";
import { DownloadIcon, HeartFilledIcon, HeartIcon } from 'tdesign-icons-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.vue'

const list = ref([
  {
    browse_count: '5054',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/c7b85202104291509213625.jpg',
    title: 'CRMEB知识付费系统安装教程完整版【共十节】',
    type: 3,
    sort: 100,
    sales: 23022,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '0.00',
    member_money: '0.00',
    subject_id: 88,
    pay_type: 0,
    label: [
      '安装教程',
    ],
    id: 139,
    fake_sales: 0,
    add_time: '2021-04-29 16:16:46',
    count: 11,
    isCollect: false,
  },
  {
    browse_count: '2994',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/4a002202102051439139927.jpg',
    title: '用编程语言探索科学奥秘，数据科学与机器学习详细攻略',
    type: 4,
    sort: 8,
    sales: 17367,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '0.00',
    member_money: '0.00',
    subject_id: 72,
    pay_type: 2,
    label: [
      '满分数学',
    ],
    id: 92,
    fake_sales: 0,
    add_time: '2020-06-11 12:24:28',
    count: 19,
    isCollect: true,
  },
  {
    browse_count: '1357',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/da482202102051439146544.jpg',
    title: '初入职场老师教你10个常见的面试问题，助你节节高升',
    type: 3,
    sort: 2,
    sales: 8668,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '200.00',
    member_money: '100.00',
    subject_id: 72,
    pay_type: 1,
    label: [
      '解题技巧',
    ],
    id: 99,
    fake_sales: 4,
    add_time: '2020-09-18 14:40:48',
    count: 11,
  },
  {
    browse_count: '30',
    image: 'http://032356151.oss-cn-hangzhou.aliyuncs.com/6a035202306190011424904.png',
    title: '2222222222222',
    type: 4,
    sort: 0,
    sales: 87,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '0.00',
    member_money: '0.00',
    subject_id: 88,
    pay_type: 0,
    label: [
      '222222',
    ],
    id: 214,
    fake_sales: 0,
    add_time: '2023-06-19 00:14:01',
    count: 0,
  },
  {
    browse_count: '106',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/07d35202301101723293378.jpg',
    title: '直播测试间',
    type: 4,
    sort: 0,
    sales: 338,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '0.00',
    member_money: '0.00',
    subject_id: 62,
    pay_type: 0,
    label: [
      '直播',
    ],
    id: 198,
    fake_sales: 0,
    add_time: '2023-03-14 17:33:56',
    count: 0,
  },
  {
    browse_count: '106',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/5921f202209301612385859.jpg',
    title: '直播测试',
    type: 4,
    sort: 0,
    sales: 341,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '0.00',
    member_money: '0.00',
    subject_id: 88,
    pay_type: 0,
    label: [
      '直播测试',
    ],
    id: 181,
    fake_sales: 0,
    add_time: '2022-10-18 14:42:07',
    count: 0,
  },
  {
    browse_count: '175',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/23f91202209090945393141.jpg',
    title: '测试直播效果(演习)',
    type: 4,
    sort: 0,
    sales: 577,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '0.00',
    member_money: '0.00',
    subject_id: 88,
    pay_type: 0,
    label: [
      '演戏直播',
    ],
    id: 176,
    fake_sales: 0,
    add_time: '2022-09-09 09:50:52',
    count: 0,
  },
  {
    browse_count: '175',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/659f2202110261655225754.png',
    title: '专题专题测试',
    type: 5,
    sort: 0,
    sales: 569,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '12.00',
    member_money: '10.00',
    subject_id: 95,
    pay_type: 1,
    label: [
      '专题专题测试',
    ],
    id: 172,
    fake_sales: 0,
    add_time: '2022-08-04 14:51:40',
    count: 11,
  },
  {
    browse_count: '806',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/b46d1202111030931474013.jpg',
    title: '知识付费直播测试',
    type: 4,
    sort: 0,
    sales: 3219,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '0.00',
    member_money: '0.00',
    subject_id: 88,
    pay_type: 2,
    label: [
      '知识付费测试',
    ],
    id: 154,
    fake_sales: 0,
    add_time: '2021-11-04 09:36:48',
    count: 0,
  },
  {
    browse_count: '150',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/c743f202107271810073674.png',
    title: '图文轻专题',
    type: 1,
    sort: 0,
    sales: 419,
    is_light: 1,
    light_type: 1,
    is_mer_visible: 0,
    money: '0.01',
    member_money: '0.01',
    subject_id: 88,
    pay_type: 1,
    label: [
      '图文',
    ],
    id: 147,
    fake_sales: 0,
    add_time: '2021-07-29 17:42:49',
    count: 0,
  },
  {
    browse_count: '376',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/f9a0e202105251209381600.jpg',
    title: '轻松一节课',
    type: 3,
    sort: 0,
    sales: 879,
    is_light: 1,
    light_type: 3,
    is_mer_visible: 0,
    money: '0.01',
    member_money: '0.01',
    subject_id: 88,
    pay_type: 1,
    label: [
      '轻松',
    ],
    id: 144,
    fake_sales: 0,
    add_time: '2021-07-27 15:27:24',
    count: 0,
  },
  {
    browse_count: '427',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/18080202103301616003225.jpg',
    title: '要培养出富有创造力的学生',
    type: 2,
    sort: 0,
    sales: 1009,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '0.00',
    member_money: '0.00',
    subject_id: 72,
    pay_type: 0,
    label: [
      '创造能力',
    ],
    id: 136,
    fake_sales: 0,
    add_time: '2021-03-30 16:22:29',
    count: 1,
  },
  {
    browse_count: '256',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/883d0202103301610344021.jpg',
    title: '面向未来的教育方式',
    type: 2,
    sort: 0,
    sales: 674,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '0.02',
    member_money: '0.01',
    subject_id: 79,
    pay_type: 1,
    label: [
      '未来教育',
    ],
    id: 135,
    fake_sales: 0,
    add_time: '2021-03-30 16:21:02',
    count: 10,
  },
  {
    browse_count: '1229',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/0024b202102051450053773.jpg',
    title: '写作提升突破',
    type: 1,
    sort: 0,
    sales: 3868,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '0.00',
    member_money: '0.00',
    subject_id: 86,
    pay_type: 0,
    label: [
      '小学语文',
      '文章归纳',
    ],
    id: 134,
    fake_sales: 0,
    add_time: '2021-03-30 15:49:19',
    count: 3,
  },
  {
    browse_count: '703',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/e424520210330154635980.jpg',
    title: '不忘初心，逐梦前行2020年众邦科技年会',
    type: 3,
    sort: 0,
    sales: 1882,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '3998.00',
    member_money: '0.00',
    subject_id: 78,
    pay_type: 1,
    label: [
      '众邦年会',
    ],
    id: 133,
    fake_sales: 0,
    add_time: '2021-03-30 15:47:45',
    count: 1,
  },
  {
    browse_count: '903',
    image: 'http://cremb-zsff.oss-cn-beijing.aliyuncs.com/b3f4c202102051439113750.jpg',
    title: '轻松掌握多国语言，托福雅思助你完成出国留学梦',
    type: 3,
    sort: 0,
    sales: 2759,
    is_light: 0,
    light_type: 0,
    is_mer_visible: 0,
    money: '28880.00',
    member_money: '8.00',
    subject_id: 63,
    pay_type: 1,
    label: [
      '女神七宝茶',
    ],
    id: 129,
    fake_sales: 0,
    add_time: '2021-03-02 18:22:08',
    count: 3,
  },
])
const total = list.value.length
const pagination = ref({
  current: 1,
  pageSize: 12,
})
function handleClickCollect(isCollect: boolean, index: number) {
  MessagePlugin.success(isCollect ? '取消收藏成功' : '收藏成功')
  list.value[index].isCollect = !isCollect
}
function pageChange({
  current,
  pageSize,
}) {
  pagination.value = {
    current,
    pageSize,
  }
}
function handleDownload() {
  fileDownload('http://wlapi.jqweike.cn/wlxt_Data/WKK/GZ/FL0601/RJGZ010108/0101/03/wlxtRJGZYW0000003.mp4')
  MessagePlugin.success('下载成功')
}
</script>

<template>
  <div class="home-list container mx-auto my-7">
    <Breadcrumb />
    <div class="list mt-6 space-y-3">
      <t-card :bordered="false">
        <div class="space-x-6 flex-y-center text-sm">
          <div>
            综合
          </div>
          <t-divider layout="vertical" />
          <div>
            点击
          </div>
          <t-divider layout="vertical" />
          <div>
            最新
          </div>
        </div>
      </t-card>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <t-card v-for="(item, index) in list" :key="item.id" :bordered="false" class="list-card">
          <template #cover>
            <img :src="item.image" alt="" class="h-[190px]">
          </template>
          <div class="text-base h-10 cursor-pointer">
            <router-link to="/home/list/detail">
              {{ item.title }}
            </router-link>
          </div>
          <template #footer>
            <div class="grid grid-cols-2 gap-5">
              <div class="flex-y-center cursor-pointer">
                <transition :name="item.isCollect ? 'zoom' : '' " mode="out-in">
                  <HeartFilledIcon
                    v-if="item.isCollect" key="like"
                    class="text-2xl collect-icon collect-active"
                    @click="handleClickCollect(item.isCollect, index)"
                  />
                  <HeartIcon v-else key="unlike" class="text-2xl collect-icon" @click="handleClickCollect(item.isCollect, index)" />
                </transition>
                <span class="ml-1 text-base">
                  收藏
                </span>
              </div>
              <div class="flex-center ml-auto" @click="handleDownload">
                <DownloadIcon class="text-xl" />
                <span class="ml-1 text-base">
                  下载
                </span>
              </div>
              <!--              <div class="flex-center"> -->
              <!--                <ShareIcon class="" /> -->
              <!--                <span class=" ml-2"> -->
              <!--                  分享 -->
              <!--                </span> -->
              <!--              </div> -->
            </div>
          </template>
        </t-card>
      </div>
    </div>
    <t-pagination class="mt-6" :total="total" :page-size="pagination.pageSize" :current="pagination.current" @change="pageChange" />
  </div>
</template>

<style scoped lang="scss">
.collect-active{
  color: var(--brand-main);
}
/** 动画进行时的class **/
.zoom-enter-active, .zoom-leave-active {
  transition: all .15s cubic-bezier(0.42, 0, 0.34, 1.55);
}

/** 设置进场开始的状态和离场结束的状态，都是缩放到0 **/
.zoom-enter, .zoom-leave-to {
  transform: scale(0);
}

/** 设置进场结束的状态和离场开始的状态, 都是缩放到1 **/
.zoom-enter-to, .zoom-leave {
  transform: scale(1);
}
.list-card{
  transition: transform .2s,box-shadow .2s;
  box-shadow: 0 4px 8px 0 rgba(95,101,105,.05);
  cursor: pointer;
  &:hover{
    transform: translateY(-2px);
    //transform: scale(1.02);
    box-shadow: 0 4px 8px 0 rgba(95,101,105,.1);
  }
}
</style>
