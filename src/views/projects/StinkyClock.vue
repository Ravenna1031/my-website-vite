<script setup lang="ts">
import eightIcon from '../../assets/image/icon/eightIcon.png'

</script>

<template>
  <div class="container">
    <img :src="eightIcon" class="rotate">
  </div>
</template>

<style>
.rotate {
  animation: rotation 5s infinite linear;
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
