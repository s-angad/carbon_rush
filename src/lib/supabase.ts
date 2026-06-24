import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ypvyjnueggqonshahnaa.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_OrESxmhsDfrP4_g3iBYHLQ_Wk2c8DiU";

export const supabase = createClient(supabaseUrl, supabaseKey);
