<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { NCheckbox, NSelect } from 'naive-ui'
import { useSearchStore } from '@/store'

const search = useSearchStore()
const { filtersList } = storeToRefs(search)

const props = defineProps({
  showFilters: {
    type: Boolean,
    default: false
  }
})

const filtersComponents = {
  checkbox: NCheckbox,
  select: NSelect,
  'multi-select': NSelect
}

const emit = defineEmits(['update:showFilters'])

const showFilters = computed({
  set (value) {
    emit('update:showFilters', value)
  },
  get () {
    return props.showFilters
  }
})
</script>

<template>
  <n-drawer
    v-model:show="showFilters"
    :width="300"
    placement="right"
  >
    <n-drawer-content title="Фильтры">
      <div class="select-none">
        <div
          v-for="filter of filtersList"
          :key="filter.id"
        >
          <component
            :is="filtersComponents[filter.type]"
            v-if="filter.type === 'select'"
            v-model:value="search.filters[filter.id]"
            class="mb-2"
            :placeholder="filter.name"
            :options="filter.options"
            :multiple="filter.multiple"
            @update="search.resetPage"
          />

          <component
            :is="filtersComponents[filter.type]"
            v-else
            v-model:checked="search.filters[filter.id]"
            class="mb-2"
            :multiple="filter.multiple"
            @update="search.resetPage"
          >
            {{ filter.name }}
          </component>
        </div>

        <div class="mt-3">
          <n-button
            class="w-full"
            strong
            secondary
            type="error"
            @click="search.clearFilters"
          >
            <template #icon>
              <n-icon>
                <span class="mdi mdi-filter" />
              </n-icon>
            </template>
            Очистить
          </n-button>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
