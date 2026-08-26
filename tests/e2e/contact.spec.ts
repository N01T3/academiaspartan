import { test, expect } from '@playwright/test'

test('envia mensagem pelo formulário de contato', async ({ page }) => {
  await page.goto('/contato')
  await page.getByLabel('Nome').fill('João da Silva')
  await page.getByLabel('E-mail').fill('joao@example.com')
  await page.getByLabel('Assunto').fill('Aula experimental')
  await page.getByLabel('Mensagem').fill('Quero agendar uma aula grátis.')
  await page.getByRole('button', { name: 'Enviar mensagem' }).click()
  await expect(page.getByText('Mensagem enviada com sucesso!')).toBeVisible()
})
