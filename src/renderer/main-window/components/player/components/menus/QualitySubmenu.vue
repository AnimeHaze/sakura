<script setup>
import Submenu from './Submenu.vue'

import { defineCustomElement, MediaRadioGroupElement,
  MediaQualityRadioGroupElement, MediaRadioElement, MediaMenuItemsElement } from 'vidstack/elements'

defineCustomElement(MediaRadioGroupElement)
defineCustomElement(MediaRadioElement)
defineCustomElement(MediaMenuItemsElement)
defineCustomElement(MediaQualityRadioGroupElement)

const qualities = [720, 1080, 1440, 2160].reverse()
</script>

<template>
  <Submenu label="Качество">
    <template #icon>
      <media-icon
        class="h-5 w-5"
        type="settings-menu"
      />
    </template>

    <template #content>
      <media-quality-radio-group>
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

            <span class="ml-2" data-part="label"></span>
          </media-radio>
        </template>
      </media-quality-radio-group>
<!--      <media-radio-group-->
<!--        :value="qualities[0]"-->
<!--        class="flex w-full flex-col"-->
<!--        auto-label="Auto"-->
<!--      >-->
<!--        <media-radio-->
<!--          v-for="quality in qualities"-->
<!--          :key="quality"-->
<!--          :value="quality"-->
<!--          class="group relative flex cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none ring-sky-400 data-[hocus]:bg-white/10 data-[focus]:ring-[3px]"-->
<!--        >-->
<!--          <media-icon-->
<!--            type="radio-button"-->
<!--            class="h-4 w-4 text-white group-data-[checked]:hidden"-->
<!--          />-->

<!--          <media-icon-->
<!--            type="radio-button-selected"-->
<!--            class="hidden h-4 w-4 group-data-[checked]:block"-->
<!--          />-->

<!--          <span-->
<!--            class="ml-2"-->
<!--            data-part="label"-->
<!--          >{{ quality }}p</span>-->
<!--        </media-radio>-->
<!--      </media-radio-group>-->
    </template>
  </Submenu>
</template>
