import HomepageHeroSection from "./homepage/HomepageHeroSection";
import HomepageStatsSection from "./homepage/HomepageStatsSection";
import HomepageTimelineSection from "./homepage/HomepageTimelineSection";
import HomepageFAQSection from "./homepage/HomepageFAQSection";
import HomepageCTASection from "./homepage/HomepageCTASection";

function HomepagePage() {

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black">

          Homepage CMS

        </h1>

        <p className="mt-2 text-gray-500">

          Kelola seluruh konten Homepage PMR SMANEL.

        </p>

      </div>

      <HomepageHeroSection />

      <HomepageStatsSection />

      <HomepageTimelineSection />

      <HomepageFAQSection />

      <HomepageCTASection />

    </div>

  );

}

export default HomepagePage;