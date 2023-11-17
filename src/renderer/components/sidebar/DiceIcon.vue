<template>
  <component :is="dice" />
</template>

<script setup>
import { computed, h, ref } from 'vue'

import {
  mdiDice1Outline,
  mdiDice2Outline,
  mdiDice3Outline,
  mdiDice4Outline,
  mdiDice5Outline,
  mdiDice6Outline
} from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'
import { DiceOutline } from '@vicons/ionicons5'
import { useConfigStore } from '../../store'
const dices = [mdiDice1Outline, mdiDice2Outline, mdiDice3Outline, mdiDice4Outline, mdiDice5Outline, mdiDice6Outline]
const diceNumber = ref(1)

const config = useConfigStore()

setInterval(() => {
  diceNumber.value++
  if (diceNumber.value === dices.length) diceNumber.value = 0
}, 200)

const dice = computed(() => config.sidebarDiceLoading ? h(SvgIcon, { path: dices[diceNumber.value], type: 'mdi' }) : h(DiceOutline))
</script>
