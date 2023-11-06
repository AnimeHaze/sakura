<script setup>
import VideoPlayer from '../components/player/VideoPlayer.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const showEpisodesDrawer = ref(false)
const release = ref({})
const router = useRouter()
const route = useRoute()

const poster = computed(() => release.value.posters?.medium || release.value.posters?.original)

onMounted(async () => {
  const { result } = await window.api.getRelease({ id: route.params.id })
  release.value = result
})
</script>

<template>
  <div>
    <n-drawer
      v-model:show="showEpisodesDrawer"
      resizable
      :min-width="300"
      placement="left"
    >
      <n-drawer-content
        body-content-style="padding: 0px"
        title="Эпизоды"
      >
        <n-list
          hoverable
          clickable
        >
          <n-list-item>
            <n-thing
              title="Better Late Than Never"
              content-style="margin-top: 10px;"
            >
              Lorem ipsum dolor sit amet,<br>
            </n-thing>
          </n-list-item>
          <n-list-item>
            <n-thing
              title="Lorem Ipsum"
              content-style="margin-top: 10px;"
            >
              Lorem ipsum dolor sit amet
            </n-thing>
          </n-list-item>
        </n-list>
      </n-drawer-content>
    </n-drawer>
    <div>
      <video-player
        :poster="poster"
        @open-episodes="showEpisodesDrawer = true"
        @open-release="router.push({ name: 'Release', params: { id: route.params.id } })"
      />
    </div>
  </div>
</template>

<style scoped>
.episodes-button {
  z-index: 1;
  padding: 6px;
  height: 36px;
  width: 36px;
  left: 10px;
  top: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
