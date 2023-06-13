<template>
  <div class="ml-2 mt-4 flex inline-flex">
    <div
      class="relative"
    >
      <n-skeleton
        :height="226"
        :width="160"
        :sharp="false"
        size="medium"
        src="https://nyaa.shikimori.one/uploads/poster/animes/50330/main_alt-c852c516868fd058c1284abac0d4f214.jpeg"
      />
    </div>
    <div class="ml-2 max-h-262px">
      <div>
        <n-skeleton
          text
          :height="24"
          :width="200"
          :sharp="false"
          size="medium"
        />
      </div>
      <div>
        <n-skeleton
          text
          :height="16"
          :width="150"
          :sharp="false"
        />
      </div>
      <div class="flex flex-row mt-2 overflow-ellipsis">
        <n-skeleton
          v-for="genre in 5"
          :key="genre"
          :height="28"
          :width="80"
          :sharp="false"
          class="mr-2"
        >
          {{ genre }}
        </n-skeleton>
      </div>
      <n-skeleton
        text
        class="mt-1 w-200 h-34.7"
      />
    </div>
  </div>
</template>
