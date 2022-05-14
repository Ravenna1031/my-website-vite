<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import type { ITheme } from '../../constant'
import eightAngry from '../../assets/image/icon/projects/StinkyClock/eight-angry.png'
import eightJoy from '../../assets/image/icon/projects/StinkyClock/eight-joy.png'
import eightSorrow from '../../assets/image/icon/projects/StinkyClock/eight-sorrow.png'
import eightBreak from '../../assets/image/icon/projects/StinkyClock/eight-break.png'
import eightReset from '../../assets/image/icon/projects/StinkyClock/eight-reset.png'
import eightAudioReady from '../../assets/audio/projects/StinkyClock/eight-audio-ready.mp3'
import eightAudioStart from '../../assets/audio/projects/StinkyClock/eight-audio-start.mp3'
import eightAudioCancel from '../../assets/audio/projects/StinkyClock/eight-audio-cancel.mp3'
import eightAudioFinish from '../../assets/audio/projects/StinkyClock/eight-audio-finish.mp3'
import eightAudioBreak from '../../assets/audio/projects/StinkyClock/eight-audio-break.mp3'
import eightAudioReset from '../../assets/audio/projects/StinkyClock/eight-audio-reset.mp3'
import ClockIcon from './components/StinkyClock/ClockIcon.vue'
import ClockCounter from './components/StinkyClock/ClockCounter.vue'
import ClockButton from './components/StinkyClock/ClockButton.vue'
import ClockToday from './components/StinkyClock/ClockToday.vue'

const themeEight: ITheme = {
  iconDefault: eightSorrow,
  iconStart: eightAngry,
  iconFinish: eightJoy,
  iconBreak: eightBreak,
  iconReset: eightReset,
  audioReady: eightAudioReady,
  audioStart: eightAudioStart,
  audioCancel: eightAudioCancel,
  audioFinish: eightAudioFinish,
  audioBreak: eightAudioBreak,
  audioReset: eightAudioReset,
}

const status = ref<'default' | 'ready' | 'start' | 'finish' | 'break-ready' | 'break' | 'reset'>('default')

const currentTheme = themeEight

function iconHover() {
  // hover on 'START' button
  if (status.value === 'default')
    status.value = 'ready'
    // new Audio(currentTheme.audioReady).play()
}

function iconUnhover() {
  // unhover from 'START' button
  if (status.value !== 'start')
    status.value = 'default'
}

const theme: ITheme = themeEight

const timerMinute = ref<number>(1) // used for counter
const timerSecond = ref<number>(0)
const timerMinuteDefault = ref<number>(1) // used for calculation and default setting
const timerSecondDefault = ref<number>(0)
const timerMinuteBreak = ref<number>(5) // break time countdown
const timerSecondBreak = ref<number>(0)
const timerMinuteBreakDefault = ref<number>(5)
const timerSecondBreakDefault = ref<number>(0)

const timerToday = ref<number>(0) // total focus time today
const timerTodayLocal = localStorage.getItem('timer-today') // saved in browser storage
if (timerTodayLocal) {
  if (parseInt(timerTodayLocal) !== 0)
    timerToday.value = parseInt(timerTodayLocal)
}

const date = new Date()
const dateToday: string = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString()
const dateTodayLocal = localStorage.getItem('date-today')
if (dateTodayLocal) {
  if (dateToday !== dateTodayLocal) { // if local date is not equal to actual date
    timerToday.value = 0 // reset value of total focus time
    localStorage.setItem('date-today', dateToday)
  }
}
else {
  localStorage.setItem('date-today', dateToday)
}

function timerAdd() {
  if (status.value === 'break') {
    if (timerMinuteBreak.value < 30) {
      timerMinuteBreak.value += 5
      timerMinuteBreakDefault.value = timerMinuteBreak.value
    }
  }
  else {
    if (timerMinute.value < 60) {
      timerMinute.value += 5
      timerMinuteDefault.value = timerMinute.value
    }
  }
}

function timerMinus() {
  if (status.value === 'break') {
    if (timerMinuteBreak.value > 5) {
      timerMinuteBreak.value -= 5
      timerMinuteBreakDefault.value = timerMinuteBreak.value
    }
  }
  else {
    if (timerMinute.value > 10) {
      timerMinute.value -= 5
      timerMinuteDefault.value = timerMinute.value
    }
  }
}

const timerValue = computed<string>(() => {
  // the value of countdown
  if (status.value !== 'break' && status.value !== 'break-ready') {
    if (timerSecond.value < 10)
      return `${timerMinute.value}:0${timerSecond.value}`

    else
      return `${timerMinute.value}:${timerSecond.value}`
  }
  else {
    if (timerSecondBreak.value < 10)
      return `${timerMinuteBreak.value}:0${timerSecondBreak.value}`

    else
      return `${timerMinuteBreak.value}:${timerSecondBreak.value}`
  }
})

let timerInterval: NodeJS.Timeout
let timerIntervalBreak: NodeJS.Timeout

function timerCountDown() {
  let seconds = timerMinute.value * 60 + timerSecond.value
  seconds -= 1
  timerToday.value += 1
  if (seconds <= 0)
    timerFinish()
  timerMinute.value = Math.floor(seconds / 60)
  timerSecond.value = seconds % 60
}

function timerCountDownBreak() {
  let seconds = timerMinuteBreak.value * 60 + timerSecondBreak.value
  seconds -= 1
  if (seconds <= 0)
    timerFinishBreak()
  timerMinuteBreak.value = Math.floor(seconds / 60)
  timerSecondBreak.value = seconds % 60
}
function timerStart() {
  // start countdown
  status.value = 'start'
  new Audio(currentTheme.audioStart).play()
  timerCountDown()
  timerInterval = setInterval(timerCountDown, 100)
}

function timerCancel() {
  status.value = 'default'
  clearInterval(timerInterval)
  timerMinute.value = timerMinuteDefault.value
  timerSecond.value = timerSecondDefault.value
  new Audio(currentTheme.audioCancel).play()
}

function timerFinish() {
  status.value = 'finish'
  clearInterval(timerInterval)
  new Audio(currentTheme.audioFinish).play()
}

function timerFinishBreak() {
  status.value = 'reset'
  clearInterval(timerIntervalBreak)
  new Audio(currentTheme.audioReset).play()
}

function timerDone() {
  status.value = 'default'
  timerMinute.value = timerMinuteDefault.value
  timerSecond.value = timerSecondDefault.value
}

function timerBreak() {
  status.value = 'break-ready'
  timerMinuteBreak.value = timerMinuteBreakDefault.value
  timerSecondBreak.value = timerSecondBreakDefault.value
}

function timerBreakStart() {
  status.value = 'break'
  new Audio(currentTheme.audioBreak).play()
  timerCountDownBreak()
  timerIntervalBreak = setInterval(timerCountDownBreak, 100)
}

function timerTodayCalculate(): string {
  // calculate total focus time today
  const oneHour = 60
  const currentMinutes: number = Math.floor(timerToday.value / 60)
  localStorage.setItem('timer-today', timerToday.value.toString())
  if (currentMinutes < oneHour)
    return currentMinutes.toString()
  else
    return `${Math.floor(currentMinutes / 60)}h${currentMinutes}`
}
</script>

<template>
  <div class="container">
    <ClockIcon :status="status" :theme="theme" />
    <ClockCounter :status="status" :timer-value="timerValue" @timer-add="timerAdd" @timer-minus="timerMinus" />
    <ClockButton :status="status" @break-start="timerBreakStart" @take-break="timerBreak" @done="timerDone" @cancel="timerCancel" @start="timerStart" @hover="iconHover" @unhover="iconUnhover" />
    <ClockToday :status="status" :timer-today="timerTodayCalculate()" />
  </div>
</template>

<style lang="less">
.clock-today {
  margin-top: 10%;
}
</style>
