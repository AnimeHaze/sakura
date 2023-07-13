<template>
  <n-config-provider :theme="theme">
    <n-dialog-provider>
      <n-message-provider>
        <div
          @contextmenu="handleContextMenu"
          @click="showPopover = false"
        >
          <default-layout />
        </div>
        <!--        <search-modal />-->
        <n-popover
          :show-arrow="false"
          placement="bottom-start"
          :theme="theme"
          :show="showPopover"
          :x="x"
          :y="y"
          trigger="manual"
        >
          <n-button
            size="small"
            @click="inspectElement()"
          >
            Исследовать
          </n-button>
        </n-popover>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { darkTheme } from 'naive-ui'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useConfigStore } from '../store'
import { appTheme } from '../../enums'

const config = useConfigStore()

const theme = computed(() => config.theme === appTheme.DARK ? darkTheme : null)

function themeChange (event) {
  config.systemThemeColor = event.matches ? appTheme.DARK : appTheme.LIGHT
}

const x = ref(0)
const y = ref(0)
const showPopover = ref(false)

function inspectElement () {
  showPopover.value = false
  window.api.inspectElement(x.value, y.value)
}

function handleContextMenu (event) {
  if (showPopover.value) {
    showPopover.value = true
    x.value = event.clientX
    y.value = event.clientY
  } else {
    showPopover.value = true
    x.value = event.clientX
    y.value = event.clientY
  }
}

const mediaDark = window.matchMedia('(prefers-color-scheme: dark)')
themeChange(mediaDark)

mediaDark.addEventListener('change', themeChange)

onBeforeUnmount(() => {
  mediaDark.removeEventListener('change', themeChange)
})
</script>
