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
@import './assets/font/font.css';

#app {
  font-family: manrope;
  text-align: center;
  margin-top: 60px;
}

body {
  background-color: rgba(102, 103, 171, 0.7);
}

.container {
  display: table;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
}
</style>
