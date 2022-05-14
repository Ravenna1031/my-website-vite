<script setup lang="ts">

const props = defineProps<{
  status: string
  timerValue: string
}>()

const emit = defineEmits([
  'timer-add',
  'timer-minus',
])

function timerAdd() {
  emit('timer-add')
}

function timerMinus() {
  emit('timer-minus')
}

</script>

<template>
  <div class="clock-counter row m-0">
    <button id="button-add" :disabled="props.status === 'start' || props.status === 'break'" type="button" class="col-2 btn btn-light" @click="timerMinus">
      <span v-show="props.status === 'default' || props.status === 'ready' || props.status === 'break-ready'">◀</span>
    </button>
    <h1 class="col-8 mb-0">
      {{ props.timerValue }}
    </h1>
    <button id="button-minus" :disabled="props.status === 'start' || props.status === 'break'" type="button" class="col-2 btn btn-light" @click="timerAdd">
      <span v-show="props.status === 'default' || props.status === 'ready' || props.status === 'break-ready'">▶</span>
    </button>
  </div>
</template>

<style lang="less">
.clock-counter{
  display: block;
  margin-top: 5%;
  background: url(../../../../assets/image/projects/StinkyClock/eight-background.png) no-repeat;
  background-origin:border-box;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: auto;
  text-align: center;
  h1 {
    font-weight: 1000;
    @media (min-width: 576px) {
      font-size: 10vw;
    }
    @media (min-width: 1400px) {
      font-size: 5vw;
    }
  }
  #button-add,#button-minus {
    background-color: transparent;
    border-color: transparent;
    @media (min-width: 576px) {
      font-size: 5vw;
    }
    @media (min-width: 1400px) {
      font-size: 3vw;
    }
  }
}
</style>
