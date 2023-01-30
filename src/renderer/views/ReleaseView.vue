<template>
  <AnimePoster />
  <n-space
    size="large"
    vertical
  >
    <n-layout
      class="h-screen transparent-color"
      has-sider
    >
      <n-layout-sider
        content-style="padding: 24px;"
      >
        <release-sider
          :poster-image="posterImage"
        />
      </n-layout-sider>
      <n-layout class="transparent-color">
        <n-layout-content class="p-4 py-2 transparent-color">
          <n-space
            vertical
            class="mt-4"
          >
            <div class="flex flex-row mt-2">
              <div class="mx-1 font-500 text-gray-400">
                Китай
              </div> <div class="mx-1 font-500 text-gray-400">
                2042
              </div> <div class="mx-1 font-500 text-gray-400">
                Позаимствовано
              </div>
            </div>
            <div class="break-words font-600 flex-1 text-2xl">
              {{ release.title }}
            </div>
            <div class="text-gray-400 font-500 break-words whitespace-pre-line">
              {{ altTitles }}
            </div>
          </n-space>
          <n-space
            size="small"
            class="mt-3"
          >
            <n-tag
              :bordered="false"
              size="medium"
            >
              Детектив
            </n-tag>
            <n-tag
              :bordered="false"
              size="medium"
            >
              Реинкарнация
            </n-tag>
            <n-tag
              :bordered="false"
              size="medium"
            >
              ...
            </n-tag>
          </n-space>

          <div class="mt-3 flex flex-row">
            <n-tooltip
              trigger="hover"
              :show-arrow="false"
              placement="bottom"
            >
              <template #trigger>
                <n-button
                  class="px-1 mx-1"
                  quaternary
                >
                  <n-icon>
                    <star style="color: #ffa726;" />
                  </n-icon>
                  <span class="px-1">10.00</span>
                </n-button>
              </template>
              <n-rate allow-half />
            </n-tooltip>

            <n-button
              class="px-1 mx-1"
              quaternary
            >
              <n-icon>
                <eye />
              </n-icon>
              <span class="px-1 mx-1">10.00</span>
            </n-button>

            <n-button
              class="px-1 mx-1"
              quaternary
            >
              <n-icon>
                <heart />
              </n-icon>
              <span class="px-1">10.00</span>
            </n-button>

            <n-button
              class="px-1 mx-1"
              quaternary
            >
              <n-icon>
                <bookmarks />
              </n-icon>
              <span class="px-1">10.00</span>
            </n-button>
          </div>

          <n-tabs
            class="mt-2"
            type="line"
            animated
          >
            <n-tab-pane
              name="information"
              tab="Информация"
            >
              <div class="py-3">
                <n-data-table
                  v-model:checked-row-keys="checkedRowKeys"
                  :columns="columns"
                  :data="data"
                  :pagination="pagination"
                />
              </div>
            </n-tab-pane>
            <n-tab-pane
              name="comments"
              tab="Комментарии"
            >
              3
            </n-tab-pane>
          </n-tabs>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup>
import { Star, Heart, Eye, Bookmarks } from '@vicons/ionicons5'
import { computed, ref } from 'vue'
import ReleaseSider from '../components/release/ReleaseSider.vue'
import AnimePoster from '../components/release/AnimePoster.vue'

const posterImage = 'https://moe.shikimori.one/uploads/poster/animes/11757/main_alt-d6f74ec77f55e436b31e07cff06c19e7.jpeg'

const release = {
  title: 'Мастера меча онлайн!',
  altTitles: ['Sword Art Online']
}

const altTitles = computed(() => release.altTitles.join('\n'))

const data = Array.from({ length: 46 }).map((_, index) => ({
  name: `Edward King ${index}`,
  number: 32,
  date: `London, Park Lane no. ${index}`,
  key: index
}))

const checkedRowKeys = ref([4, 1])

const pagination = {
  pageSize: 6
}

const createColumns = () => {
  return [
    {
      type: 'selection',
      multiple: false,
      disabled (row) {
        return row.name === 'Edward King 3'
      }
    },
    {
      title: 'Номер серии',
      key: 'number'
    },
    {
      title: 'Название',
      key: 'name'
    },
    {
      title: 'Дата выхода',
      key: 'date'
    }
  ]
}

const columns = createColumns()
</script>
