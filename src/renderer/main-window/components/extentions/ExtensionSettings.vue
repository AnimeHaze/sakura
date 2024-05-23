<script setup>
import {
  PersonOutline,
  FilmOutline,
  EarthOutline,
  BookmarkOutline,
  CloudOutline,
  DocumentOutline
} from '@vicons/ionicons5'
import ExtensionPermission from '@/components/extentions/ExtensionPermission.vue'
</script>

<template>
  <n-tabs
    type="line"
    animated
  >
    <n-tab-pane
      name="settings"
      tab="Настройки"
    />

    <n-tab-pane
      name="permissions"
      tab="Права доступа"
    >
      <extension-permission
        :disabled="true"
        :active="true"
        :icon-background="'#2980b9'"
        :icon="PersonOutline"
        title="Личная информация"
        description="Ваш никнейм, идентификатор, статистика профиля, список избранного"
      />

      <n-divider />

      <extension-permission
        :icon-background="'#f1c40f'"
        class="mt-2"
        :icon="BookmarkOutline"
        title="Избранное"
        description="Добавление и удаление избранного"
      />

      <n-divider />

      <extension-permission
        :icon-background="'#8e44ad'"
        class="mt-2"
        :icon="FilmOutline"
        title="Воспроизведение"
        description="Изменение громкости, прогресса, переключение эпизодов, настроек качества, включение / выключение воспросведения, получение информации о воспроизводимом контенте"
      />

      <n-divider />

      <extension-permission
        :icon-background="'#2c3e50'"
        class="mt-2"
        :icon="CloudOutline"
        title="Torrent"
        description="Добавление торрентов, управление воспроизведением торрентов"
      />

      <n-divider />

      <extension-permission
        :icon-background="'#16a085'"
        class="mt-2"
        :icon="EarthOutline"
        title="Прокси"
        description="Добавление прокси, переключение прокси"
      />

      <n-divider />

      <extension-permission
        :icon-background="'#95a5a6'"
        class="mt-2"
        :icon="DocumentOutline"
        title="Файлы"
        description="Работа с файламию Хранение, создание, удаление"
      />

      <n-divider />
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped>
.n-divider:not(.n-divider--vertical) {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
