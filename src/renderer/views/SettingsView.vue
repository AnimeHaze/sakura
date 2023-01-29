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
                  <n-radio value="auto">
                    Использовать тему системы
                  </n-radio>
                  <n-radio value="dark">
                    Темная
                  </n-radio>
                  <n-radio value="light">
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
                  <n-radio value="0">
                    Заменять кнопку домашней страницы
                  </n-radio>
                  <n-radio value="1">
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
const config = useConfigStore()
</script>
