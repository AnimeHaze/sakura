<template>
  <div
    class="flex cursor-pointer"
    @click="openRelease(releaseInfo.id)"
  >
    <div
      class="relative"
    >
      <n-popover
        placement="right-start"
        trigger="hover"
        width="360"
      >
        <template #trigger>
          <n-image
            class="mb-3 poster"
            round
            lazy
            :alt="releaseInfo.names.ru"
            preview-disabled
            :src="poster"
          >
            <template #placeholder>
              <n-skeleton
                :sharp="false"
                width="100%"
                height="100%"
                size="medium"
              />
            </template>
          </n-image>
        </template>

        <template #header>
          <n-text
            strong
            depth="1"
          >
            <div class="break-words">
              {{ releaseInfo.names.ru }}
            </div>
          </n-text>
        </template>

        <div>
          <div>
            <b>Тип:</b> Сериал
          </div>
          <div>
            <b>Эпизоды:</b> 26
          </div>
          <div>
            <b>Студии:</b> 22
          </div>
        </div>

        <template #footer>
          <user-list-select />
        </template>
      </n-popover>

      <div style="position: absolute; top: 0; right: 0">
        <n-tag
          :bordered="false"
          type="success"
          style="border-radius: 0 0 0 9px"
          :color="{ color: 'rgba(99, 226, 183, 0.7)', textColor: '#ffffff' }"
        >
          <n-tooltip
            trigger="hover"
            placement="right"
          >
            {{ releaseInfo.rating }}
            <template #trigger>
              {{ releaseInfo.ratingFormated }}
            </template>
          </n-tooltip>
          <template #icon>
            <n-icon
              size="16"
              :component="Star"
            />
          </template>
        </n-tag>
      </div>
    </div>
    <div class="ml-2 max-h-262px">
      <div class="break-words font-600 text-xl">
        {{ releaseInfo.names.ru }}
      </div>
      <div class="break-words text-gray-500 font-medium text-l">
        {{ releaseInfo.names.en }}
      </div>
      <div class="mb-1 flex flex-row mt-2 overflow-ellipsis">
        <n-tag
          v-for="genre in releaseInfo.genres"
          :key="genre.id"
          :bordered="false"
          type="success"
          class="mr-2 rounded"
        >
          {{ genre.label }}
        </n-tag>
      </div>
      <div class="mt-2 text-gray-500 text-sm overflow-hidden overflow-ellipsis description">
        {{ releaseInfo.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Star } from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import UserListSelect from '../user-list/popup/UserListSelect.vue'

const properties = defineProps({
  releaseInfo: {
    type: Object,
    required: true
  },
  userLists: {
    type: Array,
    required: true
  }
})

const router = useRouter()

const poster = computed(x => properties.releaseInfo.posters.medium ?? properties.releaseInfo.posters.small)

function openRelease (id) {
  router.push({ name: 'Release', params: { id } })
}
</script>

<style scoped>
.description {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.poster {
  height: 207px;
  border-radius: 6px;
}
</style>
