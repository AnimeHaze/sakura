<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '../../store'

const search = useSearchStore()
const { sortList, genresList, seasonList, yearsList, filters } = storeToRefs(search)

const props = defineProps({
  showFilters: {
    type: Boolean,
    default: false
  }
})

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
      <div>
        <n-select
          v-model:value="filters.genres"
          class="mb-2"
          placeholder="Выберите жанр"
          multiple
          :options="genresList"
          @change="search.resetPage"
        />

        <n-select
          v-model:value="filters.years"
          class="mb-2"
          placeholder="Выберите год"
          multiple
          :options="yearsList"
          @change="search.resetPage"
        />

        <n-select
          v-model:value="filters.season"
          class="mb-2"
          placeholder="Выберите сезон"
          multiple
          :options="seasonList"
          @change="search.resetPage"
        />

        <n-select
          v-model:value="filters.sort"
          class="mb-2"
          placeholder="Сортировка"
          :options="sortList"
          @change="search.resetPage"
        />

        <n-checkbox
          v-model:checked="filters.releaseFinished"
          @change="search.resetPage"
        >
          Релиз завершен
        </n-checkbox>

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
