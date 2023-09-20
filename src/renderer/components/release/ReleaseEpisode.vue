<template>
  <div
    class="w-full mb-2 rounded-md p-2 episode cursor-pointer"
    @click="$emit('open')"
  >
    <n-space
      justify="space-between"
      class="mt-1"
    >
      <div
        class="inline-flex gap-1"
      >
        <n-space
          class="ml-1 mt-1"
          justify="start"
        >
          <n-tooltip
            placement="right"
            trigger="hover"
          >
            <template #trigger>
              <n-icon
                size="20"
                @click="$emit('change-watch-status')"
              >
                <component :is="watchedIcon" />
              </n-icon>
            </template>
            {{ watchedText }}
          </n-tooltip>

          <div class="font-bold">
            Серия {{ episodeNumber }}
          </div>

          <div>
            {{ name }}
          </div>
        </n-space>
      </div>

      <n-space>
        <n-space>
          <n-tag
            v-for="resolution in [1080, 720, 480]"
            :key="resolution"
            :bordered="false"
            :type="resolution === 1080 ? 'success' : 'default'"
          >
            {{ resolution }}p
          </n-tag>
        </n-space>

        <div class="mt-2 mr-2 text-zinc-500">
          {{ date }}
        </div>
      </n-space>
    </n-space>
  </div>
</template>

<script setup>
import { Eye, EyeOff } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { computed } from 'vue'

defineEmits(['change-watch-status', 'open'])

const properties = defineProps({
  resolutions: {
    type: Array,
    required: true
  },
  episodeId: {
    type: [String, Number],
    required: true
  },
  episodeNumber: {
    type: [String, Number],
    required: true
  },
  watched: {
    type: Boolean,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false,
    default: ''
  }
})

const watchedText = computed(() => properties.watched ? 'Просмотрено' : 'Не просмотрено')
const watchedIcon = computed(() => properties.watched ? Eye : EyeOff)
</script>

<style scoped>

</style>
