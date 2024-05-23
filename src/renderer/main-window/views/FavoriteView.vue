<template>
  <div class="full-page-height">
    <n-scrollbar
      x-scrollable
      class="h-full"
      content-style="padding: 15x;"
    >
      <div
        class="flex gap-x-5 flex-row mt-2"
      >
        <NCard
          v-for="favoriteView in 10"
          :key="favoriteView"
          style="width: 400px"
          title="Смотрю"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <draggable
            :force-fallback="true"
            ghost-class="ghost"
            drag-class="drag"
            chosen-class="chosen"
            class="draggable-ul"
            animation="300"
            :list="demandList"
            group="people"
            item-key="name"
          >
            <template #item="{ element }">
              <div class="cursor-move mt-2">
                <n-tag type="info">
                  5 серий
                </n-tag><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </draggable>
        </NCard>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import Draggable from 'vuedraggable'
import { useConfigStore } from '@/store'
import { appTheme } from '@enums/index'

const config = useConfigStore()

const demandList = reactive([
  { name: 'Джудзюцу Кайсен', id: 1 },
  { name: 'Атака титанов: Последний сезон', id: 2 },
  { name: 'Истребитель демонов: Кимэцу но Яйба', id: 3 },
  { name: 'Моя геройская академия', id: 4 },
  { name: 'Ван-Пис', id: 5 },
  { name: 'Наруто: Ураганные хроники', id: 6 },
  { name: 'Драконий жемчуг: Супер', id: 7 },
  { name: 'Ре:Жизнь с нуля в альтернативном мире', id: 8 },
  { name: 'Блич', id: 9 },
  { name: 'Тетрадь Смерти', id: 10 },
  { name: 'Гинтама', id: 11 },
  { name: 'Стальной алхимик: Братство', id: 12 },
  { name: 'Гуррен-Лаганн', id: 13 },
  { name: 'Евангелион', id: 14 },
  { name: 'Fate/Stay Night', id: 15 },
  { name: 'Врата: там бьются наши военные девушки', id: 16 },
  { name: 'Штейнс;Врата', id: 17 },
  { name: 'Мастер меча онлайн', id: 18 },
  { name: 'Этот прекрасный мир, в котором мы живем!', id: 19 },
  { name: 'Моб Психо 100', id: 20 }
])

const itemBackgroundColor = computed(() => config.theme === appTheme.LIGHT ? '#d5d4d4' : '#312f2f')
</script>

<style>
.n-scrollbar-rail--horizontal > .n-scrollbar-rail__scrollbar {
  height: 10px !important;
}
</style>

<style scoped>
.draggable-ul {
  width: 100%;
  overflow: hidden;
}

.draggable-ul > .draggable-li {
  width: 100%;
  padding: 16px 10px;
  color: #333;
  border-bottom: 1px solid #efeff5;
}
/*
.sortable-drag
{
  display: block;
  background: #312f2f;
  color: #fff;
}*/

.scrollable-row {
  overflow-x: auto;
  white-space: nowrap;
}

.drag, .chosen, .ghost {
  background: v-bind(itemBackgroundColor);
}
</style>
