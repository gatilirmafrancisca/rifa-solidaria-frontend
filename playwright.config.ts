import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "tests/features/*.feature",
  steps: "tests/steps/*.steps.ts",
});

export default defineConfig({
  testDir,
  workers: process.env.CI ? 1 : undefined,
  webServer: {
    // Sobe o próprio Vite dev server pro teste — não depende do
    // backend estar de pé em lugar nenhum, porque as chamadas de API
    // são interceptadas (page.route) dentro dos steps.
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:5173",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});