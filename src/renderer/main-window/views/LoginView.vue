<template>
  <div class="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
    <div class="relative w-full py-5 ml-auto mr-auto login-form sm:w-full">
      <n-button
        class="w-full"
        strong
        secondary
      >
        <template #icon>
          <n-icon>
            <shikimori-icon :color="theme.textColorBase" />
          </n-icon>
        </template>
        SHIKIMORI
      </n-button>
      <n-divider title-placement="center">
        или
      </n-divider>
      <n-form
        ref="formRef"
        size="large"
        :model="formData"
      >
        <n-form-item
          path="login"
          :rule="{
            required: true,
            message: 'Логин не может быть пустым',
            trigger: ['input', 'blur']
          }"
        >
          <n-input
            v-model:value="formData.login"
            name="password"
            placeholder="Логин или Email"
          />
        </n-form-item>
        <n-form-item
          class="block"
          path="password"
          :rule="{
            required: true,
            message: 'Пароль не может быть пустым',
            trigger: ['input', 'blur']
          }"
        >
          <n-input
            v-model:value="formData.password"
            type="password"
            placeholder="Пароль"
            show-password-on="click"
          />
        </n-form-item>
        <n-form-item class="block">
          <n-grid
            :cols="2"
            :x-gap="24"
          >
            <n-gi>
              <n-checkbox>Запомнить меня</n-checkbox>
            </n-gi>
            <n-gi class="flex flex-row justify-end">
              <n-button
                text
                class="block text-right"
              >
                Регистрация
              </n-button>
            </n-gi>
          </n-grid>
        </n-form-item>
        <n-form-item class="block">
          <n-button
            type="primary"
            class="w-full"
            attr-type="submit"
            :disabled="loginLoading"
            :loading="loginLoading"
            @click="handleLogin"
          >
            Войти
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeVars, useMessage } from 'naive-ui'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
import ShikimoriIcon from '@/components/icons/ShikimoriIcon.vue'

const theme = useThemeVars()
const user = useUserStore()
const router = useRouter()
const message = useMessage()

const loginLoading = ref(false)

const formRef = ref(null)
const formData = ref({
  login: '',
  password: ''
})

let errorMessage = null
let mockNotFound = true

async function handleLogin () {
  if (errorMessage) {
    errorMessage.destroy()
    errorMessage = null
  }

  const valid = await formRef.value?.validate().then(_ => true).catch(_ => false)

  if (valid) {
    loginLoading.value = true

    if (mockNotFound) {
      errorMessage = message.error('Аккаунт не найден', { duration: 3000 })
      mockNotFound = false
      loginLoading.value = false
      return
    }

    setTimeout(async () => {
      await user.login(
        formData.value.login,
        formData.value.password
      )

      loginLoading.value = false
      await router.push({ name: 'Home' })
    }, 2500)
  }
}
</script>

<style scoped>
@screen md {
  .login-form {
    width: 340px;
  }
}
</style>
