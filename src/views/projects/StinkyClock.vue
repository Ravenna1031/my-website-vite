<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import type { ITheme } from '../../constant'
import eightStart from '../../assets/image/projects/StinkyClock/eight-start.png'
import eightFinish from '../../assets/image/projects/StinkyClock/eight-finish.png'
import eightDefault from '../../assets/image/projects/StinkyClock/eight-default.png'
import eightBreak from '../../assets/image/projects/StinkyClock/eight-break.png'
import eightReset from '../../assets/image/projects/StinkyClock/eight-reset.png'
import eightAudioStart from '../../assets/audio/projects/StinkyClock/eight-audio-start.mp3'
import eightAudioCancel from '../../assets/audio/projects/StinkyClock/eight-audio-cancel.mp3'
import eightAudioFinish from '../../assets/audio/projects/StinkyClock/eight-audio-finish.mp3'
import eightAudioBreak from '../../assets/audio/projects/StinkyClock/eight-audio-break.mp3'
import eightAudioReset from '../../assets/audio/projects/StinkyClock/eight-audio-reset.mp3'
import senpaiStart from '../../assets/image/projects/StinkyClock/senpai-start.png'
import senpaiFinish from '../../assets/image/projects/StinkyClock/senpai-finish.png'
import senpaiDefault from '../../assets/image/projects/StinkyClock/senpai-default.png'
import senpaiBreak from '../../assets/image/projects/StinkyClock/senpai-break.png'
import senpaiReset from '../../assets/image/projects/StinkyClock/senpai-reset.png'
import senpaiAudioStart from '../../assets/audio/projects/StinkyClock/senpai-audio-start.mp3'
import senpaiAudioCancel from '../../assets/audio/projects/StinkyClock/senpai-audio-cancel.mp3'
import senpaiAudioFinish from '../../assets/audio/projects/StinkyClock/senpai-audio-finish.mp3'
import senpaiAudioBreak from '../../assets/audio/projects/StinkyClock/senpai-audio-break.mp3'
import senpaiAudioReset from '../../assets/audio/projects/StinkyClock/senpai-audio-reset.mp3'
import ClockIcon from './components/StinkyClock/ClockIcon.vue'
import ClockCounter from './components/StinkyClock/ClockCounter.vue'
import ClockButton from './components/StinkyClock/ClockButton.vue'
import ClockToday from './components/StinkyClock/ClockToday.vue'
import ClockTheme from './components/StinkyClock/ClockTheme.vue'

const themeEight: ITheme = {
  iconDefault: eightDefault,
  iconStart: eightStart,
  iconFinish: eightFinish,
  iconBreak: eightBreak,
  iconReset: eightReset,
  audioStart: eightAudioStart,
  audioCancel: eightAudioCancel,
  audioFinish: eightAudioFinish,
  audioBreak: eightAudioBreak,
  audioReset: eightAudioReset,
}

const themeSenpai: ITheme = {
  iconDefault: senpaiDefault,
  iconStart: senpaiStart,
  iconFinish: senpaiFinish,
  iconBreak: senpaiBreak,
  iconReset: senpaiReset,
  audioStart: senpaiAudioStart,
  audioCancel: senpaiAudioCancel,
  audioFinish: senpaiAudioFinish,
  audioBreak: senpaiAudioBreak,
  audioReset: senpaiAudioReset,
}

const status = ref<'default' | 'ready' | 'start' | 'finish' | 'break-ready' | 'break' | 'reset'>('default')

const currentTheme = ref<ITheme>(themeEight)

function switchTheme(themeName: string) {
  if (themeName === 'eight')
    currentTheme.value = themeEight
  else if (themeName === 'senpai')
    currentTheme.value = themeSenpai
}

function iconHover() {
  // hover on 'START' button
  if (status.value === 'default')
    status.value = 'ready'
    // new Audio(currentTheme.value.audioReady).play()
}

function iconUnhover() {
  // unhover from 'START' button
  if (status.value !== 'start')
    status.value = 'default'
}

const timerMinute = ref<number>(25) // used for counter
const timerSecond = ref<number>(0)
const timerMinuteDefault = ref<number>(25) // used for calculation and default setting
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
  if (status.value === 'break-ready') {
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
  if (status.value === 'break-ready') {
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
  if (status.value !== 'break' && status.value !== 'break-ready' && status.value !== 'reset') {
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
let timerIntervalPositive: NodeJS.Timeout

function timerPositive() {
  let seconds = timerMinute.value * 60 + timerSecond.value
  seconds += 1
  timerToday.value += 1
  timerMinute.value = Math.floor(seconds / 60)
  timerSecond.value = seconds % 60
}

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
  new Audio(currentTheme.value.audioStart).play()
  timerCountDown()
  timerInterval = setInterval(timerCountDown, 10)
}

function timerCancel() {
  status.value = 'default'
  clearInterval(timerInterval)
  timerMinute.value = timerMinuteDefault.value
  timerSecond.value = timerSecondDefault.value
  new Audio(currentTheme.value.audioCancel).play()
}

function timerFinish() {
  status.value = 'finish'
  clearInterval(timerInterval)
  new Audio(currentTheme.value.audioFinish).play()
  // if countdown finished, start positive timing
  timerPositive()
  timerIntervalPositive = setInterval(timerPositive, 10)
}

function timerFinishBreak() {
  status.value = 'reset'
  clearInterval(timerIntervalBreak)
  new Audio(currentTheme.value.audioReset).play()
}

function timerDone() {
  status.value = 'default'
  timerMinute.value = timerMinuteDefault.value
  timerSecond.value = timerSecondDefault.value
  if (timerIntervalPositive)
    clearInterval(timerIntervalPositive)
}

function timerBreak() {
  status.value = 'break-ready'
  timerMinuteBreak.value = timerMinuteBreakDefault.value
  timerSecondBreak.value = timerSecondBreakDefault.value
  if (timerIntervalPositive)
    clearInterval(timerIntervalPositive)
}

function timerBreakStart() {
  status.value = 'break'
  new Audio(currentTheme.value.audioBreak).play()
  timerCountDownBreak()
  timerIntervalBreak = setInterval(timerCountDownBreak, 10)
}

const timerTodayCal = computed<string>(() => {
  const currentMinutes: number = Math.floor(timerToday.value / 60)
  localStorage.setItem('timer-today', timerToday.value.toString())
  if (currentMinutes < 60)
    return currentMinutes.toString()
  else
    return `${Math.floor(currentMinutes / 60)}h${currentMinutes % 60}`
})
</script>

<template>
  <div class="container">
    <h1 class="clock-title">
      Stinky Clock
    </h1>
    <ClockIcon :status="status" :theme="currentTheme" />
    <ClockCounter :status="status" :timer-value="timerValue" @timer-add="timerAdd" @timer-minus="timerMinus" />
    <ClockButton :timer-minute="timerMinuteDefault" :status="status" @break-start="timerBreakStart" @take-break="timerBreak" @done="timerDone" @cancel="timerCancel" @start="timerStart" @hover="iconHover" @unhover="iconUnhover" />
    <ClockToday :status="status" :timer-today="timerTodayCal" />
    <ClockTheme :status="status" @theme-switch="switchTheme" />
  </div>
</template>

<style lang="less">
.clock-title {
  margin-top: 10%;
}
</style>
