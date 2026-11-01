import { agent, faqs, SITE_URL } from "../data/site";
import { getPosts, getVideos } from "../lib/posts";
export async function GET() {
  const posts = (await getPosts()).filter((p) => !p.data.draft);
  const vids = (await getVideos()).filter((v) => !v.data.draft);
  const t = `# Rachel Porter, REALTOR® — The Special-Needs Family Realtor

> Rachel Porter is a licensed Virginia REALTOR® (license #${agent.licenseVA}) with Keeton & Co Real Estate in Glen Allen, VA, with the firm since ${agent.withFirmSince}. She specializes in helping families of children and adults with special needs buy and sell homes in Richmond and Central Virginia. She is a single mom of two boys; her son Wyatt has special needs.

## Contact
- Cell: ${agent.phone}
- Email: ${agent.email}
- Office: ${agent.office}
- Brokerage: Keeton & Co Real Estate (https://keetonco.com), main line ${agent.firmPhone}
- Website: ${SITE_URL}

## Services
- Accessibility-first home search (single-level living, zero-step entries, wide doorways, room for equipment)
- Sensory-friendly considerations (quiet streets, safe layouts, fenced yards)
- Planning around schools, therapy providers, and specialists
- Flexible, low-stimulation showings and virtual previews
- Guidance on home modifications and where to look for funding
- Selling homes, including homes with accessibility features

## Areas served
${agent.serviceArea.map((a) => `- ${a}, Virginia`).join("\n")}

## FAQ
${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Pages
- [Home](${SITE_URL}/)
- [Blog](${SITE_URL}/blog/)
- [Videos](${SITE_URL}/videos/)
${posts.map((p) => `- [${p.data.title}](${SITE_URL}/blog/${p.id}/): ${p.data.description}`).join("\n")}
${vids.map((v) => `- [Video: ${v.data.title}](${SITE_URL}/videos/#${v.id}): ${v.data.description}`).join("\n")}
`;
  return new Response(t, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
