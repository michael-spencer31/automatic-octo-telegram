import { test, expect } from '@playwright/test';

test('searches for a player and checks fielding section', async ({ page }) => {
  try {
    // Navigate to the search page
    await page.goto('https://flask-ball.onrender.com/search', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(10000); // Wait to visually confirm it's open

    // Wait for the textbox to be available and interact with it
    const nameInput = page.getByRole('textbox', { name: 'Name:' });
    await expect(nameInput).toBeVisible({ timeout: 5000 });

    await nameInput.dblclick();
    await nameInput.fill('addison barger');

    // Wait for and click the Search button
    const searchButton = page.getByRole('button', { name: 'Search' });
    await expect(searchButton).toBeEnabled({ timeout: 5000 });

    await searchButton.click();

    // Wait for result to appear
    const resultText = page.getByText('Fielding:', { exact: true });
    await expect(resultText).toBeVisible({ timeout: 5000 });

  } catch (error) {
    // If anything goes wrong, log it for debugging
    console.error('❌ Test failed:', error);
    throw error; // rethrow to make the test fail visibly
  }
});
