import type { Config } from "@netlify/edge-functions";
import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async function handler(request: Request, context: Context) {
	const theme = context.cookies.get("theme");
  const response = await context.next();
  const rewriter = new HTMLRewriter()
    .on("html", {
      element: (element) => {
        element.setAttribute('data-theme', theme);
      },
    });
  return rewriter.transform(response);
}

export const config: Config = {
  path: "/*",
  excludedPath: [
		"/*.css",
		"/*.js",
		"/*.svg",
		"/*.jpg",
		"/*.woff2",
		"/*.mp4"
	]
}
