import { supabase } from "./supabase";

/* ===========================
   GET TIMELINE
=========================== */

export async function getTimeline() {

  const { data, error } = await supabase
    .from("timeline")
    .select("*")
    .order("sort_order", {
      ascending: true,
    });

  if (error) throw error;

  return data;
}

/* ===========================
   GET TIMELINE BY ID
=========================== */

export async function getTimelineById(id) {

  const { data, error } = await supabase
    .from("timeline")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

/* ===========================
   CREATE
=========================== */

export async function createTimeline(payload) {

  const { data, error } = await supabase
    .from("timeline")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/* ===========================
   UPDATE
=========================== */

export async function updateTimeline(id, payload) {

  const { data, error } = await supabase
    .from("timeline")
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
   DELETE
=========================== */

export async function deleteTimeline(id) {

  const { error } = await supabase
    .from("timeline")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}