import { test, expect } from '@playwright/test';

test('Suche filtert die Abflugliste', async ({ page }) => {
  await page.goto('/departures');
  await expect(page.getByRole('heading', { name: /Abflüge/ })).toBeVisible();

  await page.getByPlaceholder('Flug, Airline oder Ziel suchen...').fill('lufthansa');

  await expect(page.getByRole('link', { name: 'LH456' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'OS123' })).toHaveCount(0);
});

test('Klick auf einen Flug öffnet die Detailseite', async ({ page }) => {
  await page.goto('/departures');

  await page.getByRole('link', { name: 'OS123' }).click();
  await expect(page).toHaveURL('/flight/1');
  await expect(page.getByText('Austrian Airlines')).toBeVisible();

  await page.getByRole('link', { name: '← Zurück' }).click();
  await expect(page).toHaveURL('/departures');
});

test('Unbekannter Flug zeigt die 404-Seite', async ({ page }) => {
  await page.goto('/flight/999');
  await expect(page.getByRole('heading', { name: 'Seite nicht gefunden' })).toBeVisible();
});
