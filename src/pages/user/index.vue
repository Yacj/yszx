<script setup lang="ts">
const files = ref([])
function requestUpload(file) {
  console.log(file)
  return false
}

function requestMethod(file) {
  console.log(file)
  return new Promise((resolve) => {
    resolve({
      status: 'success',
      response: {
        files: [
          { name: 'avatar1.jpg', url: 'https://tdesign.gtimg.com/site/avatar.jpg' },
          { name: 'avatar2.jpg', url: 'https://avatars.githubusercontent.com/u/11605702?v=4' },
        ],
      },
    });
  });
}
</script>

<template>
  <div class="container mx-auto">
    <t-upload
      v-model="files"
      placeholder="支持批量上传图片文件"
      theme="image"
      :before-upload="requestUpload"
      accept="image/*"
      multiple
      :auto-upload="false"
    />
  </div>
</template>

<style scoped>

</style>
