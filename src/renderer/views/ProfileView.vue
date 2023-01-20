<template>
  <n-card
    :segmented="{
      content: true,
      footer: 'soft'
    }"
  >
    <template #header>
      <n-space inline>
        <div>
          <n-avatar
            :size="48"
            :src="user.information.avatar"
          />
        </div>
        <div>
          <span>AniCoder</span>
          <div class="user-role">
            Пользователь
          </div>
        </div>
      </n-space>
    </template>

    <statistics :statistics="user.information" />
  </n-card>
</template>

<script setup>
import { NCard } from 'naive-ui'
import { useUserStore } from '../store'
import Statistics from '../components/profile/UserStatistics.vue'

const user = useUserStore()
</script>

<style>
.user-role {
  font-size: 15px;
  color: #666;
}
.icon {
  position: absolute;
  transform: scale(6);
  width: 20px;
  opacity: 0.15;
  top: 30px;
  left: 27px;
}
.list {
  background-color: var(--n-color-modal);
  color: var(--n-text-color);
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
