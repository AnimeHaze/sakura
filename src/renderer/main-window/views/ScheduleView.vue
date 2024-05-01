<script setup>
import { ref } from 'vue'
import { capitalizeFirstLetter } from '../../../utils'

const value = ref(Date.now())
const handleUpdateValue = (_, { year, month, date }) => {}
const isDateDisabled = (timestamp) => {
  return false
}
</script>

<template>
  <div class="p-10">
    <n-calendar
      v-model:value="value"
      :is-date-disabled="isDateDisabled"
      @update:value="handleUpdateValue"
    >
      <template #header="{ year, month }">
        {{
          capitalizeFirstLetter(
            new Intl.DateTimeFormat('ru-RU', {month: "long"})
              .format(new Date(year, month, 1))
          )
        }}
      </template>

      <template #default="{ year, month, date }">
        <div>
          <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <div>{{ year }}-{{ month }}-{{ date }}</div>
        </div>
      </template>
    </n-calendar>
  </div>
</template>

<style scoped>

</style>
