<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import type { ITheme } from '../../constant'
import eightAngry from '../../assets/image/icon/projects/StinkyClock/eight-angry.png'
import eightJoy from '../../assets/image/icon/projects/StinkyClock/eight-joy.png'
import eightSorrow from '../../assets/image/icon/projects/StinkyClock/eight-sorrow.png'
import eightAudioReady from '../../assets/audio/projects/StinkyClock/eight-audio-ready.mp3'
import eightAudioStart from '../../assets/audio/projects/StinkyClock/eight-audio-start.mp3'
import eightAudioCancel from '../../assets/audio/projects/StinkyClock/eight-audio-cancel.mp3'
import ClockIcon from './components/StinkyClock/ClockIcon.vue'
import ClockCounter from './components/StinkyClock/ClockCounter.vue'
import ClockButton from './components/StinkyClock/ClockButton.vue'
import ClockToday from './components/StinkyClock/ClockToday.vue'

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

let timerInterval: NodeJS.Timeout

const timerMinute = ref<number>(25) // used for counter
const timerSecond = ref<number>(0)
const timerMinuteDefault = ref<number>(25) // used for calculation and default setting
const timerSecondDefault = ref<number>(0)

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

const timerValue = computed<string>(() => {
  // the value of countdown
  if (timerSecond.value < 10)
    return `${timerMinute.value}:0${timerSecond.value}`
  else
    return `${timerMinute.value}:${timerSecond.value}`
})

function timerStart() {
  // start countdown
  status.value = 'start'
  new Audio(currentTheme.audioStart).play()
  timerCountDown()
  timerInterval = setInterval(timerCountDown, 100)
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
  timerMinute.value = timerMinuteDefault.value
  timerSecond.value = timerSecondDefault.value
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
    <ClockButton :status="status" @cancel="timerCancel" @start="timerStart" @hover="iconHover" @unhover="iconUnhover" />
    <ClockToday :status="status" :timer-today="timerTodayCalculate()" />
  </div>
</template>

<style lang="less">
.clock-today {
  margin-top: 10%;
}
</style>
