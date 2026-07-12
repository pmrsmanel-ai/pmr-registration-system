import { supabase } from "./supabase";

export async function checkResult(keyword) {

  const { data, error } = await supabase
    .from("applicants")
    .select("*")
    .or(
      `registration_number.eq.${keyword},full_name.ilike.%${keyword}%`
    )
    .limit(1);

  if (error) throw error;

  if (!data.length) return null;

  return data[0];

}