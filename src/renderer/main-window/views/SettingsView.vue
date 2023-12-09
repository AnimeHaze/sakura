<template>
  <div class="p-3">
    <div class="card content-box">
      <n-card
        :bordered="false"
        title="Общее"
      >
        <n-form
          size="medium"
          label-placement="top"
        >
          <n-grid
            :span="24"
            :x-gap="24"
          >
            <n-form-item-gi
              :span="12"
              label="Тема"
            >
              <n-radio-group
                v-model:value="config.themeColor"
              >
                <n-space>
                  <n-radio :value="appTheme.AUTO">
                    Использовать тему системы
                  </n-radio>
                  <n-radio :value="appTheme.DARK">
                    Темная
                  </n-radio>
                  <n-radio :value="appTheme.LIGHT">
                    Светлая
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="Навигация назад"
              path="radioGroupValue"
            >
              <n-radio-group
                v-model:value="config.backButtonType"
              >
                <n-space>
                  <n-radio :value="backButton.REPLACE_CATALOG">
                    Заменять кнопку домашней страницы
                  </n-radio>
                  <n-radio :value="backButton.EXTRA">
                    Отдельная кнопка
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-card>

      <n-card
        :bordered="false"
        title="Сеть"
        class="mt-3"
      >
        <n-form
          size="medium"
          label-placement="top"
        >
          <n-grid
            :span="24"
            :x-gap="24"
          >
            <n-form-item-gi
              :span="12"
              label="VPN"
            >
              <n-space vertical>
                <n-checkbox
                  v-model:checked="useVPN"
                  label="Использовать VPN"
                />
              </n-space>
            </n-form-item-gi>

            <n-form-item-gi
              :span="12"
              label="Регион VPN"
            >
              <n-select
                :options="vpnRegion"
              />
            </n-form-item-gi>

            <n-form-item-gi
              :span="12"
              label="Конечная точка API"
            >
              <n-select :options="apiEndpoints" />
            </n-form-item-gi>

            <n-form-item-gi
              :span="12"
              label="Конечная точка статических ресурсов"
            >
              <n-select :options="apiStaticEndpoints" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-card>

      <n-card
        :bordered="false"
        title="Прочее"
        class="mt-3"
      >
        <n-space>
          <n-button
          >
            Очистить кеш приложения
          </n-button>

          <n-button
          >
            Установить настройки по умолчанию
          </n-button>
        </n-space>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { useConfigStore } from '@/store'
import { appTheme, backButton } from '@enums/index'
import { ref } from 'vue'
const config = useConfigStore()

const useVPN = ref(true)
const vpnRegion = [
  {
    label: 'Europe',
    value: 'EU'
  },
  {
    label: 'America',
    value: 'AM'
  }
]

const apiEndpoints = [
  {
    label: 'https://anilibria.tv/',
    value: 'https://anilibria.tv/'
  },
  {
    label: 'https://wwnd.space/',
    value: 'https://wwnd.space/'
  },
  {
    label: 'https://anilibriaqt.anilib.top/',
    value: 'https://anilibriaqt.anilib.top/'
  },
  {
    label: 'https://anilibrix.anilib.top/',
    value: 'https://anilibrix.anilib.top/'
  }
]

const apiStaticEndpoints = [
  {
    label: 'https://static.anilibria.tv/',
    value: 'https://static.anilibria.tv/'
  },
  {
    label: 'https://static.wwnd.space/',
    value: 'https://static.wwnd.space/'
  },
  {
    label: 'https://anilibriaqt.anilib.top/',
    value: 'https://anilibriaqt.anilib.top/'
  },
  {
    label: 'https://anilibrix.anilib.top/',
    value: 'https://anilibrix.anilib.top/'
  }
]
</script>
