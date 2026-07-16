import Header from "./Header";
import HeroSection from "./HeroSection";
import ParticipantSection from "./ParticipantSection";
import QRSection from "./QRSection";
import PrinciplesBar from "./PrinciplesBar";
import Footer from "./Footer";

function AnnouncementCard({

  applicant,

  settings,

}) {

  if (!applicant) return null;

  return (

    <div

      id="announcement-card"

      className="mx-auto w-full max-w-[1080px] overflow-hidden rounded-[40px] bg-white shadow-2xl"

    >

      {/* HEADER */}

      <Header

        settings={settings}

      />

      {/* HERO */}

      <HeroSection

        applicant={applicant}

      />

      {/* PESERTA */}

      <ParticipantSection

        applicant={applicant}

      />

      {/* QR */}

      <QRSection

        applicant={applicant}

      />

      {/* 7 PRINSIP */}

      <PrinciplesBar />

      {/* FOOTER */}

      <Footer />

    </div>

  );

}

export default AnnouncementCard;