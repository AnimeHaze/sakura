<template>
  <div class="flex inline-flex cursor-pointer">
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
            preview-disabled
            :src="releaseInfo.poster"
          >
            <template #placeholder>
              <n-skeleton
                :height="321"
                :width="224"
                :sharp="false"
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
              {{ releaseInfo.title }}
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
          <n-select
            v-model:value="value"
            placeholder="Добавить в папку"
            :options="foolders"
          >
            <template #action>
              <div>
                <n-button class="w-full mb-2">
                  Удалить из папки
                </n-button>
              </div>
              <div class="flex inline">
                <div class="mr-2 w-full">
                  <n-input placeholder="Создать папку" />
                </div>
                <div>
                  <n-button>
                    <n-icon size="24">
                      <checkmark-outline />
                    </n-icon>
                  </n-button>
                </div>
              </div>
            </template>
          </n-select>
        </template>
      </n-popover>

      <div style="position: absolute; top: 0; right: 0">
        <n-tag
          :bordered="false"
          type="success"
          style="border-radius: 0 0 0 9px"
          :color="{ color: 'rgba(99, 226, 183, 0.7)', textColor: '#ffffff' }"
        >
          {{ releaseInfo.rating }}
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
        {{ releaseInfo.title }}
      </div>
      <div class="break-words text-gray-500 font-medium text-l">
        {{ releaseInfo.altNames[0] }}
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
import { Star, CheckmarkOutline } from '@vicons/ionicons5'

defineProps({
  releaseInfo: {
    type: Object,
    required: true
  }
})

const foolders = [
  {
    label: 'Смотрю',
    value: '1'
  },
  {
    label: 'Запланировано',
    value: '2'
  },
  {
    label: 'Пересматриваю',
    value: '3'
  },
  {
    label: 'Любимое',
    value: '4'
  },
  {
    label: 'Брошено',
    value: '5'
  }
]

</script>

<style scoped>
.description {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.poster {
  min-width: 138px;
  width: 138px;
  max-width: 138px;
  height: 207px;
  border-radius: 6px;
}
</style>
