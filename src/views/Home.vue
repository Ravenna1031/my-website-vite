<template>
  <div class="container">
    <div class="header">
      <h2 style="font-weight: bolder;">
        Ray Gu
      </h2>
    </div>
    <div class="content">
      <p>
        Hi, I am Ray Gu, a software development engineer interested in creative work.
        <br>
        Trying new things and to learn about them is a great passion of mine, and the combination of art and program
        really fascinated me. You can find my work
        <span>
          <router-link :to="{ name: 'gallery' }"> in the Gallery</router-link> <span /> .
        </span>
      </p>
    </div>
  </div>
</template>

<style>
.header {
  margin-top: 5%;
  float: left;
}

.content {
  margin-top: 5%;
  font-size: large;
  float: left;
  text-align: left;
}
</style>
