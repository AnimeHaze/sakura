<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: undefined
  },
  content: {
    type: String,
    required: false,
    default: undefined
  },
  poster: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['open', 'watch'])

/** @type {import('vue').Ref<HTMLElement>} */
const notifyRef = ref(null)

function close () {
  notifyRef.value.parentNode.parentNode?.previousSibling?.click()
}

function clickOpen () {
  emit('open')
  close()
}

function clickWatch () {
  emit('watch')
  close()
}
</script>

<template>
  <div ref="notifyRef">
    <n-space inline>
      <div>
        <n-image
          preview-disabled
          :img-props="{ style: 'max-width: 60px; border-radius: 10px' }"
          :src="poster"
        />
      </div>

      <div>
        <div>
          <strong>
            {{ title }}
          </strong>

          <div
            v-if="description"
            class="text-gray-400"
          >
            {{ description }}
          </div>

          <div
            v-if="content"
            class="text-gray-400"
          >
            <n-ellipsis
              style="width: 220px"
              :tooltip="false"
              :line-clamp="2"
            >
              {{ content }}
            </n-ellipsis>
          </div>
        </div>
      </div>
    </n-space>

    <n-button
      class="mt-2 w-full"
      secondary
      @click="clickOpen"
    >
      Открыть релиз
    </n-button>
    <n-button
      class="mt-2 w-full"
      type="primary"
      secondary
      @click="clickWatch"
    >
      Смотреть
    </n-button>
  </div>
</template>

<style scoped>

</style>
