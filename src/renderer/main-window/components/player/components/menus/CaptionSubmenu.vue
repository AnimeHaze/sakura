<script setup>
import Submenu from './Submenu.vue'
</script>

<template>
  <Submenu label="Субтитры">
    <template #icon>
      <media-icon
        class="h-5 w-5"
        type="closed-captions"
      />
    </template>
    <template #content>
      <media-captions-radio-group class="flex flex-col">
        <template>
          <media-radio
            class="group relative flex cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none ring-sky-400 data-[hocus]:bg-white/10 data-[focus]:ring-[3px]"
          >
            <media-icon
              type="radio-button"
              class="h-4 w-4 text-white group-data-[checked]:hidden"
            />

            <media-icon
              type="radio-button-selected"
              class="hidden h-4 w-4 group-data-[checked]:block"
            />

            <span
              class="ml-2"
              data-part="label"
            />
          </media-radio>
        </template>
      </media-captions-radio-group>
    </template>
  </Submenu>
</template>
