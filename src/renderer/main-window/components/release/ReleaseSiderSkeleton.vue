<template>
  <div>
    <n-skeleton
      class="poster mb-3"
      :height="321"
      :width="224"
      :sharp="false"
      size="medium"
    />

    <n-skeleton
      class="w-full mb-3"
      :height="34"
      :width="224"
      :sharp="false"
      size="medium"
    />

    <n-skeleton
      class="w-full mb-3"
      :height="34"
      :width="224"
      :sharp="false"
      size="medium"
    />
  </div>
</template>

<script setup>
</script>

<style scoped>
.poster {
  max-width: 240px;
  justify-content: center;
  opacity: 0.8;
  object-fit: cover;
  border-radius: 4px;
  transition: opacity 125ms ease-in-out;
}

.poster:hover {
  opacity: 1;
}
</style>
