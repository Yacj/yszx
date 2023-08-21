<script setup lang="ts">

</script>

<template>
  <div>
    <t-card title="安全设置" class="card-title" :bordered="false">
      <t-list>
        <t-list-item>
          <t-list-item-meta title="修改手机" description="已绑定手机" />
          <template #action>
            <t-button theme="primary" variant="text">
              修改
            </t-button>
          </template>
        </t-list-item>
        <t-divider class="m0" />
        <t-list-item>
          <t-list-item-meta title="账户密码" description="用于保护账户信息或登录安全" />
          <template #action>
            <t-button theme="primary" variant="text">
              修改
            </t-button>
          </template>
        </t-list-item>
      </t-list>
    </t-card>
  </div>
</template>

<style scoped lang="scss">

</style>
