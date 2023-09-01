<template>
  <div>
    <n-image
      class="poster mb-3"
      round
      lazy
      :src="posterImage"
      :preview-src="posterImageFull ?? posterImage"
      :show-toolbar="false"
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

    <n-button class="w-full mb-3">
      Смотреть
    </n-button>

    <n-select
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
  </div>
</template>

<script setup>
import { CheckmarkOutline } from '@vicons/ionicons5'

defineProps({
  posterImage: {
    type: String,
    required: true
  },
  posterImageFull: {
    type: String,
    required: false,
    default: null
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
.poster {
  max-width: 240px;
  justify-content: center;
  opacity: 0.8;
  object-fit: cover;
  border-radius: 4px;
  transition: opacity 125ms ease-in-out;
}

.poster:hover {
  opacity: 1;
}
</style>
