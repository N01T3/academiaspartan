import { test, expect } from '@playwright/test'

test('lista os posts publicados', async ({ page }) => {
  await page.goto('/blog')
  await expect(page.getByRole('heading', { name: /Periodização para hipertrofia/ })).toBeVisible()
})

test('filtra posts por categoria', async ({ page }) => {
  await page.goto('/blog')
  await page.getByRole('button', { name: 'Nutrição' }).click()
  await expect(page.getByRole('heading', { name: /Nutrição pré-competição/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Periodização para hipertrofia/ })).toHaveCount(0)
})

test('abre um artigo e volta ao blog', async ({ page }) => {
  await page.goto('/blog')
  await page.getByRole('link', { name: /Periodização para hipertrofia/ }).click()
  await expect(page).toHaveURL(/\/blog\/periodizacao-para-hipertrofia/)
  await page.getByRole('button', { name: 'Voltar ao blog' }).click()
  await expect(page).toHaveURL(/\/blog$/)
})
