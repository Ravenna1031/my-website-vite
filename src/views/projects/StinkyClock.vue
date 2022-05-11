<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import eightAngry from '../../assets/image/icon/projects/StinkyClock/eight-angry.png'
import eightJoy from '../../assets/image/icon/projects/StinkyClock/eight-joy.png'
import eightSorrow from '../../assets/image/icon/projects/StinkyClock/eight-sorrow.png'
import eightAudioReady from '../../assets/audio/projects/StinkyClock/eight-audio-ready.mp3'
import eightAudioStart from '../../assets/audio/projects/StinkyClock/eight-audio-start.mp3'
import eightAudioCancel from '../../assets/audio/projects/StinkyClock/eight-audio-cancel.mp3'

interface ITheme {
  iconDefault: string
  iconStart: string
  iconFinish: string
  audioReady: string
  audioStart: string
  audioCancel: string
}

const themeEight: ITheme = {
  iconDefault: eightSorrow,
  iconStart: eightAngry,
  iconFinish: eightJoy,
  audioReady: eightAudioReady,
  audioStart: eightAudioStart,
  audioCancel: eightAudioCancel,
}

const status = ref<'default' | 'ready' | 'start' | 'finish'>('default')

const currentTheme = themeEight

function iconHover() {
  if (status.value === 'default') {
    status.value = 'ready'
    new Audio(currentTheme.audioReady).play()
  }
}

function iconUnhover() {
  if (status.value !== 'start')
    status.value = 'default'
}

const theme: ITheme = themeEight

let timerInterval: NodeJS.Timeout

const timerMinute = ref<number>(25)
const timerSecond = ref<number>(0)
const timerMinuteDefault = ref<number>(25)
const timerSecondDefault = ref<number>(0)

function timerAdd() {
  if (timerMinute.value < 60) {
    timerMinute.value += 5
    timerMinuteDefault.value = timerMinute.value
  }
}

function timerMinus() {
  if (timerMinute.value > 10) {
    timerMinute.value -= 5
    timerMinuteDefault.value = timerMinute.value
  }
}

function timerStart() {
  status.value = 'start'
  new Audio(currentTheme.audioStart).play()
  timerCountDown()
  timerInterval = setInterval(timerCountDown, 1000)
}

const timerValue = computed(() => {
  if (timerSecond.value < 10)
    return `${timerMinute.value}:0${timerSecond.value}`
  else
    return `${timerMinute.value}:${timerSecond.value}`
})

function timerCountDown() {
  let seconds = timerMinute.value * 60 + timerSecond.value
  seconds -= 1
  timerMinute.value = Math.floor(seconds / 60)
  timerSecond.value = seconds % 60
}

function timerCancel() {
  status.value = 'default'
  clearInterval(timerInterval)
  timerMinute.value = timerMinuteDefault.value
  timerSecond.value = timerSecondDefault.value
  new Audio(currentTheme.audioCancel).play()
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
    <div class="clock-button">
      <h1 v-show="status === 'default' || status === 'ready'" @mouseover="iconHover" @mouseout="iconUnhover" @click="timerStart">
        START
      </h1>
      <h1 v-show="status === 'start'" @click="timerCancel">
        CANCEl
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
