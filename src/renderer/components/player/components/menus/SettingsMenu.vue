<script setup>
import CaptionSubmenu from '../menus/CaptionSubmenu.vue';
import Menu from '../menus/Menu.vue';

/** @type {{ placement: import('vidstack').MenuPlacement, tooltipPlacement: import('vidstack').TooltipPlacement }} */
const { placement, tooltipPlacement } = defineProps({
  placement: String,
  tooltipPlacement: String
})
</script>

<template>
  <Menu :placement="placement" :tooltip-placement="tooltipPlacement">
    <template #button>
      <media-icon
        class="h-8 w-8 transform transition-transform duration-200 ease-out group-data-[open]:rotate-90"
        type="settings"
      />
    </template>
    <template #content>
      <CaptionSubmenu />
    </template>
    <template #tooltip-content>
      <span>Настройки</span>
    </template>
  </Menu>
</template>
