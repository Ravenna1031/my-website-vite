<script setup lang="ts">
import { projectsList } from '../constant'

</script>

<template>
  <div class="container">
    <div class="row mt-4">
      <div id="project-title">
        <h5>Meaningless Projects</h5>
      </div>
      <router-link
        v-for="project, index in projectsList" id="project-container" :key="index"
        :to="{ path: '/projects/' + index }" class="col-xs-12 col-sm-10 col-md-6 col-lg-4"
      >
        <div id="project-container">
          <span id="project-index">{{ index }}</span> <span id="project-name">{{ project }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style>
#project-title h5 {
  float: left;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 4%;
}

#project-container {
  float: left;
  margin-bottom: 2%;
  font-size: medium;
}

#project-index {
  color: rgba(0, 98, 132, 0.8);
}

#project-container:hover #project-index {
  color: rgb(0, 98, 132);
}

#project-name {
  color: rgba(55, 60, 56, 0.8);
  font-weight: bold;
}

#project-container:hover #project-name {
  color: rgb(55, 60, 56);
}
</style>
