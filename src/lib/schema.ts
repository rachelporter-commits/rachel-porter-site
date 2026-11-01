import { agent, faqs, SITE_URL } from "../data/site";
import { parseVideo } from "./video";
export const brokerage = {
  "@type": ["RealEstateAgent", "LocalBusiness"], "@id": "https://keetonco.com/#org",
  name: "Keeton & Co Real Estate", url: "https://keetonco.com", telephone: "+18045561228",
  address: { "@type": "PostalAddress", streetAddress: "4235 Innslake Dr, Ste 105", addressLocality: "Glen Allen", addressRegion: "VA", postalCode: "23060", addressCountry: "US" },
};
export const person = {
  "@type": "Person", "@id": `${SITE_URL}/#rachel`, name: agent.name, alternateName: agent.formerName,
  jobTitle: "REALTOR®", url: SITE_URL, image: `${SITE_URL}/images/rachel-porter-headshot.jpg`,
  email: agent.email, telephone: "+18046299192", worksFor: { "@id": brokerage["@id"] },
  knowsAbout: ["Special-needs family home buying", "Accessible homes", "Central Virginia real estate"],
  hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "Virginia real estate license", identifier: agent.licenseVA },
};
export const agentBiz = {
  "@type": ["RealEstateAgent", "LocalBusiness"], "@id": `${SITE_URL}/#agent`,
  name: `${agent.name}, REALTOR® – The Special-Needs Family Realtor`, url: SITE_URL,
  image: `${SITE_URL}/images/rachel-porter-headshot.jpg`, telephone: "+18046299192", email: agent.email,
  address: brokerage.address, founder: { "@id": person["@id"] }, employee: { "@id": person["@id"] },
  parentOrganization: { "@id": brokerage["@id"] },
  areaServed: agent.serviceArea.map((a) => ({ "@type": "Place", name: `${a}, Virginia` })),
  description: "Real estate help for families of children and adults with special needs in Central Virginia: accessible home search, sensory-friendly showings, and planning around schools and therapy.",
};
export const faqSchema = { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
export function videoSchema(v: { title: string; description: string; url: string; pubDate: Date; thumbnail?: string; duration?: string }) {
  const p = parseVideo(v.url);
  const abs = (u?: string) => (u && u.startsWith("/") ? SITE_URL + u : u);
  return { "@type": "VideoObject", name: v.title, description: v.description, uploadDate: v.pubDate.toISOString(),
    thumbnailUrl: abs(v.thumbnail || p.thumb || "/images/rachel-porter-headshot.jpg"),
    ...(p.kind === "file" ? { contentUrl: abs(v.url) } : { embedUrl: p.embed?.replace("?autoplay=1", "") ?? v.url }),
    ...(v.duration ? { duration: v.duration } : {}), author: { "@id": person["@id"] } };
}
export const graph = (...nodes: object[]) => JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
