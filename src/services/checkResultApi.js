import { supabase } from "./supabase";

export async function findApplicant({
  registrationNumber,
  fullName,
  birthDate,
}) {

  if (registrationNumber) {

    const { data, error } = await supabase
      .from("applicants")
      .select("*")
      .eq("registration_number", registrationNumber.trim())
      .maybeSingle();

    if (error) throw error;

    return data;

  }

  const { data, error } = await supabase
    .from("applicants")
    .select("*")
    .ilike("full_name", fullName.trim())
    .eq("birth_date", birthDate)
    .maybeSingle();

  if (error) throw error;

  return data;

}