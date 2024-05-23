<script setup>
defineProps({
  icon: {
    type: Object,
    required: true
  },
  iconBackground: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <n-thing>
    <template #avatar>
      <n-avatar :color="iconBackground">
        <n-icon>
          <component :is="icon" />
        </n-icon>
      </n-avatar>
    </template>

    <template #header>
      {{ title }}
    </template>

    <template #header-extra>
      <n-space justify="center">
        <n-switch
          :value="active"
          :disabled="disabled"
          class="mt-1.5"
        />
      </n-space>
    </template>
    <template #description>
      {{ description }}
    </template>
  </n-thing>
</template>

<style scoped>

</style>
