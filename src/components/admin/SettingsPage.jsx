import { useEffect, useState } from "react";

import {
  RefreshCw,
} from "lucide-react";

import {
  getSettings,
} from "../../services/settingsApi";

import WebsiteSetting from "./settings/WebsiteSetting";
import RegistrationSetting from "./settings/RegistrationSetting";
import GraduationSetting from "./settings/GraduationSetting";
import WhatsappSetting from "./settings/WhatsappSetting";
import TrainingSetting from "./settings/TrainingSetting";

function SettingsPage() {

  const [loading, setLoading] =
    useState(true);

  const [settings, setSettings] =
    useState({});

  async function loadSettings() {

    try {

      setLoading(true);

      const data =
        await getSettings();

      setSettings(data);

    }

    catch (err) {

      console.error(err);

      alert(err.message);

    }

    finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadSettings();

  }, []);

  if (loading) {

    return (

      <div className="flex h-96 items-center justify-center">

        <RefreshCw

          size={40}

          className="animate-spin text-red-600"

        />

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <WebsiteSetting

        settings={settings}

        onRefresh={loadSettings}

      />

      <RegistrationSetting

        settings={settings}

        onRefresh={loadSettings}

      />

      <GraduationSetting

        settings={settings}

        onRefresh={loadSettings}

      />

      <WhatsappSetting

        settings={settings}

        onRefresh={loadSettings}

      />

      <TrainingSetting

        settings={settings}

        onRefresh={loadSettings}

      />

    </div>

  );

}

export default SettingsPage;