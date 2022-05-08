<script setup lang="ts">

interface IImage {
  name: string
  source: string
  type: string
}

const gallery: IImage[] = [
  {
    name: 'Church',
    source: '/src/assets/Church.png',
    type: 'AI Art',
  },
  {
    name: 'SHattering',
    source: '/src/assets/SHattering.png',
    type: 'Photography & AI Art',
  },
  {
    name: 'Vessel',
    source: '/src/assets/Vessel.png',
    type: 'AI Art',
  },
  {
    name: 'Cube',
    source: '/src/assets/Cube.png',
    type: 'AI Art',
  },
]
</script>

<template>
  <div class="grid">
    <div v-for="image in gallery" :key="image.name" class="grid-item">
      <img :src="image.source">
    </div>
  </div>
</template>

<style>
.grid {
  column-count: 2;
  column-gap: 0;
  margin-top: 5%;
}

.grid-item {
  padding: 2px;
}

.grid-item img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
