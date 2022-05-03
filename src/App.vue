<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import 'bootstrap/dist/css/bootstrap.min.css'
import NavHeader from './components/NavHeader.vue'
import TreeBranch from './components/TreeBranch.vue'
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <div class="container">
    <NavHeader />
    <router-view />
    <TreeBranch />
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
  /* z-index: 1; */
}

/* TreeBranch {
  position: absolute;
  z-index: -2;
} */
</style>
