import { test, expect, type Page } from '@playwright/test'

async function login(page: Page, username: string, password: string) {
  await page.goto('/login')
  await page.getByLabel('Usuário').fill(username)
  await page.getByLabel('Senha', { exact: true }).fill(password)
  await page.getByRole('button', { name: 'Entrar' }).click()
}

test('redireciona /admin para /login sem autenticação', async ({ page }) => {
  await page.goto('/admin')
  await expect(page).toHaveURL(/\/login/)
})

test('mostra erro em login inválido', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Usuário').fill('admin')
  await page.getByLabel('Senha', { exact: true }).fill('senha-errada')
  await page.getByRole('button', { name: 'Entrar' }).click()
  await expect(page.getByText('Usuário ou senha inválidos.')).toBeVisible()
})

test('faz login válido e vê o dashboard', async ({ page }) => {
  await login(page, 'admin', 'spartan123')
  await expect(page).toHaveURL(/\/admin/)
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})

test('faz logout e volta ao login', async ({ page }) => {
  await login(page, 'admin', 'spartan123')
  await expect(page).toHaveURL(/\/admin/)
  await page.getByText('Sair').click()
  await expect(page).toHaveURL(/\/login/)
})

test('editor não vê itens exclusivos de admin na navegação', async ({ page }) => {
  await login(page, 'admin', 'spartan123')
  await page.getByText('Sair').click()
  await expect(page).toHaveURL(/\/login/)

  await login(page, 'editor', 'editor123')
  await expect(page).toHaveURL(/\/admin/)
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  await expect(page.getByText('Usuários')).toHaveCount(0)
  await expect(page.getByText('Finanças')).toHaveCount(0)
  await expect(page.getByText('ERP')).toHaveCount(0)
})
