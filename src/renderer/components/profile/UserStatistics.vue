<template>
  <div>
    <h5 class="header-five">
      Статистика
    </h5>
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
.icon {
  position: absolute;
  transform: scale(6);
  width: 20px;
  opacity: 0.15;
  top: 30px;
  left: 27px;
}
.list {
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 6px;
  background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
  box-shadow: none;
  position: relative;
  overflow: hidden;
  min-width: 100px;
  padding: 16px;
  -moz-box-flex: 1;
  flex-grow: 1;
  flex-basis: 0;
}
</style>
