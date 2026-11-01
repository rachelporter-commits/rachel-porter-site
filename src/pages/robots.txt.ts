import { SITE_URL } from "../data/site";
const ai = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Google-Extended", "Googlebot", "Bingbot", "Applebot", "Applebot-Extended", "CCBot", "meta-externalagent", "Amazonbot", "DuckAssistBot", "cohere-ai", "YouBot", "xAI-Bot", "GrokBot"];
export const GET = () => new Response(
  ai.map((b) => `User-agent: ${b}\nAllow: /\n`).join("\n") + `\nUser-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`,
  { headers: { "Content-Type": "text/plain" } });
