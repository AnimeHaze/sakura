<template>
  <div
    class="sticky px-5"
  >
    <n-form :show-feedback="false">
      <n-form-item>
        <n-auto-complete
          v-model:value="query"
          :loading="loading"
          :input-props="{
            autocomplete: 'disabled'
          }"
          :options="options"
          clearable
          size="medium"
          type="text"
          class="mr-2"
          placeholder="Введите запрос"
          @keyup.enter="search"
          @blur="search"
        />

        <n-button
          strong
          secondary
          type="primary"
          @click="openFilters"
        >
          <span class="mdi mdi-filter" />
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['search', 'open-filters'])
defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false
  }
})

const query = ref('')

const options = computed(() => {
  return [query.value, 'Sword art online', 'Neko'].map((value) => {
    return {
      label: value,
      value
    }
  })
})

function search () {
  emit('search', query.value)
}

function openFilters () {
  emit('open-filters')
}
</script>
