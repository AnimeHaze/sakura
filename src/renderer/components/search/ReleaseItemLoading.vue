<template>
  <div class="ml-2 mt-4 flex inline-flex">
    <div
      class="w-160px h-226px relative"
    >
      <n-skeleton
        class="w-160px h-226px"
        src="https://nyaa.shikimori.one/uploads/poster/animes/50330/main_alt-c852c516868fd058c1284abac0d4f214.jpeg"
      />
    </div>
    <div class="ml-2 max-h-262px">
      <div>
        <n-skeleton
          text
          class="text-xl w-70"
        />
      </div>
      <div>
        <n-skeleton
          text
          class="text-gray-500 font-300 text-l w-50"
        />
      </div>
      <div class="flex flex-row mt-2 overflow-ellipsis">
        <n-skeleton
          v-for="genre in 5"
          :key="genre"
          :bordered="false"
          type="success"
          class="mr-2 rounded h-7"
        >
          {{ genre }}
        </n-skeleton>
      </div>
      <n-skeleton
        text
        class="mt-2 w-200 h-34.7"
      />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>

</style>
