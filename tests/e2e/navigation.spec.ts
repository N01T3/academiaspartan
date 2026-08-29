import { test, expect } from '@playwright/test'

const publicRoutes = [
  { path: '/equipe', heading: 'Os profissionais que fazem a Spartan' },
  { path: '/estrutura', heading: 'Ambiente feito para performance' },
  { path: '/programas', heading: 'Programas e Bodybuilding' },
  { path: '/blog', heading: 'Conteúdo e autoridade' },
  { path: '/contato', heading: 'Fale com a gente' },
]

test('exibe o título do hero na home', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Forje seu corpo. Domine seus limites.' }),
  ).toBeVisible()
})

for (const { path, heading } of publicRoutes) {
  test(`exibe o título da página ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { name: heading })).toBeVisible()
  })
}

test('navega para o blog pelo header', async ({ page }) => {
  await page.goto('/')
  await page.locator('header').getByRole('link', { name: 'Blog' }).click()
  await expect(page).toHaveURL(/\/blog$/)
  await expect(page.getByRole('heading', { name: 'Conteúdo e autoridade' })).toBeVisible()
})

test('abre um post via deep link', async ({ page }) => {
  await page.goto('/blog/periodizacao-para-hipertrofia')
  await expect(page.getByRole('heading', { level: 1, name: /Periodização para hipertrofia/ })).toBeVisible()
})
