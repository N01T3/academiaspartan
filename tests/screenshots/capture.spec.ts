import { test } from '@playwright/test'

const pages = [
  { path: '/', name: 'home' },
  { path: '/equipe', name: 'equipe' },
  { path: '/estrutura', name: 'estrutura' },
  { path: '/programas', name: 'programas' },
  { path: '/blog', name: 'blog' },
  { path: '/blog/periodizacao-para-hipertrofia', name: 'post' },
  { path: '/contato', name: 'contato' },
]

test.describe('captura de screenshots (QA visual)', () => {
  for (const pageDef of pages) {
    test(`captura ${pageDef.name}`, async ({ page }, testInfo) => {
      await page.goto(pageDef.path, { waitUntil: 'load', timeout: 30_000 })
      await page.evaluate(
        () => (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts?.ready,
      )
      await page.waitForTimeout(1200)

      await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
          let y = 0
          const step = 500
          const timer = setInterval(() => {
            window.scrollBy(0, step)
            y += step
            if (y >= document.body.scrollHeight) {
              clearInterval(timer)
              resolve()
            }
          }, 60)
        })
        window.scrollTo(0, 0)
      })
      await page.waitForTimeout(400)

      const shot = `test-results/screenshots/${testInfo.project.name}/${pageDef.name}.png`
      await page.screenshot({ path: shot, fullPage: true })
    })
  }
})
