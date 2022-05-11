<script setup lang="ts">
import { ref } from 'vue'
import ImageModal from '../components/ImageModal.vue'

interface IImage {
  name: string
  source: string
  type: string
}

const gallery: IImage[] = [
  {
    name: 'Vessel',
    source: '/src/assets/image/gallery/Vessel.png',
    type: 'AI Art',
  },
  {
    name: 'Cube',
    source: '/src/assets/image/gallery/Cube.png',
    type: 'AI Art',
  },

  {
    name: 'Church',
    source: '/src/assets/image/gallery/Church.png',
    type: 'AI Art',
  },
]

const modalIsOpen = ref(false)
const shownImage = ref({})
const openModal = (image: IImage) => {
  shownImage.value = image
  modalIsOpen.value = true
}
const closeModal = () => {
  modalIsOpen.value = false
}
</script>

<template>
  <div class="container">
    <div class="grid">
      <div v-for="image in gallery" :key="image.name" class="grid-item">
        <img :src="image.source" @click="openModal(image)">
      </div>
    </div>
    <ImageModal :is-open="modalIsOpen" :image="shownImage" @close-modal="closeModal" />
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
