<template>
  <n-image
    class="poster mb-3"
    round
    lazy
    :src="posterImage"
  >
    <template #placeholder>
      <div
        style="
            width: 224px;
            height: 321px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #8882;
          "
      >
        Loading
      </div>
    </template>
  </n-image>

  <n-button class="w-full mb-3">
    Смотреть
  </n-button>

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
        <div class="mr-2">
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

<script setup>
import { CheckmarkOutline } from '@vicons/ionicons5'

defineProps({
  posterImage: {
    type: String,
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
