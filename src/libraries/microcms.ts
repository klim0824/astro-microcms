import { getSecret } from "astro:env/server";
import { createClient } from "microcms-js-sdk";
import type { MicroCMSListContent, MicroCMSQueries } from "microcms-js-sdk";

const serviceDomain = getSecret("MICROCMS_SERVICE_DOMAIN");
const apiKey = getSecret("MICROCMS_API_KEY");

if (!serviceDomain || !apiKey) {
	console.error(
		"MICROCMS_SERVICE_DOMAIN または MICROCMS_API_KEY の環境変数が設定されていません。",
	);
	process.exit(1);
}

const client = createClient({
	serviceDomain,
	apiKey,
});

export type Blog = {
	title: string;
	content: string;
} & MicroCMSListContent;

export const getBlogs = async (queries?: MicroCMSQueries) => {
	return await client.getList<Blog>({ endpoint: "blogs", queries });
};

export const getBlogDetail = async (
	contentId: string,
	queries?: MicroCMSQueries,
) => {
	return await client.getListDetail<Blog>({
		endpoint: "blogs",
		contentId,
		queries,
	});
};
