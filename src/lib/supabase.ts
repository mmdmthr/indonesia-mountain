import { createClient } from "@supabase/supabase-js";

// Use import.meta.env (Astro/Vite standard) instead of process.env
const supabaseUrl = import.meta.env.SUPABASE_URL as string;
const supabaseKey = import.meta.env.SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_KEY environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
