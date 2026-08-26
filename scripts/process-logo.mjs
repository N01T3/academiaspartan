import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const input = join(__dirname, '..', '..', 'Captura de tela 2026-08-25 214426.png')
const output = join(__dirname, '..', 'src', 'assets', 'logo.png')

const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info

const bg = [12, 16, 20]
const tolerance = 42

function dist(px, i, r, g, b) {
  const dr = px[i] - r
  const dg = px[i + 1] - g
  const db = px[i + 2] - b
  return dr * dr + dg * dg + db * db
}

const isBg = (i) => dist(data, i, bg[0], bg[1], bg[2]) <= tolerance * tolerance

const visited = new Uint8Array(width * height)
const stack = []

function seed(x, y) {
  const idx = y * width + x
  if (!visited[idx] && isBg(idx * channels)) {
    visited[idx] = 1
    stack.push(idx)
  }
}

for (let x = 0; x < width; x++) {
  seed(x, 0)
  seed(x, height - 1)
}
for (let y = 0; y < height; y++) {
  seed(0, y)
  seed(width - 1, y)
}

while (stack.length) {
  const idx = stack.pop()
  const x = idx % width
  const y = (idx / width) | 0
  const neighbors = []
  if (x > 0) neighbors.push(idx - 1)
  if (x < width - 1) neighbors.push(idx + 1)
  if (y > 0) neighbors.push(idx - width)
  if (y < height - 1) neighbors.push(idx + width)
  for (const n of neighbors) {
    if (!visited[n] && isBg(n * channels)) {
      visited[n] = 1
      stack.push(n)
    }
  }
}

const out = Buffer.alloc(data.length)
for (let i = 0; i < width * height; i++) {
  const p = i * channels
  out[p] = data[p]
  out[p + 1] = data[p + 1]
  out[p + 2] = data[p + 2]
  out[p + 3] = visited[i] ? 0 : 255
}

const scale = 3
await sharp(out, { raw: { width, height, channels: 4 } })
  .resize(width * scale, height * scale, { kernel: 'lanczos3' })
  .png()
  .toFile(output)

console.log('Logo processed:', width * scale, 'x', height * scale)
