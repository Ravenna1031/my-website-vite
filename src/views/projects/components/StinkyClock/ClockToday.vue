<script setup lang="ts">
const props = defineProps<{
  status: string
  timerToday: string
}>()
</script>

<template>
  <div v-show="props.status === 'default' || props.status === 'ready'" class="clock-today">
    <h1>TODAY: {{ props.timerToday }}</h1>
  </div>
</template>

<style>
.clock-today {
  margin-top: 10%;
}
</style>
