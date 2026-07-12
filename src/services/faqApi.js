import { supabase } from "./supabase";

/* ===========================
   GET FAQ
=========================== */

export async function getFaq() {

  const { data, error } = await supabase

    .from("faq")

    .select("*")

    .order("sort_order", {

      ascending: true,

    });

  if (error) throw error;

  return data;

}

/* ===========================
   GET FAQ BY ID
=========================== */

export async function getFaqById(id) {

  const { data, error } = await supabase

    .from("faq")

    .select("*")

    .eq("id", id)

    .single();

  if (error) throw error;

  return data;

}
/* ===========================
   CREATE FAQ
=========================== */

export async function createFaq(payload) {

  const { data, error } = await supabase

    .from("faq")

    .insert({

      ...payload,

    })

    .select()

    .single();

  if (error) throw error;

  return data;

}

/* ===========================
   UPDATE FAQ
=========================== */

export async function updateFaq(

  id,

  payload,

) {

  const { data, error } = await supabase

    .from("faq")

    .update({

      ...payload,

      updated_at: new Date().toISOString(),

    })

    .eq("id", id)

    .select()

    .single();

  if (error) throw error;

  return data;

}
/* ===========================
   DELETE FAQ
=========================== */

export async function deleteFaq(id) {

  const { error } = await supabase

    .from("faq")

    .delete()

    .eq("id", id);

  if (error) throw error;

  return true;

}