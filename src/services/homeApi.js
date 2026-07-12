import { supabase } from "./supabase";

export async function getHomeData() {

  const [

    statsResult,

    timelineResult,

    faqResult,

    settingsResult,

  ] = await Promise.all([

    supabase
      .from("homepage_stats")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", {
        ascending: true,
      }),

    supabase
      .from("timeline")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", {
        ascending: true,
      }),

    supabase
      .from("faq")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", {
        ascending: true,
      }),

    supabase
      .from("settings")
      .select("*"),

  ]);

  if (statsResult.error) throw statsResult.error;
  if (timelineResult.error) throw timelineResult.error;
  if (faqResult.error) throw faqResult.error;
  if (settingsResult.error) throw settingsResult.error;

  const settings = {};

  settingsResult.data.forEach((item) => {

    settings[item.setting_key] = item.setting_value;

  });

  return {

    stats: statsResult.data ?? [],

    timeline: timelineResult.data ?? [],

    faq: faqResult.data ?? [],

    settings,

  };

}