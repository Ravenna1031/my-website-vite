<script setup lang="ts">
const props = defineProps<{
  status: string
}>()

const emit = defineEmits([
  'hover',
  'unhover',
  'start',
  'cancel',
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

</script>

<template>
  <div class="clock-button">
    <h1 v-show="props.status === 'default' || props.status === 'ready'" @mouseover="hover" @mouseout="unhover" @click="start">
      START
    </h1>
    <h1 v-show="props.status === 'start'" @click="cancel">
      CANCEl
    </h1>
    <h1 v-show="props.status === 'finish'">
      DONE
    </h1>
    <h1 v-show="props.status === 'finish'">
      TAKE A BREAK
    </h1>
  </div>
</template>

<style lang="less">
.clock-button {
  margin-top: 15%;
  h1 {
    font-weight: bold;
    @media (min-width: 576px) {
      font-size: 5vw;
    }
    @media (min-width: 1400px) {
      font-size: 3vw;
    }
  }
}
</style>
