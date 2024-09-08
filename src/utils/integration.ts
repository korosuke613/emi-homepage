import fs from "node:fs";
import type { AstroIntegration } from "astro";
import { getBlogs } from "./microcms";

const generatedDir = "./generated";
const blogsPath = "./generated/blogs.json";

const setup = async () => {
  const blogs = await getBlogs();

  if (!fs.existsSync(generatedDir)) {
    await fs.promises.mkdir(generatedDir);
  }

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
