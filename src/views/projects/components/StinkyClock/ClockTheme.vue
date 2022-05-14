<script setup lang="ts">
import eightIconTheme from '../../../../assets/image/projects/StinkyClock/eight-icon-theme.png'
import senpaiIconTheme from '../../../../assets/image/projects/StinkyClock/senpai-icon-theme.png'
import eightAudioTheme from '../../../../assets/audio/projects/StinkyClock/eight-audio-theme.mp3'
import senpaiAudioTheme from '../../../../assets/audio/projects/StinkyClock/senpai-audio-theme.mp3'

const props = defineProps<{
  status: string
}>()

const emit = defineEmits([
  'themeSwitch',
])

function themeSwitch(themeName: string) {
  emit('themeSwitch', themeName)
}

function themeIconHover(audio: string) {
  new Audio(audio).play()
}

</script>

<template>
  <div v-show="props.status === 'default' || props.status === 'ready'" class="clock-theme">
    <h1>
      Theme<span>
        <img :src="eightIconTheme" @mouseover="themeIconHover(eightAudioTheme)" @click="themeSwitch('eight')">
      </span>
      <span>
        <img :src="senpaiIconTheme" @mouseover="themeIconHover(senpaiAudioTheme)" @click="themeSwitch('senpai')">
      </span>
    </h1>
  </div>
</template>

<style lang="less">
.clock-theme {
  margin-top: 10%;
  img {
    width: 64px;
    margin-left: 5%;
    border-radius: 50%;
  }
  img:hover {
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
  }
}
</style>
