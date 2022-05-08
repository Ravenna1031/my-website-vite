<script setup lang="ts">
import { computed } from '@vue/reactivity'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'close-modal',
])

function closeModal() {
  emit('close-modal')
}

const modalStyle = computed(() => {
  if (props.isOpen)
    return { display: 'block' }
  else
    return { display: 'none' }
})

</script>

<template>
  <teleport to="#image-modal">
    <div v-if="props.isOpen" class="modal" :style="modalStyle">
      <span class="close" @click="closeModal">&times;</span>
      <div id="modal-content" class="modal-content">
        <div class="row">
          <div class="col-sm-10 col-md-9 col-lg-8 col-xl-6 col-xxl-4 m-auto">
            <img :src="props.image.source">
            <div class="image-info">
              <h1>
                {{ props.image.name }}
              </h1>
              <h2>
                {{ props.image.type }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 15%;
  left: 0;
  top: 0;
  width: 80%;
  height: 80%;
  overflow: auto;
  background-color: rgba(67, 67, 67, 0.9);
}

.modal-content {
  margin: auto;
  display: block;
  /* max-width: 80%; */
}

#modal-content {
  background-color: transparent;
  border: 0px;
}

.modal-content img {
  margin-left: 10%;
  max-width: 80%;
}

.modal-content .image-info {
  margin-top: 2%;
  margin-left: 14%;
  color: rgba(252, 250, 242, 0.7);
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
</style>
