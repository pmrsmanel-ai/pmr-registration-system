import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://wvtvkflelgowabxilgpz.supabase.co";

const supabaseKey =
  "sb_publishable_FbI5TqNyGM9KXHqrfNRXkQ_XzPdkXOP";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);