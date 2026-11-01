// Single source of truth for facts on the site. Verified facts cite a source;
// anything marked TODO must be confirmed by Rachel before launch.
export const agent = {
  name: "Rachel Porter",
  formerName: "Rachel Stagg", // source: lovevarealestate.com team page lists rachel.stagg@keetonco.com alias; Zillow profile "Rachel P Stagg"
  title: "REALTOR® | Sales Manager, Keeton & Co Real Estate", // source: keetonco.com/agents/rachel-porter
  licenseVA: "0225221415", // source: keetonco.com agent page + HQ profile
  withFirmSince: 2017, // keetonco.com says 2017; a 2016 team bio says she joined summer 2016 — TODO confirm
  email: "rachel.porter@keetonco.com",
  phone: "(804) 629-9192", // TODO confirm current cell; other listed numbers: (804) 597-9047 (old team page), firm main (804) 556-1228
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
