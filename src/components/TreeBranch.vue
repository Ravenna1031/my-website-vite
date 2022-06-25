<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRafFn, useWindowSize } from '@vueuse/core'
import type { Fn } from '@vueuse/core'

const r180 = Math.PI
const r90 = Math.PI / 2
const r15 = Math.PI / 12

const el = ref<HTMLCanvasElement | null>(null)

const { random } = Math
const size = reactive(useWindowSize())

// the min number of steps
const init = ref(4)
// the initial length of a line
const len = ref(6)

function initCanvas(canvas: HTMLCanvasElement, width = 400, height = 400) {
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
  // webkitBackingStorePixelRatio is deprecated
  canvas.width = width * window.devicePixelRatio
  canvas.height = height * window.devicePixelRatio
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  return ctx
}

function polar2cart(x = 0, y = 0, r = 0, theta = 0) {
  // transfer polar coordinate (r, θ) to Cartesian coordinate (x, y)
  const dx = r * Math.cos(theta)
  const dy = r * Math.sin(theta)
  return [x + dx, y + dy]
}

onMounted(() => {
  const canvas = el.value!
  const ctx = initCanvas(canvas, size.width, size.height)
  const { width, height } = canvas

  let steps: Fn[] = []
  let prevSteps: Fn[] = []

  let iterations = 0

  const step = (x: number, y: number, rad: number) => {
    const length = random() * len.value
    const [nx, ny] = polar2cart(x, y, length, rad)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(nx, ny)
    ctx.stroke()

    // radius of generated left & right branch
    const radL = rad - random() * r15
    const radR = rad + random() * r15
    // in case the point (nx, ny) is outside the canvas
    if (nx < -100 || nx > size.width + 100 || ny < -100 || ny > size.height + 100)
      return

    if (iterations <= init.value || random() > 0.5)
      steps.push(() => step(nx, ny, radL))
    if (iterations <= init.value || random() > 0.5)
      steps.push(() => step(nx, ny, radR))
  }

  // current timestamp
  let lastTime = performance.now()
  const interval = 1000 / 40

  const frame = () => {
    // this function is called every fame, set a time interval
    if (performance.now() - lastTime < interval)
      return

    iterations += 1
    // the steps should be drawn in current frame
    prevSteps = steps
    // clear the frames that are already been drawn
    steps = []
    lastTime = performance.now()

    prevSteps.forEach(i => i())
  }

  // call function frame() on every requestAnimationFrame
  const controls = useRafFn(frame, { immediate: false })

  function start() {
    controls.pause()
    iterations = 0
    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 1
    ctx.globalAlpha = 0.5
    ctx.strokeStyle = '#91B493'
    prevSteps = []
    // initial points of 4 sides
    steps = [
      // top
      () => step(random() * size.width, 0, r90),
      // bottom
      () => step(random() * size.width, size.height, -r90),
      // left
      () => step(0, random() * size.height, 0),
      // right
      () => step(size.width, random() * size.height, r180),
    ]
    if (size.width < 500)
    // if the width of the browser is to small, only keeps the top and the bottom
      steps = steps.slice(0, 2)
    controls.resume()
  }

  start()
})

</script>

<template>
  <teleport to="#canvas">
    <canvas ref="el" width="400" height="400" />
  </teleport>
</template>

<style>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
