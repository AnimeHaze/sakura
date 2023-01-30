<template class="max-h-screen flex flex-col">
  <div
    class="flex flex-row mx-2 my-2"
  >
    <n-input
      v-model:value="query"
      size="medium"
      class=""
      type="text"
      placeholder="Введите запрос"
    />
    <n-icon
      size="20"
      class="mx-2 my-2 cursor-pointer"
      @click="emulateLoading"
    >
      <SearchOutline />
    </n-icon>
    <n-icon
      size="20"
      class="mx-2 my-2 cursor-pointer"
    >
      <FilterOutline />
    </n-icon>
  </div>
  <div class="flex-grow overflow-y-auto">
    <div
      v-if="loading"
      class="flex flex-col"
    >
      <ReleaseItemLoading
        v-for="title in 5"
        :key="title"
      />
    </div>
    <div
      v-else
    >
      <ReleaseItem
        v-for="title in titles"
        :key="title.main_name"
        :title-data="title"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SearchOutline, FilterOutline } from '@vicons/ionicons5'
import ReleaseItem from '../components/search/ReleaseItem.vue'
import ReleaseItemLoading from '../components/search/ReleaseItemLoading.vue'
const query = ref()
const titles = ref([])
const loading = ref()
emulateLoading()
Array.from(Array(9)).forEach(() => {
  titles.value.push({ main_name: 'Твоя апрельская ложь', image: 'https://shikimori.one/system/animes/preview/23273.jpg?1674366028', additional_name: 'Shigatsu wa Kimi no Uso', genres: ['Драма', 'Музыка', 'Романтика', 'Сенен'], score: '8.68', description: 'Косэй Арима - виртуозный пианист, как говорили его наставники. С малого возраста он играл сложнейшие композиции благодаря своему чутью, он делал все точно, как прописано в нотах, даже механически. Выиграв немало конкурсов, знатоки все еще говорили, что это не талант, а дисциплина и упорство, а мальчик просто быстро справился с нагрузками. Как бы то ни было, он признавался одним из лучших пианистов в своей категории.' })
})

function emulateLoading () {
  loading.value = true
  setTimeout(() => (loading.value = false), Math.floor(Math.random() * (2000 - 500) + 500))
}

</script>

<style scoped>

</style>
