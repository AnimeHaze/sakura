<template>
  <div>
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
  </div>
</template>

<script setup>
import { NCard } from 'naive-ui'
import { useUserStore } from '@/store'
import Statistics from '../components/profile/UserStatistics.vue'

const user = useUserStore()
</script>

<style>
.user-role {
  font-size: 15px;
  color: #666;
}
</style>
