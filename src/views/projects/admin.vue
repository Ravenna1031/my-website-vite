<script setup lang="ts">
import { toInteger } from 'lodash'
import { useRoute } from 'vue-router'
import { projectsList } from '../../constant'

import StinkyClock from './StinkyClock.vue'

const route = useRoute()

if (typeof (route.params.id) === 'string') // type guard
  document.title = `${route.params.id}. ${projectsList[toInteger(route.params.id)]}`

</script>

<template>
  <div>
    <StinkyClock v-if="route.params.id === '0'" />
  </div>
</template>
