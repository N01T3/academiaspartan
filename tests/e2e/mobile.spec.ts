import { test, expect } from '@playwright/test'

test('abre o menu mobile e navega para Equipe', async ({ page }) => {
  await page.goto('/')
  const menuButton = page.getByRole('button', { name: 'Abrir menu' })
  await expect(menuButton).toBeVisible()
  await menuButton.click({ force: true })

  const equipeLink = page.locator('.v-navigation-drawer').getByRole('link', { name: 'Equipe' })
  await expect(equipeLink).toBeVisible()
  await equipeLink.click()

  await expect(page).toHaveURL(/\/equipe/)
})
