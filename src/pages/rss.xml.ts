import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import sanitizeHtml from "sanitize-html";

import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { getAllBlogs } from "../libraries/microcms";

export async function GET(context: APIContext) {
	const posts = await getAllBlogs();

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site ?? "",
		items: posts.map((post) => ({
			title: post.title,
			link: `/${post.id}`,
			pubDate: new Date(post.publishedAt ?? 0),
			description: sanitizeHtml(post.content),
		})),
	});
}
