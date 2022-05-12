<script setup lang="ts">
import type { ITheme } from '../../../../constant'

const props = defineProps<{
  status: string
  theme: ITheme
}>()

</script>

<template>
  <div class="clock-icon">
    <img v-show="props.status === 'default'" :src="theme.iconDefault">
    <img v-show="props.status === 'ready'" :src="theme.iconStart">
    <img v-show="props.status === 'start'" class="rotate" :src="theme.iconStart">
    <img v-show="props.status === 'finish'" :src="theme.iconFinish">
  </div>
</template>

<style>
.clock-icon {
  margin-top: 5%;
}

.rotate {
  animation: rotation 5s linear infinite;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}
</style>
