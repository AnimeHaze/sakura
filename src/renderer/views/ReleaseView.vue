<template>
  <n-space
    size="large"
    vertical
  >
    <n-layout
      class="h-screen"
      has-sider
    >
      <n-layout-sider
        content-style="padding: 24px;"
      >
        <release-sider
          :poster-image="posterImage"
        />
      </n-layout-sider>
      <n-layout>
        <n-layout-content class="p-4 py-2">
          <n-space
            vertical
            class="mt-4"
          >
            <div class="break-words font-600 flex-1 text-2xl">
              {{ release.title }}
            </div>
            <div class="text-gray-500 break-words whitespace-pre-line">
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

          <n-space class="mt-3">
            <n-tooltip
              trigger="hover"
              :show-arrow="false"
              placement="bottom"
            >
              <template #trigger>
                <n-button>
                  <n-icon>
                    <star style="color: #ffa726;" />
                  </n-icon>
                  <span class="px-1">10.00</span>
                </n-button>
              </template>
              <n-rate allow-half />
            </n-tooltip>

            <n-button>
              <n-icon>
                <eye />
              </n-icon>
              <span class="px-1">10.00</span>
            </n-button>

            <n-button>
              <n-icon>
                <heart />
              </n-icon>
              <span class="px-1">10.00</span>
            </n-button>

            <n-button>
              <n-icon>
                <bookmarks />
              </n-icon>
              <span class="px-1">10.00</span>
            </n-button>
          </n-space>

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

const posterImage = 'https://moe.shikimori.one/uploads/poster/animes/11757/main_alt-d6f74ec77f55e436b31e07cff06c19e7.jpeg'

const release = {
  title: 'Мастера меча онлайн!',
  altTitles: ['Sword Art Online', '1234567']
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
