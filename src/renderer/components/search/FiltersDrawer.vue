<script setup>
import { reactive, ref } from 'vue'

defineExpose({
  openFilters
})

const showFilters = ref(false)

function openFilters () {
  showFilters.value = true
}

const filters = reactive({
  genres: [],
  years: [],
  season: [],
  sort: [],
  releaseFinished: false
})

const genresList = ref([{
  label: 'Этти',
  value: 'etti'
}, {
  label: 'Гарем',
  value: 'harem'
}])

const yearsList = ref([{
  label: 'Этти',
  value: 'etti'
}, {
  label: 'Гарем',
  value: 'harem'
}])

const seasonList = ref([{
  label: 'Этти',
  value: 'etti'
}, {
  label: 'Гарем',
  value: 'harem'
}])

const sortList = ref([{
  label: 'Этти',
  value: 'etti'
}, {
  label: 'Гарем',
  value: 'harem'
}])

function clearFilters () {
  filters.genres = []
  filters.years = []
  filters.season = []
  filters.sort = []
  filters.releaseFinished = []
}
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
        />

        <n-select
          v-model:value="filters.years"
          class="mb-2"
          placeholder="Выберите год"
          multiple
          :options="yearsList"
        />

        <n-select
          v-model:value="filters.season"
          class="mb-2"
          placeholder="Выберите сезон"
          multiple
          :options="seasonList"
        />

        <n-select
          v-model:value="filters.sort"
          class="mb-2"
          placeholder="Сортировка"
          :options="sortList"
        />

        <n-checkbox v-model:checked="filters.releaseFinished">
          Релиз завершен
        </n-checkbox>

        <div class="mt-3">
          <n-space vertical>
            <n-button
              class="w-full"
              strong
              secondary
              type="error"
              @click="clearFilters"
            >
              <template #icon>
                <n-icon>
                  <span class="mdi mdi-filter" />
                </n-icon>
              </template>
              Очистить
            </n-button>

            <n-button
              class="w-full"
              strong
              secondary
              type="success"
            >
              <template #icon>
                <n-icon>
                  <span class="mdi mdi-filter" />
                </n-icon>
              </template>
              Применить
            </n-button>
          </n-space>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
