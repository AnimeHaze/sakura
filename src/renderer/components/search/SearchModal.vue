<template>
  <n-modal
    :show="true"
    :segmented="{ footer: 'soft' }"
    :closable="false"
    preset="card"
    footer-style="padding: 0; margin: 0"
    class="fixed left-0 right-0 w-630px top-50px"
  >
    <n-input-group>
      <n-input
        ref="inputRef"
        clearable
        placeholder="Введите что-то...."
      >
        <template #prefix>
          <n-icon>
            <search-outline />
          </n-icon>
        </template>
      </n-input>
    </n-input-group>

    <div class="mt-20px">
      <n-empty
        description="Ничего нету..."
      />
      1234567
    </div>
    <template #footer>
      <ul class="DocSearch-Commands">
        <li>
          <span class="mdi mdi-keyboard-return" />
          <span class="DocSearch-Label">to select</span>
        </li>
        <li>
          <span class="DocSearch-Label">to navigate</span>
        </li>
        <li>
          <span class="mdi mdi-keyboard-esc" />
          <span class="DocSearch-Label">to close</span>
        </li>
      </ul>

      <span class="mdi mdi-arrow-down" />
      <span class="mdi mdi-arrow-up" />
    </template>
  </n-modal>
</template>

<script setup>
import { SearchOutline } from '@vicons/ionicons5'
</script>
