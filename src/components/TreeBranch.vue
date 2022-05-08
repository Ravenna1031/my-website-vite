<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as _ from 'lodash'

const canvasRef = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

interface IPoint {
  x: number
  y: number
}

interface IBranch {
  // single stroke
  start: IPoint
  length: number
  angle: number
}

function initTree(): IBranch[] {
  const treeResult: IBranch[] = []
  const positionShuffle = _.shuffle(['top', 'bottom', 'left', 'right'])
  const treeNumber = Math.ceil(Math.random() * 4)
  const tree: IBranch = {
    start: { x: 0, y: 0 },
    length: 0,
    angle: 0,
  }
  for (let i = 0; i < treeNumber; i++) {
    const position = positionShuffle.shift()!
    if (position === 'top' || position === 'bottom') {
      tree.start.x = Math.random() * WIDTH
      tree.length = HEIGHT / 100
      tree.start.y = position === 'top' ? 0 : HEIGHT
      tree.angle = position === 'top' ? Math.PI / 4 + Math.random() * Math.PI / 2 : -Math.PI / 4 - Math.random() * Math.PI / 2
    }
    else {
      tree.start.y = Math.random() * WIDTH
      tree.length = WIDTH / 100
      tree.start.x = position === 'left' ? 0 : HEIGHT
      tree.angle = position === 'left' ? Math.PI / 4 - Math.random() * Math.PI / 2 : Math.PI * 3 / 4 + Math.random() * Math.PI / 2
    }
    treeResult.push(tree)
  }
  return treeResult
}

function init() {
  const seeds = initTree()
  seeds.forEach((seed) => {
    setTimeout(() => sprout({
      start: seed.start,
      length: seed.length,
      angle: seed.angle,
    }), 10)
  })
}

const pendingTask: Function[] = []

function sprout(b: IBranch, depth = 0) {
  const end = getEndPoint(b)
  drawBranch(b)

  if (depth < 6 || Math.random() < 0.4) {
    pendingTask.push(() => {
      sprout({
        start: end,
        length: (Math.random() + 0.5) * b.length,
        angle: b.angle - 0.5 * Math.random(),
      }, depth + 1)
    })
  }

  if (depth < 6 || Math.random() < 0.4) {
    pendingTask.push(() => {
      sprout({
        start: end,
        length: (Math.random() + 0.5) * b.length,
        angle: b.angle + 0.5 * Math.random(),
      }, depth + 1)
    })
  }
}

function frame() {
  const task = [...pendingTask]
  pendingTask.length = 0
  task.forEach(fn => fn())
}

let frameCount = 0
function startFrame() {
  requestAnimationFrame(() => {
    frameCount += 1
    if (frameCount % 30 === 0)
      frame()
    startFrame()
  })
}

startFrame()

function lineTo(startPoint: IPoint, endPoint: IPoint) {
  ctx.beginPath()
  ctx.moveTo(startPoint.x, startPoint.y)
  ctx.lineTo(endPoint.x, endPoint.y)
  ctx.stroke()
}

function getEndPoint(b: IBranch) {
  return {
    x: b.start.x + b.length * Math.cos(b.angle),
    y: b.start.y + b.length * Math.sin(b.angle),
  }
}

function drawBranch(b: IBranch) {
  lineTo(b.start, getEndPoint(b))
}

onMounted(() => {
  if (canvasRef.value) { // type guard
    ctx = canvasRef.value.getContext('2d')!
    ctx.globalAlpha = 0.5 // transparency
    ctx.strokeStyle = '#91B493'
  }
  init()
})

</script>
<template>
  <teleport to="#canvas">
    <canvas ref="canvasRef" :width="WIDTH" :height="HEIGHT" />
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
