import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import Hero from "../components/home/Hero";
import About from "../components/home/About";
import WhyJoin from "../components/home/WhyJoin";
import Timeline from "../components/home/Timeline";
import Requirements from "../components/home/Requirements";
import Faq from "../components/home/Faq";
import Cta from "../components/home/Cta";
import GraduationBanner from "../components/home/GraduationBanner";

import { getHomeData } from "../services/homeApi";

function Home() {

  const [loading, setLoading] =
    useState(true);

  const [homeData, setHomeData] =
    useState({

      stats: [],

      timeline: [],

      faq: [],

      settings: {},

    });

  async function loadHome() {

    try {

      setLoading(true);

      const data =
        await getHomeData();

      setHomeData(data);

    }

    catch (err) {

      console.error(err);

    }

    finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadHome();

  }, []);

  if (loading) {

    return (

      <Layout>

        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="h-14 w-14 animate-spin rounded-full border-4 border-red-200 border-t-red-700" />

        </div>

      </Layout>

    );

  }

  return (

    <Layout>

      <Hero

  settings={homeData.settings}

  stats={homeData.stats}

/>

<About

  settings={homeData.settings}

/>

<WhyJoin

  stats={homeData.stats}

/>

<Timeline

  timeline={homeData.timeline}

/>

<GraduationBanner

  settings={homeData.settings}

/>

<Requirements />

<Faq

  faq={homeData.faq}

/>

<Cta

  settings={homeData.settings}

/>

    </Layout>

  );

}

export default Home;