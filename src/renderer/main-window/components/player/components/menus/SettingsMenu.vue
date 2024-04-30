<script setup>
import CaptionSubmenu from '../menus/CaptionSubmenu.vue'
import Menu from '../menus/Menu.vue'
import QualitySubmenu from '@/components/player/components/menus/QualitySubmenu.vue'
import { defineCustomElement, MediaSpeedRadioGroupElement, MediaRadioElement, MediaMenuItemsElement, MediaQualityRadioGroupElement } from "vidstack/elements"
import Submenu from '@/components/player/components/menus/Submenu.vue'

/** @type {{ placement: import('vidstack').MenuPlacement, tooltipPlacement: import('vidstack').TooltipPlacement }} */
const { placement, tooltipPlacement } = defineProps({
  placement: String,
  tooltipPlacement: String
})

defineCustomElement(MediaSpeedRadioGroupElement);
defineCustomElement(MediaRadioElement)
defineCustomElement(MediaMenuItemsElement)
</script>

<template>
  <Menu
    :placement="placement"
    :tooltip-placement="tooltipPlacement"
  >
    <template #button>
      <media-icon
        class="h-8 w-8 transform transition-transform duration-200 ease-out group-data-[open]:rotate-90"
        type="settings"
      />
    </template>
    <template #content>
      <CaptionSubmenu />
      <QualitySubmenu />



      <submenu label="Скорость">
        <template #icon>
          <media-icon
            type="odometer"
            class="h-5 w-5 text-white group-data-[checked]:hidden"
          />
        </template>

        <template #content>
          <media-speed-radio-group normal-label="Обычная">
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
          </media-speed-radio-group>
        </template>
      </submenu>
    </template>
    <template #tooltip-content>
      <span>Настройки</span>
    </template>
  </Menu>
</template>
