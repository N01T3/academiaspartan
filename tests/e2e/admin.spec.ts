import { test, expect, type Page } from '@playwright/test'

async function loginAsAdmin(page: Page) {
  await page.goto('/login')
  await page.getByLabel('Usuário').fill('admin')
  await page.getByLabel('Senha', { exact: true }).fill('spartan123')
  await page.getByRole('button', { name: 'Entrar' }).click()
  await expect(page).toHaveURL(/\/admin/)
}

test('cria um post', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('/admin/posts')
  await page.getByRole('button', { name: 'Novo post' }).click()

  await page.getByLabel('Título').fill('Teste E2E')
  await page.getByLabel('Slug').fill('teste-e2e')
  await page.getByLabel('Categoria').fill('Testes')
  await page.getByLabel('Autor').fill('QA Automatizado')
  await page.getByLabel('Resumo').fill('Resumo do teste E2E')
  await page.getByLabel('Conteúdo').fill('Conteúdo do teste E2E')
  await page.getByRole('button', { name: 'Salvar' }).click()

  await expect(page.getByText('Teste E2E', { exact: true })).toBeVisible()
})

test('cria um membro da equipe', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('/admin/equipe')
  await page.getByRole('button', { name: 'Novo membro' }).click()

  await page.getByLabel('Nome').fill('Testador E2E')
  await page.getByLabel('Função').fill('Personal Trainer')
  await page.getByLabel('Bio').fill('Bio do testador E2E')
  await page.getByLabel('Foto (URL)').fill('https://example.com/foto.jpg')
  await page.getByRole('button', { name: 'Salvar' }).click()

  await expect(page.getByText('Testador E2E', { exact: true })).toBeVisible()
})

test('cria um depoimento', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('/admin/depoimentos')
  await page.getByRole('button', { name: 'Novo depoimento' }).click()

  await page.getByLabel('Nome').fill('Cliente E2E')
  await page.getByLabel('Função / modalidade').fill('Bodybuilder')
  await page.getByLabel('Depoimento').fill('Depoimento do cliente E2E')
  await page.getByLabel('Foto (URL)').fill('https://example.com/foto.jpg')
  await page.getByRole('button', { name: 'Salvar' }).click()

  await expect(page.getByText('Cliente E2E', { exact: true })).toBeVisible()
})

test('cria um programa', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('/admin/programas')
  await page.getByRole('button', { name: 'Novo programa' }).click()

  await page.getByLabel('Título').fill('Programa E2E')
  await page.getByLabel('Tag').fill('Performance')
  await page.getByLabel('Descrição').fill('Descrição do programa E2E')
  await page.getByLabel('Imagem (URL)').fill('https://example.com/foto.jpg')
  await page.getByRole('button', { name: 'Salvar' }).click()

  await expect(page.getByText('Programa E2E', { exact: true })).toBeVisible()
})

test('exibe a página de mensagens', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('/admin/mensagens')
  await expect(page.getByRole('heading', { name: 'Mensagens' })).toBeVisible()
})

test('salva as configurações do site', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('/admin/config')
  await page.getByLabel('Título', { exact: true }).fill('Novo título do hero')
  await page.getByRole('button', { name: 'Salvar alterações' }).first().click()
  await expect(page.getByText('Configurações salvas com sucesso!')).toBeVisible()
})
