<script setup>
import { Star, Heart, Eye, Bookmarks } from '@vicons/ionicons5'
import ReleaseSider from '../../components/release/ReleaseSider.vue'
import { NIcon } from 'naive-ui'
import ReleaseEpisodes from './ReleaseEpisodes.vue'

defineProps({
  release: {
    type: Object,
    required: true
  }
})
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

                  <release-episodes :episodes="release.episodes" />
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
.n-divider:not(.n-divider--vertical) {
  margin-top: 8px;
  margin-bottom: 13px;
}
</style>
