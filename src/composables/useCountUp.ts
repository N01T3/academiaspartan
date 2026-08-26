import { ref } from 'vue'

export function useCountUp(target: number, duration = 1600) {
  const value = ref(0)
  let raf = 0

  function start() {
    cancelAnimationFrame(raf)
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      value.value = Math.round(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  }

  return { value, start }
}
