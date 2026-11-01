import { createClient } from "@supabase/supabase-js";
const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = url && key ? createClient(url, key) : null;

export async function submitLead(d: Record<string, string>): Promise<string | null> {
  if (!supabase) { console.warn("Supabase env vars not set; lead not saved", d); return "not-configured"; }
  const { error } = await supabase.from("leads").insert({
    name: d.name, email: d.email || null, phone: d.phone || null, looking_to: d.looking_to,
    family_needs: d.family_needs || null, preferred_contact: d.preferred_contact, source: "website",
  });
  return error ? error.message : null;
}
