<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import eightAngry from '../../assets/image/icon/projects/StinkyClock/eight-angry.png'
import eightJoy from '../../assets/image/icon/projects/StinkyClock/eight-joy.png'
import eightSorrow from '../../assets/image/icon/projects/StinkyClock/eight-sorrow.png'

interface ITheme {
  iconDefault: string
  iconStart: string
  iconFinish: string
}

const themeEight: ITheme = {
  iconDefault: eightSorrow,
  iconStart: eightAngry,
  iconFinish: eightJoy,
}

const status = ref<'default' | 'ready' | 'start' | 'finish'>('default')

function iconHover() {
  if (status.value === 'default')
    status.value = 'ready'
}

function iconUnhover() {
  if (status.value !== 'start')
    status.value = 'default'
}

const theme = themeEight

const timerMinute = ref(25)
const timerSecond = ref(0)

function timerAdd() {
  if (timerMinute.value < 60)
    timerMinute.value += 5
}

function timerMinus() {
  if (timerMinute.value > 10)
    timerMinute.value -= 5
}

function timerStart() {
  status.value = 'start'
  timerCountDown()
  setInterval(timerCountDown, 1000)
}

const timerValue = computed(() => {
  if (timerSecond.value === 0)
    return `${timerMinute.value}:${timerSecond.value}${timerSecond.value}`
  else
    return `${timerMinute.value}:${timerSecond.value}`
})

function timerCountDown() {
  let seconds = timerMinute.value * 60 + timerSecond.value
  seconds -= 1
  timerMinute.value = Math.floor(seconds / 60)
  timerSecond.value = seconds % 60
}

</script>

<template>
  <div class="container">
    <div class="clock-icon">
      <img v-show="status === 'default'" :src="theme.iconDefault">
      <img v-show="status === 'ready'" :src="theme.iconStart">
      <img v-show="status === 'start'" class="rotate" :src="theme.iconStart">
    </div>
    <div class="clock-counter row m-0">
      <button id="button-add" type="button" class="col-2 btn btn-light" @click="timerMinus">
        <span v-show="status === 'default' || status === 'ready'">◀</span>
      </button>
      <h1 class="col-8 mb-0">
        {{ timerValue }}
      </h1>
      <button id="button-minus" type="button" class="col-2 btn btn-light" @click="timerAdd">
        <span v-show="status === 'default' || status === 'ready'">▶</span>
      </button>
    </div>
    <div class="clock-button" @mouseover="iconHover" @mouseout="iconUnhover">
      <h1 v-show="status === 'default' || status === 'ready'" @click="timerStart">
        START
      </h1>
    </div>
  </div>
</template>

<style lang="less">
.rotate {
  animation: rotation 5s linear infinite;
}

.clock-icon {
  margin-top: 5%;
}

.clock-counter {
  display: block;
  margin-top: 5%;
  background: url(../../assets/image/icon/projects/StinkyClock/eight-background.png) no-repeat;
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
  #button-add,#button-minus{
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

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}
</style>
