<script setup>
import { Bookmarks, Eye, Heart, Star } from '@vicons/ionicons5'
import ReleaseSiderSkeleton from './ReleaseSiderSkeleton.vue'
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
          <release-sider-skeleton />
        </n-layout-sider>
        <n-layout-content
          :native-scrollbar="false"
          class="p-4 py-2"
        >
          <n-space
            vertical
          >
            <div class="flex-1">
              <n-skeleton
                :height="32"
                :width="806"
                :sharp="false"
                size="medium"
              />
            </div>
            <div>
              <n-skeleton
                :height="21"
                :width="300"
                :sharp="false"
                size="medium"
              />
            </div>
          </n-space>

          <n-space
            size="small"
            class="mt-3"
          >
            <n-skeleton
              v-for="genre in 5"
              :key="genre"
              :height="28"
              :width="60 + (genre * 5)"
              :sharp="false"
              size="medium"
            />
          </n-space>

          <n-space class="mt-3">
            <n-button>
              <n-icon>
                <star style="color: #ffa726;" />
              </n-icon>
              <n-skeleton
                class="ml-2"
                :height="14"
                :width="35"
                :sharp="false"
                size="medium"
              />
            </n-button>

            <n-button>
              <n-icon>
                <eye />
              </n-icon>
              <n-skeleton
                class="ml-2"
                :height="14"
                :width="35"
                :sharp="false"
                size="medium"
              />
            </n-button>

            <n-button>
              <n-icon>
                <heart />
              </n-icon>
              <n-skeleton
                class="ml-2"
                :height="14"
                :width="35"
                :sharp="false"
                size="medium"
              />
            </n-button>

            <n-button>
              <n-icon>
                <bookmarks />
              </n-icon>
              <n-skeleton
                class="ml-2"
                :height="14"
                :width="35"
                :sharp="false"
                size="medium"
              />
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
              <n-skeleton
                :height="120"
                :width="800"
                :sharp="false"
                size="medium"
              />
            </n-tab-pane>
          </n-tabs>
        </n-layout-content>
      </n-layout>
    </n-space>
  </div>
</template>

<style scoped>

</style>
