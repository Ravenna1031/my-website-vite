<script setup lang="ts">
const props = defineProps<{
  status: string
  timerMinute: number
}>()

const emit = defineEmits([
  'hover',
  'unhover',
  'start',
  'cancel',
  'done',
  'takeBreak',
  'breakStart',
])

function hover() {
  emit('hover')
}

function unhover() {
  emit('unhover')
}

function start() {
  emit('start')
}

function cancel() {
  emit('cancel')
}

function done() {
  emit('done')
}

function takeBreak() {
  emit('takeBreak')
}

function breakStart() {
  emit('breakStart')
}
</script>

<template>
  <div class="clock-button">
    <h1 v-show="props.status === 'default' || props.status === 'ready'" @mouseover="hover" @mouseout="unhover" @click="start">
      START
    </h1>
    <h1 v-show="props.status === 'start' || props.status === 'break'" @click="cancel">
      CANCEl
    </h1>
    <h1 v-show="props.status === 'finish' || props.status === 'reset'" @click="done">
      DONE
    </h1>
    <h1 v-show="props.status === 'finish'" class="mt-4" @click="takeBreak">
      TAKE A BREAK
    </h1>
    <h1 v-show="props.status === 'break-ready'" @click="breakStart">
      START
    </h1>
    <h2 v-show="props.status === 'reset'" @click="start">
      FOCUS {{ timerMinute }} MINUTES
    </h2>
  </div>
</template>

<style lang="less">
.clock-button {
  // margin-top: 15%;
  h1, h2 {
    font-weight: bold;
    margin-top: 15%;
    @media (min-width: 576px) {
      font-size: 5vw;
    }
    @media (min-width: 1400px) {
      font-size: 3vw;
    }
  }
}
</style>
