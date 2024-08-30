import type { Config } from "@netlify/edge-functions";
import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async function handler(request: Request, context: Context) {
  const response = await context.next();
	const theme = context.cookies.get("theme");
	const type = response.headers.get('content-type') as string;

	if(!theme || !type.startsWith('text/html')) return;

  const rewriter = new HTMLRewriter().on("html", {
		element: (element) => {
			element.setAttribute('data-theme', theme);
		}
	});

  return rewriter.transform(response);
}

export const config: Config = {
  path: "/*",
  excludedPath: [
		"/*.css",
		"/*.js",
		"/*.mjs",
		"/*.svg",
		"/*.jpg",
		"/*.woff2",
		"/*.mp4"
	]
}
