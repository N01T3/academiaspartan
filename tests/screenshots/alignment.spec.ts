import { test, expect } from '@playwright/test'

const pages = ['/', '/equipe', '/blog', '/contato', '/programas', '/estrutura']

test.describe('alinhamento horizontal global', () => {
  for (const path of pages) {
    test(`todos os container-content alinhados em ${path}`, async ({ page }, testInfo) => {
      await page.goto(path, { waitUntil: 'load', timeout: 30_000 })
      await page.waitForTimeout(600)

      const boxes = await page.locator('.container-content').evaluateAll((els) =>
        els.map((el) => {
          const r = el.getBoundingClientRect()
          return { left: r.left, right: r.right, width: r.width }
        }),
      )

      const lefts = boxes.map((b) => Math.round(b.left * 10) / 10)
      const rights = boxes.map((b) => Math.round(b.right * 10) / 10)

      console.log(
        `[${testInfo.project.name}] ${path} -> lefts: ${lefts.join(', ')} | rights: ${rights.join(', ')}`,
      )

      expect(boxes.length).toBeGreaterThan(1)
      expect(Math.max(...lefts) - Math.min(...lefts)).toBeLessThan(2)
      expect(Math.max(...rights) - Math.min(...rights)).toBeLessThan(2)
    })
  }
})
