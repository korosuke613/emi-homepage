import fs from "node:fs";
import type { AstroIntegration } from "astro";
import { getBlogs } from "./microcms";

const generatedDir = "./generated";
const blogsPath = "./generated/blogs.json";

const setup = async () => {
  if (!fs.existsSync(generatedDir)) {
    await fs.promises.mkdir(generatedDir);
  }

  // 通常のbuildではテストデータを使用、Vercelまたは開発時のPRODUCTIONフラグでは実際のデータを取得
  if (!process.env.VERCEL && !process.env.PRODUCTION) {
    console.log("Development/CI environment detected. Copying sample data.");

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
