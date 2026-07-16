import { supabase } from "./supabase";

/* ===========================
   GET HOMEPAGE STATS
=========================== */

export async function getHomepageStats() {

  const { data, error } = await supabase

    .from("homepage_stats")

    .select("*")

    .order("sort_order", {

      ascending: true,

    });

  if (error) throw error;

  return data;

}

/* ===========================
   GET BY ID
=========================== */

export async function getHomepageStat(id) {

  const { data, error } = await supabase

    .from("homepage_stats")

    .select("*")

    .eq("id", id)

    .single();

  if (error) throw error;

  return data;

}

/* ===========================
   CREATE
=========================== */

export async function createHomepageStat(payload) {

  const { data, error } = await supabase

    .from("homepage_stats")

    .insert({

      ...payload,

    })

    .select()

    .single();

  if (error) throw error;

  return data;

}

/* ===========================
   UPDATE
=========================== */

export async function updateHomepageStat(

  id,

  payload,

) {

  const { data, error } = await supabase

    .from("homepage_stats")

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

export async function deleteHomepageStat(id) {

  const { error } = await supabase

    .from("homepage_stats")

    .delete()

    .eq("id", id);

  if (error) throw error;

  return true;

}

/* ===========================
   GET HOMEPAGE SETTINGS
=========================== */

export async function getHomepageSettings() {

  const { data, error } = await supabase

    .from("settings")

    .select("*");

  if (error) throw error;

  const settings = {};

  data.forEach((item) => {

    settings[item.setting_key] =
      item.setting_value;

  });

  return settings;

}

/* ===========================
   UPDATE HOMEPAGE SETTINGS
=========================== */

export async function updateHomepageSettings(payload) {

  const updates = Object.entries(payload).map(

    ([setting_key, setting_value]) => ({

      setting_key,

      setting_value,

      updated_at: new Date().toISOString(),

    })

  );

  const { error } = await supabase

    .from("settings")

    .upsert(

      updates,

      {

        onConflict: "setting_key",

      }

    );

  if (error) throw error;

  return true;

}