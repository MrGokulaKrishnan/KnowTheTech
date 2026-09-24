import { test, expect } from '@playwright/test';

test.describe('Navigation & Core Routes', () => {
  test('should load homepage with correct title, brand, and hero', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/KnowTheTech/);

    // Verify brand logo and title
    const brandHeading = page.getByRole('heading', { name: /One Ecosystem\.\s*Multiple Ideas\.\s*Built with Technology\./i });
    await expect(brandHeading).toBeVisible();

    // Verify footer exact copyright text
    const footerCopyright = page.locator('text=Copyright © KnowTheTech • Gokulakrishnan K');
    await expect(footerCopyright).toBeVisible();
  });

  test('should navigate to all main routes via navbar', async ({ page }) => {
    await page.goto('/');

    // Navigate to Products
    await page.getByRole('link', { name: 'Products', exact: true }).first().click();
    await expect(page).toHaveURL(/\/products/);
    await expect(page.getByRole('heading', { name: /Eight Focused Products/i })).toBeVisible();

    // Navigate to Ecosystem
    await page.getByRole('link', { name: 'Ecosystem', exact: true }).first().click();
    await expect(page).toHaveURL(/\/ecosystem/);
    await expect(page.getByRole('heading', { name: /The Connected Ecosystem/i })).toBeVisible();

    // Navigate to About
    await page.getByRole('link', { name: 'About', exact: true }).first().click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading', { name: /About KnowTheTech/i })).toBeVisible();

    // Navigate to Author
    await page.getByRole('link', { name: 'Author', exact: true }).first().click();
    await expect(page).toHaveURL(/\/author/);
    await expect(page.getByRole('heading', { name: /Built by Gokulakrishnan K/i })).toBeVisible();

    // Navigate to Contact
    await page.getByRole('link', { name: 'Contact', exact: true }).first().click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByRole('heading', { name: /Get In Touch/i })).toBeVisible();
  });

  test('should display custom 404 page for nonexistent routes', async ({ page }) => {
    await page.goto('/unknown-nonexistent-route-404');
    await expect(page.getByRole('heading', { name: /This route doesn't exist\./i })).toBeVisible();
    await expect(page.locator('#main-content').getByRole('link', { name: /Back Home/i })).toBeVisible();
    await expect(page.locator('#main-content').getByRole('link', { name: /Explore Products/i })).toBeVisible();
  });
});
