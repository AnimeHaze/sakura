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
          @change="search.resetPage"
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
import { computed } from 'vue'
import { useSearchStore } from '../../store'

const search = useSearchStore()
const emit = defineEmits(['update:query', 'open-filters'])

const props = defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  query: {
    type: String,
    default: ''
  }
})

const query = computed({
  set: (value) => {
    emit('update:query', value)
  },
  get: () => {
    return props.query
  }
})

const options = computed(() => {
  return ['Sword art online', 'Neko'].map((value) => {
    return {
      label: value,
      value
    }
  })
})

function openFilters () {
  emit('open-filters')
}
</script>
