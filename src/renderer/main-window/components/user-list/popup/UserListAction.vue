<script setup>
import { CheckmarkOutline } from '@vicons/ionicons5'
import { useUserStore } from '@/store'
import { reactive, ref } from 'vue'

const user = useUserStore()
const formData = reactive({ title: '' })
const formRef = ref(null)
const loading = ref(false)

async function createList () {
  loading.value = true
  await user.createUserList(formData.title)
  formData.title = ''
  loading.value = false
}
</script>

<template>
  <n-form
    ref="formRef"
    size="large"
    :show-feedback="false"
    :model="formData"
  >
    <n-form-item
      class="block"
      path="title"
      :rule="{
        required: true,
        message: 'Введите имя папки',
        trigger: ['input', 'blur']
      }"
    >
      <div class="flex">
        <div class="mr-2 w-full">
          <n-input
            v-model:value="formData.title"
            size="small"
            :loading="loading"
            placeholder="Имя папки"
            @keydown.enter="createList"
          />
        </div>

        <div>
          <n-button
            size="small"
            :loading="loading"
            @click="createList"
          >
            <n-icon size="24">
              <checkmark-outline />
            </n-icon>
          </n-button>
        </div>
      </div>
    </n-form-item>
  </n-form>
</template>

<style scoped>

</style>
