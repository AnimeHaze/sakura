<script setup>
import { Star, Heart, Eye, Bookmarks } from '@vicons/ionicons5'
import { ref } from 'vue'
import ReleaseSider from '../../components/release/ReleaseSider.vue'

defineProps({
  release: {
    type: Object,
    required: true
  }
})

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

<template>
  <div>
    <n-space
      size="large"
      vertical
    >
      <n-layout
        class="p-6 h-screen"
        has-sider
      >
        <n-layout-sider
          :native-scrollbar="false"
          content-style="padding: 24px;"
        >
          <release-sider
            :poster-image="release.posters.medium"
            :poster-image-full="release.posters.original"
          />
        </n-layout-sider>
        <n-layout-content
          :native-scrollbar="false"
          class="p-4 py-2"
        >
          <n-space
            vertical
          >
            <div class="break-words font-600 flex-1 text-2xl">
              {{ release.names.ru }}
            </div>
            <div
              v-if="release.names.en"
              class="text-gray-500 break-words whitespace-pre-line"
            >
              {{ release.names.en }}
            </div>
          </n-space>

          <n-space
            size="small"
            class="mt-3"
          >
            <n-tag
              v-for="{ label, id } in release.genres"
              :key="id"
              :bordered="false"
              size="medium"
            >
              {{ label }}
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
              {{ release.description }}

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
    </n-space>
  </div>
</template>

<style scoped>

</style>
