<script setup>
import UserListEmpty from './UserListEmpty.vue'
import UserListAction from './UserListAction.vue'
import { useUserStore } from '../../../store'
import { ref } from 'vue'

const config = useUserStore()
const userListSelect = ref(undefined)

</script>

<template>
  <n-select
    v-model:value="userListSelect"
    clearable
    placeholder="Добавить в папку"
    :options="config.userListsForSelect"
  >
    <template #empty>
      <user-list-empty />
    </template>

    <template #action>
      <user-list-action />
    </template>
  </n-select>
</template>

<style scoped>

</style>
