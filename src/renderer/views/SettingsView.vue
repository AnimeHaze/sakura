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
        title="Прочее"
        class="mt-3"
      >
        <n-space>
          <n-button
            type="primary"
          >
            Очистить кеш приложения
          </n-button>

          <n-button
            type="primary"
          >
            Установить настройки по умолчанию
          </n-button>
        </n-space>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { useConfigStore } from '../store'
import { appTheme, backButton } from '../../enums'
const config = useConfigStore()
</script>
