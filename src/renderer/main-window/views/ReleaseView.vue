<template>
  <div>
    <release-info-skeleton v-if="loading" />

    <release-info
      v-if="!loading"
      :release="releaseData"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import ReleaseInfoSkeleton from '@/components/release/ReleaseInfoSkeleton.vue'
import ReleaseInfo from '@/components/release/ReleaseInfo.vue'

const releaseData = ref({})
const route = useRoute()
const loading = ref(true)

watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId && newId !== oldId) await loadRelease(newId)
  }
)

onMounted(async () => loadRelease(route.params.id))

async function loadRelease (id) {
  loading.value = true
  const { result } = await window.api.getRelease({ id })
  releaseData.value = result
  loading.value = false
}
</script>
