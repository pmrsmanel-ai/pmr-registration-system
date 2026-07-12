import { supabase } from "./supabase";

/* ===========================
   GET ALL SETTINGS
=========================== */

export async function getSettings() {

  const { data, error } = await supabase

    .from("settings")

    .select("*");

  if (error) throw error;

  const settings = {};

  data.forEach((item) => {

    settings[item.setting_key] = item.setting_value;

  });

  return settings;

}

/* ===========================
   GET ONE SETTING
=========================== */

export async function getSetting(settingKey) {

  const { data, error } = await supabase

    .from("settings")

    .select("setting_value")

    .eq("setting_key", settingKey)

    .single();

  if (error) throw error;

  return data.setting_value;

}

/* ===========================
   UPDATE ONE SETTING
=========================== */

export async function updateSetting(

  settingKey,

  settingValue,

) {

  const { error } = await supabase

    .from("settings")

    .upsert(

      {

        setting_key: settingKey,

        setting_value:

          settingValue === null

            ? ""

            : String(settingValue),

        updated_at:

          new Date().toISOString(),

      },

      {

        onConflict: "setting_key",

      }

    );

  if (error) throw error;

}

/* ===========================
   UPDATE ALL SETTINGS
=========================== */

export async function updateSettings(payload) {

  const entries = Object.entries(payload);

  for (const [key, value] of entries) {

    await updateSetting(

      key,

      value

    );

  }

  return true;

}