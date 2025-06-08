import fs from "node:fs";
import type { AstroIntegration } from "astro";
import { getBlogs } from "./microcms";

const generatedDir = "./generated";
const blogsPath = "./generated/blogs.json";

const setup = async () => {
  if (!fs.existsSync(generatedDir)) {
    await fs.promises.mkdir(generatedDir);
  }

  // Vercelデプロイ環境でも実際のデータを取得するように修正
  if ((process.env.CI || process.env.E2E_TEST) && !process.env.VERCEL) {
    console.log("CI detected (not Vercel). Copying sample data.");

    await fs.promises.copyFile(
      "./.github/workflows/sample-data/blogs.json",
      blogsPath,
    );
    return;
  }

  console.log("Fetching data from microCMS...");
  const blogs = await getBlogs();
  await fs.promises.writeFile(blogsPath, JSON.stringify(blogs, null, 2));
};

function setupMicroCMS() {
  const integration: AstroIntegration = {
    name: "setupMicroCMS",
    hooks: {
      "astro:config:setup": async () => {
        await setup();
      },
    },
  };
  return integration;
}

export { setupMicroCMS };
