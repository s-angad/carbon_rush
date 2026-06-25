import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bkuzzsiqaodezroufela.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_nhxzDgTwCcKyYnxqBQrgBA_itYUX2MT";

export const supabase = createClient(supabaseUrl, supabaseKey);
