<script setup>
import { computed } from 'vue'
import { Star, Heart, Eye, Bookmarks } from '@vicons/ionicons5'
import ReleaseSider from '../../components/release/ReleaseSider.vue'
import { NIcon } from 'naive-ui'
import ReleaseEpisodes from './ReleaseEpisodes.vue'
import Characters from './Characters.vue'
import Franchises from './franchises.vue'

const props = defineProps({
  release: {
    type: Object,
    required: true
  }
})

const teamTitles = {
  voice: 'Озвучка',
  translator: 'Перевод',
  editing: 'Редактура',
  decor: 'Оформление',
  timing: 'Тайминг'
}

const team = computed(() => {
  return Object.fromEntries(
    Object.entries(props.release.team)
      .filter(([_, value]) => !!value.length)
  )
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
          content-style="padding: 0 24px;"
        >
          <release-sider
            class="mt-2"
            :poster-image="release.posters.medium"
            :poster-image-full="release.posters.original"
          />
        </n-layout-sider>
        <n-layout-content
          :native-scrollbar="false"
          content-style="padding: 0 24px;"
        >
          <div class="mt-2">
            <div class="media-cover" />
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

            <div v-if="Object.keys(team).length">
              <n-divider class="n-divider" />

              <n-space
                v-for="(value, key) in team"
                :key="key"
                size="small"
                class="mt-3"
              >
                <div class="mt-1">
                  <strong>{{ teamTitles[key] }}: </strong>
                </div>

                <n-tag
                  v-for="label in value"
                  :key="label"
                  :bordered="false"
                  size="medium"
                >
                  {{ label }}
                </n-tag>
              </n-space>
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
                <div v-if="release.description">
                  {{ release.description }}

                  <n-divider
                    class="n-divider"
                  />
                </div>

                <div>
                  <characters />

                  <n-divider
                    class="n-divider"
                  />
                </div>

                <div v-if="release.franchises.length">
                  <franchises :franchises="release.franchises" />

                  <n-divider
                    v-if="release.franchises"
                    class="n-divider"
                  />
                </div>

                <div class="py-1">
                  <div>
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
          </div>
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

.media-cover {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.2;
  right: 0;
  height: 350px;
  background: url(https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg) no-repeat 50%;
}

.media-cover:after {
  display: block;
  position: absolute;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0, #000 100%);
  content: '';
  top:0;
  right:0;
  bottom:0;
  left:0;
}
</style>
