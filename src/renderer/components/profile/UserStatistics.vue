<template>
  <div>
    <h3>Статистика</h3>
    <n-space>
      <n-card
        class="list"
        size="small"
        :title="statistics.views.toString()"
      >
        Просмотры
        <div class="icon">
          <eye />
        </div>
      </n-card>
      <n-card
        class="list"
        size="small"
        :title="statistics.likes.toString()"
      >
        Лайки
        <div class="icon">
          <heart-outline />
        </div>
      </n-card>
      <n-card
        class="list"
        size="small"
        :title="statistics.comments.toString()"
      >
        Комментарии
        <div class="icon">
          <chatbox-ellipses-outline />
        </div>
      </n-card>
      <n-card
        class="list"
        size="small"
        :title="statistics.friends.toString()"
      >
        Друзей
        <div class="icon">
          <people-outline />
        </div>
      </n-card>
    </n-space>
  </div>
</template>

<script setup>
import { PeopleOutline, ChatboxEllipsesOutline, HeartOutline, Eye } from '@vicons/ionicons5'

defineProps({
  statistics: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>

</style>
