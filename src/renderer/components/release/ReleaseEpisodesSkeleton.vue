<script setup>
</script>

<template>
  <div
    class="flex"
    style="margin-bottom: 16px"
  >
    <div class="flex-none">
      <n-skeleton
        :height="34"
        :width="52"
        :sharp="false"
        size="medium"
      />
    </div>

    <n-skeleton
      style="margin-left: 8px"
      :height="34"
      width="100%"
      :sharp="false"
      size="medium"
    />
  </div>

  <n-divider class="n-divider" />

  <n-skeleton
    v-for="key in 30"
    :key="key"
    class="mb-2 rounded-md episode cursor-pointer"
    :height="50"
    width="100%"
    :sharp="false"
    size="medium"
  />
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
