<template>
  <div
    class="mb-2 rounded-md p-2"
    :class="{ 'cursor-pointer': !loading, 'cursor-wait': loading }"
    :style="{ background: progress }"
    @click="!loading && $emit('open')"
    @mouseover="hover = true"
    @mouseleave="hover = false"
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
          inline
          justify="start"
        >
          <div v-if="showWatchButton">
            <n-tooltip
              placement="right"
              trigger="hover"
            >
              <template #trigger>
                <n-icon
                  size="20"
                  @click.stop="$emit('change-watch-status')"
                >
                  <component :is="watchedIcon" />
                </n-icon>
              </template>
              {{ watchedText }}
            </n-tooltip>
          </div>

          <n-space>
            <div v-if="number" class="font-bold">
              Серия {{ number }}
            </div>

            <div>
              {{ name }}
            </div>
          </n-space>
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

        <div v-if="date" class="mt-1 mr-2 text-zinc-400">
          {{ new Date(date * 1000).toLocaleString() }}
        </div>
      </n-space>
    </n-space>
  </div>
</template>

<script setup>
import { Eye, EyeOff } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { computed, ref } from 'vue'
import { getRandomIntInclusive } from '../../../../utils'

const hover = ref(false)
defineEmits(['change-watch-status', 'open'])

const props = defineProps({
  resolutions: {
    type: Array,
    required: true
  },
  id: {
    type: [String, Number],
    required: true
  },
  number: {
    type: [String, Number],
    required: false
  },
  watched: {
    type: Boolean,
    required: false,
    default: false
  },
  showWatchButton: {
    type: Boolean,
    default: true
  },
  date: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false,
    default: ''
  },
  active: {
    type: Boolean,
    default: true
  },
  percent: {
    type: Number,
    required: false,
    default: () => getRandomIntInclusive(0, 100)
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const watchedText = computed(() => props.watched ? 'Просмотрено' : 'Не просмотрено')
const watchedIcon = computed(() => props.watched ? Eye : EyeOff)

function calcProgress (backgroundColor, progressColor, percent) {
  return `linear-gradient(
    90deg, ${backgroundColor}
    0%, ${backgroundColor} ${percent}%,
    ${progressColor} ${percent}%,
    ${progressColor} 100%
  )`
}

const progress = computed(() => {
  if (props.active) {
    return hover.value
      ? calcProgress('rgb(99 226 183 / 13%)', 'rgb(39 102 74 / 13%)', props.percent)
      : calcProgress('rgb(99 226 183 / 18%)', 'rgb(39 102 74 / 18%)', props.percent)
  }

  return hover.value
    ? calcProgress('rgb(255 255 255 / 18%)', 'rgb(102 102 102 / 18%)', props.percent)
    : calcProgress('rgb(255 255 255 / 18%)', 'rgb(102 102 102 / 13%)', props.percent)
})
</script>

<style scoped>
</style>
