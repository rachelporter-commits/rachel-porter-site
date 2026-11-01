// Single source of truth for facts on the site. Verified facts cite a source;
// anything marked TODO must be confirmed by Rachel before launch.
export const agent = {
  name: "Rachel Porter",
  formerName: "Rachel Stagg", // source: lovevarealestate.com team page lists rachel.stagg@keetonco.com alias; Zillow profile "Rachel P Stagg"
  title: "REALTOR® | Sales Manager, Keeton & Co Real Estate", // source: keetonco.com/agents/rachel-porter
  licenseVA: "0225221415", // source: keetonco.com agent page + HQ profile
  withFirmSince: 2017, // keetonco.com says 2017; a 2016 team bio says she joined summer 2016 — TODO confirm
  email: "rachel.porter@keetonco.com",
  phone: "(804) 629-9192", // cell, confirmed by Daniel Keeton 2026-11-01
  firmPhone: "(804) 556-1228",
  office: "Keeton & Co Real Estate, 4235 Innslake Dr, Ste 105, Glen Allen, VA 23060",
  brokerage: "Keeton & Co Real Estate",
  brokerageUrl: "https://keetonco.com",
  serviceArea: ["Goochland", "Glen Allen & Short Pump", "Henrico", "Richmond", "Powhatan", "Chesterfield", "Petersburg", "Louisa"],
};

// Source: Keeton HQ database (closed transactions, Brokermint-synced), pulled 2026-11-01.
// Volume in USD. Update by re-running the query in AGENTS.md or editing by hand.
export const stats = {
  asOf: "Nov 1, 2026",
  careerClosings: 188,
  closings12mo: 25,
  volume2026YTD: 10_812_125,
  closings2026YTD: 23,
  careerVolumeSince2019: 61_304_957,
  avgPrice2026: 470_092,
};

export const SITE_URL = (import.meta.env.PUBLIC_SITE_URL || "https://rachel-porter-site.pages.dev").replace(/\/$/, "");

// FAQ: general, non-statistical guidance. Edit freely; shown on home page + FAQPage schema.
export const faqs: { q: string; a: string }[] = [
  { q: "What does a \"special-needs family Realtor\" do differently?",
    a: "I start with how your family actually lives: mobility, sensory needs, routines, therapies, schools, and safety. Then I screen homes for those things before you tour, plan showings around your child's needs, and help you think through modifications and long-term planning so the home works for years, not just on closing day." },
  { q: "How do you find accessible or adaptable homes in the Richmond area?",
    a: "Few listings label accessibility well, so I look at the details: single-level or main-floor bedroom and full bath, zero-step or easy-to-ramp entries, door and hallway widths, flooring, lot grade, and room for equipment. I also flag homes that aren't accessible today but could be adapted at a reasonable cost." },
  { q: "Can you help us pick a home based on schools and therapy providers?",
    a: "Yes. I'll map commute times to the schools, therapy clinics, pediatric specialists, and day programs you rely on across Henrico, Chesterfield, Goochland, Hanover, Powhatan, and Richmond. I can't tell you which school is \"best\" for your child, but I'll help you gather the right questions to ask each school division about IEP and 504 support." },
  { q: "My child struggles with new places. How do showings work?",
    a: "We go at your pace: video walk-throughs first, short scheduled tours at quieter times, previewing homes myself, and flexibility when a day doesn't go to plan. You can also tour without your child and bring them back only for the finalists." },
  { q: "Are there programs that help pay for home modifications in Virginia?",
    a: "There are some. Depending on eligibility, families may look into Virginia's Medicaid waiver programs (which can include environmental modifications), local and nonprofit grant programs, and accessible-housing loan programs. Eligibility rules change, so I'll point you to the agencies and professionals who can confirm what applies to you." },
  { q: "We need to sell our current home. Can you help with that too?",
    a: "Yes. I represent sellers as well as buyers, and I can plan the timing so your family isn't moving twice or living through showings longer than necessary. If your home has accessibility features, I make sure buyers who need them can find it." },
  { q: "Is Fair Housing a concern when talking about disability?",
    a: "Fair Housing law protects people with disabilities and families with children. That means I never steer you toward or away from a neighborhood because of who lives there. I focus on homes, features, and the services you tell me you need, and you make the choices." },
  { q: "What areas do you serve?",
    a: "Central Virginia: Richmond, Henrico (including Glen Allen and Short Pump), Goochland, Chesterfield, Powhatan, Hanover, Petersburg, Louisa, and the surrounding counties." },
];
