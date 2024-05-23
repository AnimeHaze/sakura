<script setup>
import {
  CheckmarkCircle,
  PricetagOutline,
  SettingsOutline,
  TrashOutline
} from '@vicons/ionicons5'
import { ref, h } from 'vue'
import { useDialog, NAvatar, NIcon } from 'naive-ui'
import ExtensionSettings from '@/components/extentions/ExtensionSettings.vue'
import ShikimoriIcon from '@/components/icons/ShikimoriIcon.vue'

const dialog = useDialog()

const props = defineProps({
  enabled: {
    type: Boolean,
    required: true
  }
})

const enabled = ref(props.enabled)

function openSettings () {
  dialog.create({
    icon: () => h(NAvatar, null, {
      default: () =>
        h(NIcon, {
          component: h(ShikimoriIcon, { color: '#fff' }, {})
        }, {})
    }),
    style: 'min-width: 500px',
    type: 'default',
    title: () => h('span', { style: 'margin-left: 10px; margin-top: 6px' }, { default: () => 'Расширение Shikimori' }),
    content: () => h(ExtensionSettings, {}, {}),
    positiveText: 'Сохранить',
    negativeText: 'Отмена',
    onPositiveClick: () => {

    }
  })
}
</script>

<template>
  <n-thing>
    <template #avatar>
      <n-avatar>
        <n-icon size="24">
          <shikimori-icon :color="'#fff'" />
        </n-icon>
      </n-avatar>
    </template>
    <template #header>
      <n-space>
        <div>
          Shikimori
        </div>

        <n-tag
          round
          :bordered="false"
          type="info"
        >
          v1.0.0
          <template #icon>
            <n-icon :component="PricetagOutline" />
          </template>
        </n-tag>

        <n-tag
          round
          :bordered="false"
          type="success"
        >
          Официальное
          <template #icon>
            <n-icon :component="CheckmarkCircle" />
          </template>
        </n-tag>
      </n-space>
    </template>
    <template #header-extra>
      <n-space justify="center">
        <n-switch
          v-model:value="enabled"
          class="mt-1.5"
        />

        <n-button
          strong
          secondary
          type="info"
          circle
          @click="openSettings"
        >
          <template #icon>
            <n-icon>
              <settings-outline />
            </n-icon>
          </template>
        </n-button>

        <n-button
          strong
          secondary
          type="error"
          circle
          @click="() => {}"
        >
          <template #icon>
            <n-icon>
              <trash-outline />
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </template>
    <template #description>
      Синхронизация прогресса с шикимори
    </template>
  </n-thing>
</template>

<style scoped>

</style>
