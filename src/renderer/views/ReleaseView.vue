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
        <n-image
          class="poster mb-3"
          round
          lazy
          src="https://storage.manga.ovh/book/only-fools-rely-on-cat-eared-slaves/poster/9fc1404d-3847-4dc7-accd-57aa660b6534.jpeg?width=400&type=webp"
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
      </n-layout-sider>
      <n-layout>
        <n-layout-content class="p-4 py-2">
          <n-space vertical>
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
              Tag A
            </n-tag>
            <n-tag
              :bordered="false"
              size="medium"
            >
              Tag B
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
import { CheckmarkOutline, Star, Heart, Eye, Bookmarks } from '@vicons/ionicons5'
import { computed, ref } from 'vue'

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

const columns = createColumns()
</script>

<style>
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
