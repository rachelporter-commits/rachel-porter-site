// Cloudflare Pages Function: finishes GitHub OAuth and hands the token to Decap CMS (postMessage handshake).
export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = (request.headers.get("Cookie") || "").match(/decap_oauth_state=([\w-]+)/)?.[1];
  let status = "error", content = { error: "Invalid OAuth state" };
  if (code && state && cookie === state) {
    const r = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", "User-Agent": "decap-oauth" },
      body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }),
    });
    const j = await r.json();
    if (j.access_token) { status = "success"; content = { token: j.access_token, provider: "github" }; }
    else content = { error: j.error_description || "OAuth failed" };
  }
  const msg = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!doctype html><html><body><script>
  (function(){var o=${JSON.stringify(url.origin)};
  function r(e){if(e.origin!==o)return;window.opener.postMessage(${JSON.stringify(msg)},o);window.removeEventListener("message",r);}
  window.addEventListener("message",r,false);window.opener.postMessage("authorizing:github",o);})();
  </script><p>Signing you in…</p></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html", "Set-Cookie": "decap_oauth_state=; Path=/api; Max-Age=0" } });
}
