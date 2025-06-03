import type { MicroCMSImage, MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import type { Languages } from "../i18n/ui";

export type CategorySchema = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export type BlogSchema = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  language: Languages[];
  content: string;
  slug: string;
  eyecatch: MicroCMSImage;
  category: CategorySchema;
};
export type BlogResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: BlogSchema[];
};

const getClient = () => {
  if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
    throw new Error(
      "MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY are required",
    );
  }

  const microCmsClient = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
  });

  return microCmsClient;
};

export const getBlogs = async (queries?: MicroCMSQueries) => {
  const client = getClient();
  return await client.get<BlogResponse>({ endpoint: "blogs", queries });
};

export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const client = getClient();

  return await client.getListDetail<BlogSchema>({
    endpoint: "blogs",
    contentId,
    queries,
  });
};
