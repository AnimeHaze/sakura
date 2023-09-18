<script setup>
import { Star, Heart, Eye, Bookmarks, SwapVerticalOutline } from '@vicons/ionicons5'
import ReleaseSider from '../../components/release/ReleaseSider.vue'
import { NIcon } from 'naive-ui'
import { computed, ref } from 'vue'

defineProps({
  release: {
    type: Object,
    required: true
  }
})

const sort = { ASC: 0, DESC: 1 }

const sortDeg = ref(0)
const sortType = ref(sort.ASC)
const seriesData = Array.from({ length: 12 })
  .map((x, index) => ({ number: ++index, id: index }))

const series = computed(() => {
  return sortType.value === sort.ASC ? [...seriesData].reverse() : seriesData
})

function swapSort () {
  sortDeg.value += 360
  sortType.value = sortType.value === sort.ASC ? sort.DESC : sort.ASC
}
</script>

<template>
  <div>
    <n-space
      size="large"
      vertical
    >
      <n-layout
        class="h-screen"
        position="absolute"
        has-sider
      >
        <n-layout-sider
          content-style="padding: 24px;"
        >
          <release-sider
            :poster-image="release.posters.medium"
            :poster-image-full="release.posters.original"
          />
        </n-layout-sider>
        <n-layout-content
          :native-scrollbar="false"
          content-style="padding: 24px;"
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

              <div class="py-1">
                <div>
                  <n-divider class="n-divider" />
                  <div class="flex">
                    <div class="flex-none">
                      <n-button
                        strong
                        secondary
                        @click="swapSort()"
                      >
                        <n-icon
                          size="24"
                          class="transition"
                          :style="{ transform: `rotate(${sortDeg}deg)` }"
                        >
                          <SwapVerticalOutline />
                        </n-icon>
                      </n-button>
                    </div>

                    <n-input
                      class="mb-2 ml-2 w-full"
                      type="text"
                      placeholder="Поиск по сериям"
                      loading
                    />
                  </div>

                  <div
                    v-for="serie in series"
                    :key="serie.id"
                    class="w-full mb-2 rounded-md p-2 episode cursor-pointer"
                  >
                    <n-space justify="space-between">
                      <div
                        class="inline-flex gap-1"
                      >
                        <n-space
                          class="ml-1 mt-1"
                          justify="start"
                          style="width: 115px;"
                        >
                          <n-tooltip
                            placement="right"
                            trigger="hover"
                          >
                            <template #trigger>
                              <n-icon
                                size="20"
                              >
                                <eye />
                              </n-icon>
                            </template>
                            Не просмотренно
                          </n-tooltip>

                          <div class="font-bold">
                            Серия {{ serie.number }}
                          </div>
                        </n-space>

                        <n-space>
                          <n-tag
                            v-for="resolution in [1080, 720, 480]"
                            :key="resolution"
                            :bordered="false"
                            :type="resolution === 1080 ? 'success' : 'default'"
                          >
                            {{ resolution }}p
                          </n-tag>
                        </n-space>
                      </div>

                      <div class="mt-2 mr-2 text-zinc-500">
                        01.01.2023
                      </div>
                    </n-space>
                  </div>
                </div>
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
.episode {
  background: rgb(102 102 102 / 18%);
}

.episode:hover {
  background: rgb(102 102 102 / 13%);
}

.transition {
  transition: transform 0.5s ease-in-out;
}

.n-divider:not(.n-divider--vertical) {
  margin-top: 8px;
  margin-bottom: 13px;
}
</style>
