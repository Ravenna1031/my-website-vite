<script setup lang="ts">
import githubIcon from '../assets/image/icon/Github.svg'

interface INav {
  type: 'text' | 'icon'
  name?: string
  title: string
  href?: string
  icon?: string
}

const nav: INav[] = [
  {
    type: 'text',
    name: 'home',
    title: 'Home',
  },
  {
    type: 'text',
    name: 'gallery',
    title: 'Gallery',
  },
  {
    type: 'text',
    name: 'projects',
    title: 'Projects',
  },
  {
    type: 'icon',
    title: 'Github',
    href: 'https://github.com/Ravenna1031',
    icon: githubIcon,
  },
]
</script>

<template>
  <div>
    <nav class="navbar justify-content-end px-4">
      <router-link :to="{ name: 'home' }">
        <img
          class="website-icon"
          src="../assets/image/icon/website-icon.png"
        >
      </router-link>
      <ul class="list-inline mb-0">
        <li
          v-for="item in nav" :key="item.title" class="list-inline-item px-1"
          :class="$route.name === item.name ? 'active' : null"
        >
          <router-link v-if="item.type === 'text'" :to="{ name: item.name }">
            {{ item.title }}
          </router-link>
          <a v-if="item.type === 'icon'" target="_blank" :href="item.href" data-toggle="tooltip" :title="item.title">
            <img :src="item.icon">
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>

.website-icon{
    position: absolute;
    width: 64px;
    height: 64px;
    top: 0;
    left: 0;
}

.list-inline-item>a {
  padding-right: 0;
  padding-left: 0;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: rgba(8, 8, 8, 0.4);
}

.list-inline-item>a:hover {
  color: #080808;
}

.list-inline-item.active>a,
.list-inline-item.active>a:hover,
.list-inline-item.active>a:focus {
  color: #080808;
}
</style>
