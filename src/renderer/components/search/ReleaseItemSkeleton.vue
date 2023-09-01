<template>
  <div class="flex cursor-pointer">
    <div
      class="relative"
    >
      <n-skeleton
        :height="207"
        :width="138"
        :sharp="false"
        size="medium"
      />
    </div>
    <div class="ml-2 mb-3 max-h-262px w-full">
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
        :sharp="false"
        class="mt-1 h-29 w-full"
      />
    </div>
  </div>
</template>
<script setup>
</script>
