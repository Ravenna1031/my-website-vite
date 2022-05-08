<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import NavHeader from './components/NavHeader.vue'
import TreeBranch from './components/TreeBranch.vue'
</script>

<template>
  <div class="container row">
    <NavHeader />
    <div class="col-sm-10 col-md-9 col-lg-7 m-auto">
      <router-view />
      <TreeBranch />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background-color: #BDC0BA;
}

.container {
  display: table;
  margin-left: auto;
  margin-right: auto;
}
</style>
