<script setup lang="ts">
interface IProject {
  index: string
  name: string
}

const projectsList: IProject[] = [
  {
    index: '01',
    name: 'Stinky Clock',
  },
]
</script>

<template>
  <div class="container">
    <div class="row mt-4">
      <div id="project-title">
        <h5>Meaningless Projects</h5>
      </div>
      <router-link v-for="project in projectsList" id="project-container" :key="project.index"
        :to="{ path: '/projects/' + project.index }" class="col-xs-12 col-sm-10 col-md-6 col-lg-4">
        <div id="project-container">
          <span id="project-index">{{ project.index }}</span> <span id="project-name">{{ project.name }}</span>
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
  /* color: rgba(96, 55, 62, 0.8); */
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
